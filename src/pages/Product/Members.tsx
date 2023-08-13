import React, { ChangeEvent, useCallback, useState } from 'react';
import { BsCheckCircle, BsPeopleFill } from 'react-icons/bs';
import { Textarea, useDisclosure } from '@chakra-ui/react';
import useInput from '@/hooks/useInput.ts';
import { useRecoilState } from 'recoil';
import { productMemberList } from '@/recoil/Product/atom.ts';
import { GiLaurelCrown } from 'react-icons/gi';
import { PiCrownSimpleFill } from 'react-icons/pi';
import { GoKebabHorizontal } from 'react-icons/go';
import { ProductMember } from '@/typings/product.ts';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { Scrollbars } from 'rc-scrollbars';
import AuthorityModal from '@/components/Product/Members/AuthorityModal.tsx';
import MemberListManageAlert from '@/components/Product/Members/MemberListManageAlert.tsx';
import { useGetEachProduct } from '@/components/Product/hooks/useGetEachProduct.ts';
import { useMessage } from '@/hooks/useMessage.ts';
import { useMutation } from 'react-query';
import { productEdit } from '@/api/Product/Product.ts';

export default function Members() {
  const [emails, , setEmails] = useInput('');
  // 쉼표 기준으로 자르는 알고리즘
  // console.log(emails.split(',').map((email) => email.trim()));
  const [isLeader, setIsLeader] = useState(false);
  const [members, setMembers] = useRecoilState(productMemberList);
  const myId = '1234@gmail.com';
  const [nowOpenKebab, setNowOpenKebab] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [nowSelectedMember, setNowSelectedMember] = useState('');
  // 방출인지 권한 위임인지
  const [isOut, setIsOut] = useState(false);
  const { showMessage, contextHolder } = useMessage();
  const productId = 6;

  //  TODO: productId 하드 코딩 해둠
  const [data, refetch] = useGetEachProduct(productId, showMessage);

  const { mutate } = useMutation(() =>
    productEdit(
      { link: 'string', newName: null, memberEmailList: ['1234'], powerType: 'LEADER' },
      productId
    )
  );

  const onClickInvite = useCallback(() => {
    mutate();
  }, []);

  const onChangeEmails = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmails(e.target.value);
  }, []);

  const onClickIsLeader = useCallback(() => {
    setIsLeader((prev) => !prev);
  }, []);

  const onClickMemberKebab = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, num: number) => {
      e.stopPropagation();

      const temp: ProductMember[] = JSON.parse(JSON.stringify(members));
      temp[num].isOpen = !temp[num].isOpen;
      setMembers(temp);

      const tempNowOpenKebab: number[] = [...nowOpenKebab];
      nowOpenKebab.indexOf(num) === -1 && tempNowOpenKebab.push(num);
      setNowOpenKebab(tempNowOpenKebab);
    },
    [members, nowOpenKebab]
  );

  //  현재까지 열린 모든 캐밥 버튼 닫기
  const onCloseMemberKebab = useCallback(() => {
    const temp: ProductMember[] = JSON.parse(JSON.stringify(members));
    nowOpenKebab.map((now) => {
      temp[now].isOpen = false;
    });
    setMembers(temp);
    setNowOpenKebab([]);
  }, [members, nowOpenKebab]);

  const onClickAuthority = useCallback((position: 'leader' | 'member', nickname: string) => {
    if (position === 'leader') {
      onOpen();
    } else {
      onAlertOpen();
      setNowSelectedMember(nickname);
      setIsOut(false);
    }
  }, []);

  const onClickOut = useCallback((nickname: string) => {
    onAlertOpen();
    setNowSelectedMember(nickname);
    setIsOut(true);
  }, []);

  return (
    <section
      className={'w-full min-w-[50em] flex-col-center justify-start px-[30rem] py-14'}
      onClick={onCloseMemberKebab}
    >
      {contextHolder}
      <article className={'mb-20'}>
        <h1 className={'text-3xl font-bold mb-7'}>멤버 추가</h1>
        <div
          className={
            'border-[0.6px] rounded-[0.625rem] shadow-sign-up w-[50rem] h-auto px-9 py-7 bg-border'
          }
        >
          <h2 className={'text-[1.4rem] font-bold mb-7'}>초대하기</h2>
          <div className={'pl-14'}>
            <span className={'text-gray-dark font-bold'}>이메일 입력</span>
            <div className={'flex mt-4'}>
              <div className={'w-4/5'}>
                <Textarea
                  value={emails}
                  onChange={onChangeEmails}
                  border={'1px solid var(--border-line)'}
                  height={'100%'}
                  maxLength={1000}
                  focusBorderColor={'none'}
                  placeholder="이메일은 쉼표(,)로 구분해 주세요."
                />
              </div>
              <div className={'w-1/5 flex-col-center justify-end gap-2.5'}>
                <button
                  className={'bg-orange rounded font-bold text-sm text-white w-[4.5rem] h-9'}
                  onClick={onClickInvite}
                >
                  전송
                </button>
                <span
                  className={'flex-col-center gap-1 text-xs text-gray-dark cursor-pointer'}
                  onClick={onClickIsLeader}
                >
                  <BsCheckCircle className={`text-2xl ${isLeader && 'fill-orange'}`} />
                  리더로 초대하기
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article>
        <h1 className={'text-3xl font-bold mb-7'}>멤버 리스트</h1>
        <div className={'border-[0.6px] rounded-[0.625rem] shadow-sign-up w-[50rem] bg-border'}>
          <Scrollbars
            style={{ height: '100%' }}
            autoHide
            autoHeight
            autoHeightMax={'80vh'}
            autoHideTimeout={1000}
            // Duration for hide animation in ms.
            autoHideDuration={200}
          >
            <div className={'px-9 pt-7'}>
              <h2 className={'text-[1.4rem] font-bold mb-7'}>총 인원</h2>
              <div>
                {members.map((member, idx) => {
                  return (
                    <div key={member.email} className={'flex justify-between mb-8'}>
                      <div className={'flex items-center'}>
                        <span className={'mr-4 text-3xl'}>
                          {/*  TODO: 여기는 api 연동하면 다시 수정 */}
                          {member.position === 'master' && (
                            <GiLaurelCrown className={'fill-orange'} />
                          )}
                          {member.position === 'leader' && (
                            <PiCrownSimpleFill className={'fill-orange'} />
                          )}
                          {member.position === 'member' && (
                            <BsPeopleFill className={'fill-gray-light'} />
                          )}
                        </span>
                        <div className={'flex items-center'}>
                          <img
                            src={member.profile ? member.profile : '/images/test_userprofile.png'}
                            alt={`${member.nickName}의 프로필 서진`}
                            className={'w-14 h-14 mr-4 rounded-[50%]'}
                          />
                          {member.email === myId && (
                            <span className={'ml-[-0.25rem] mr-2 text-gray-light font-bold'}>
                              (나)
                            </span>
                          )}
                          <div className={'flex flex-col justify-center font-bold'}>
                            <span>
                              {member.nickName} ({member.name})
                            </span>
                            <span className={'text-xs text-gray-dark'}>{member.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* TODO: 일반 멤버는 이게 뜨면 안됨 */}
                      {member.email !== myId && member.position !== 'master' && (
                        <span
                          className={'self-start relative'}
                          onClick={(e) => onClickMemberKebab(e, idx)}
                        >
                          <GoKebabHorizontal className={'fill-gray-dark text-2xl cursor-pointer'} />
                          {member.isOpen && (
                            <div
                              className={
                                'absolute top-5 right-0 flex flex-col w-[7.5rem] h-20 border-solid border-[0.5px] border-gray-spring rounded text-xs shadow-release bg-white z-50'
                              }
                            >
                              <button
                                className={
                                  'h-1/2 flex-row-center justify-start pl-2 font-bold text-gray-dark hover:bg-orange-light-sideBar'
                                }
                                onClick={() => onClickOut(member.nickName)}
                              >
                                <IoMdClose className={'text-xl fill-gray-dark mr-2'} /> 방출
                              </button>
                              <button
                                className={
                                  'h-1/2 flex-row-center justify-start pl-2 font-bold text-gray-dark hover:bg-orange-light-sideBar'
                                }
                                onClick={() =>
                                  onClickAuthority(
                                    member.position as 'member' | 'leader',
                                    member.nickName
                                  )
                                }
                              >
                                <HiOutlineRefresh className={'text-xl stroke-gray-dark mr-2'} />
                                {member.position === 'leader' ? '리더 위임' : '리더 권한'}
                              </button>
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Scrollbars>
        </div>
      </article>
      <AuthorityModal isOpen={isOpen} onClose={onClose} />
      <MemberListManageAlert
        isOut={isOut}
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        nickName={nowSelectedMember}
      />
    </section>
  );
}
