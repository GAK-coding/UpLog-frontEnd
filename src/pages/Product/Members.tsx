import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BsCheckCircle, BsPeopleFill } from 'react-icons/bs';
import { Textarea, useDisclosure } from '@chakra-ui/react';
import useInput from '@/hooks/useInput.ts';
import { GiLaurelCrown } from 'react-icons/gi';
import { PiCrownSimpleFill } from 'react-icons/pi';
import { GoKebabHorizontal } from 'react-icons/go';
import { ProductInfo, ProductMember } from '@/typings/product.ts';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { Scrollbars } from 'rc-scrollbars';
import AuthorityModal from '@/components/Product/Members/AuthorityModal.tsx';
import MemberListManageAlert from '@/components/Product/Members/MemberListManageAlert.tsx';
import { useMessage } from '@/hooks/useMessage.ts';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  changeProductMemberRole,
  getProductMemberList,
  productEdit,
} from '@/api/Product/Product.ts';
import { SaveUserInfo } from '@/typings/member.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productMemberList } from '@/recoil/Product/atom.ts';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { frontEndUrl } from '@/recoil/Common/atom.ts';
import { FaUserCircle } from 'react-icons/fa';

export default function Members() {
  const queryClient = useQueryClient();
  const userInfo: SaveUserInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
  const { productId, powerType }: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);

  const [emails, , setEmails] = useInput('');
  const [isLeader, setIsLeader] = useState(false);
  const [members, setMembers] = useRecoilState(productMemberList);
  const myId = userInfo.email;
  const [nowOpenKebab, setNowOpenKebab] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const [nowSelectedMember, setNowSelectedMember] = useState('');
  const [nowSelectedMemberId, setNowSelectedMemberId] = useState(-1);
  const baseUrl = useRecoilValue(frontEndUrl);
  // 방출인지 권한 위임인지
  const [isOut, setIsOut] = useState(false);
  const { showMessage, contextHolder } = useMessage();

  const { mutate } = useMutation(productEdit, {
    onSuccess: (data) => {
      if (typeof data !== 'string' && data.updateResultDTO) {
        const { failCnt, failMemberList, duplicatedCnt, duplicatedMemberList } =
          data.updateResultDTO;

        if (failCnt > 0 && duplicatedCnt > 0) {
          showMessage(
            'error',
            `${failMemberList.join(', ')}님 가입되어 있지 않고, ${duplicatedMemberList.join(
              ', '
            )}님은 이미 존재하여 초대에 실패했습니다.`
          );
          return;
        } else if (failCnt > 0) {
          showMessage(
            'error',
            `${failMemberList.join(', ')}님은 가입되어 있지 않아 초대에 실패했습니다.`
          );

          return;
        } else if (duplicatedCnt > 0) {
          showMessage(
            'error',
            `${duplicatedMemberList.join(', ')}님은 이미 존재하여 초대에 실패했습니다.`
          );

          return;
        }

        location.reload();
        showMessage('success', '성공적으로 초대되었습니다.');
        setEmails('');
      }
    },
  });

  const { data, isSuccess, refetch } = useQuery(
    ['getProductMemberList', productId],
    () => getProductMemberList(productId),
    {
      select: (data) => {
        if (typeof data !== 'string') {
          const temp: ProductMember[] = [];
          data.forEach((member) => {
            temp.push({
              ...member,
              isOpen: false,
            });
          });

          const powerTypePriority = {
            MASTER: 1,
            LEADER: 2,
            CLIENT: 3,
            DEFAULT: 4,
          };

          const sortedData = temp.sort((a, b) => {
            const priorityA = powerTypePriority[a.powerType];
            const priorityB = powerTypePriority[b.powerType];
            return priorityA - priorityB;
          });

          return sortedData;
        }
      },
      staleTime: 60000, // 1분
      cacheTime: 80000, // 1분 20초
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
    }
  );

  const { mutate: changeProductMemberRoleMutate } = useMutation(changeProductMemberRole, {
    onSuccess: (data) => {
      if (data) showMessage('error', '권한 변경에 실패하였습니다.');
    },
    onMutate: async ({ newPowerType, memberId }) => {
      await queryClient.cancelQueries(['getProductMemberList', productId]);

      const snapshot = queryClient.getQueryData(['getProductMemberList', productId]);

      queryClient.setQueryData(['getProductMemberList', productId], () => {
        const temp: ProductMember[] = members.map((member) => {
          if (member.memberId === memberId) {
            return {
              ...member,
              powerType: newPowerType,
            };
          } else return member;
        });

        const powerTypePriority = {
          MASTER: 1,
          LEADER: 2,
          CLIENT: 3,
          DEFAULT: 4,
        };
        const sortedData = temp.sort((a, b) => {
          const priorityA = powerTypePriority[a.powerType];
          const priorityB = powerTypePriority[b.powerType];
          return priorityA - priorityB;
        });

        setMembers(sortedData);
        return temp;
      });

      return { snapshot };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueriesData(['getProductMemberList', productId], context?.snapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getProductMemberList', productId] });
      refetch();
    },
  });

  const onClickChangeRoleLeader = useCallback(
    (memberId: number) => {
      changeProductMemberRoleMutate({ newPowerType: 'LEADER', productId, memberId });
    },
    [productId]
  );

  const onClickChangeRoleDefault = useCallback(
    (memberId: number) => {
      changeProductMemberRoleMutate({ newPowerType: 'DEFAULT', productId, memberId });
    },
    [productId]
  );

  const onClickInvite = useCallback(() => {
    let isEmailFormat = true;
    const memberEmailList = emails
      .split(',')
      .map((email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email.trim()) && email.trim() !== '') {
          isEmailFormat = false;
        }

        if (email.trim() !== '') {
          return email.trim();
        } else {
          return null; // 빈 문자열이 아닌 경우에는 null을 반환하도록 수정
        }
      })
      .filter((email) => email !== null) as string[];

    if (!isEmailFormat) {
      showMessage('warning', '이메일 형식이 올바르지 않은 메일이 존재합니다.');
      return;
    }

    mutate({
      data: {
        link: baseUrl,
        newName: null,
        memberEmailList: memberEmailList,
        powerType: isLeader ? 'LEADER' : 'DEFAULT',
        image: null,
      },
      productId,
    });
  }, [emails, isLeader]);

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

  const onClickAuthority = useCallback(
    (position: 'LEADER' | 'DEFAULT', nickname: string, id: number) => {
      setNowSelectedMemberId(id);

      if (position === 'LEADER') {
        onOpen();
      } else {
        onAlertOpen();
        setNowSelectedMember(nickname);
        setIsOut(false);
      }
    },
    []
  );

  const onClickOut = useCallback((nickname: string, id: number) => {
    onAlertOpen();
    setNowSelectedMember(nickname);
    setIsOut(true);
    setNowSelectedMemberId(id);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setMembers(data!);
    }
  }, [isSuccess]);

  return (
    <section
      className={'w-full min-w-[50em] flex-col-center justify-start px-[30rem] py-14'}
      onClick={onCloseMemberKebab}
    >
      {contextHolder}
      {(powerType === 'LEADER' || powerType === 'MASTER') && (
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
      )}

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
              <h2 className={'text-[1.4rem] font-bold mb-7'}>총 인원({members?.length}명)</h2>
              <div>
                {members?.map((member, idx) => {
                  return (
                    <div key={member.memberEmail} className={'flex justify-between mb-8'}>
                      <div className={'flex items-center'}>
                        <span className={'w-8 mr-4 text-3xl'}>
                          {/*  TODO: 여기는 api 연동하면 다시 수정 */}
                          {member.powerType === 'MASTER' && (
                            <GiLaurelCrown className={'fill-orange'} />
                          )}
                          {member.powerType === 'LEADER' && (
                            <PiCrownSimpleFill className={'fill-orange'} />
                          )}
                          {member.powerType === 'CLIENT' && (
                            <BsPeopleFill className={'fill-gray-light'} />
                          )}
                        </span>
                        <div className={'flex items-center'}>
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={`${member.memberNickName}의 프로필 서진`}
                              className={'w-10 h-10 mr-4 rounded-[50%]'}
                            />
                          ) : (
                            <FaUserCircle className={'flex w-10 h-10 mr-4 fill-gray-dark'} />
                          )}

                          {member.memberEmail === myId && (
                            <span className={'ml-[-0.25rem] mr-2 text-gray-light font-bold'}>
                              (나)
                            </span>
                          )}
                          <div className={'flex flex-col justify-center font-bold'}>
                            <span>
                              {member.memberNickName} ({member.memberName})
                            </span>
                            <span className={'text-xs text-gray-dark'}>{member.memberEmail}</span>
                          </div>
                        </div>
                      </div>

                      {/* TODO: 일반 멤버는 이게 뜨면 안됨 */}
                      {nowProduct.powerType !== 'DEFAULT' &&
                        nowProduct.powerType !== 'CLIENT' &&
                        member.memberEmail !== myId &&
                        member.powerType !== 'MASTER' &&
                        member.powerType !== 'CLIENT' && (
                          <span
                            className={'self-start relative'}
                            onClick={(e) => onClickMemberKebab(e, idx)}
                          >
                            <GoKebabHorizontal
                              className={'fill-gray-dark text-2xl cursor-pointer'}
                            />
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
                                  onClick={() => onClickOut(member.memberNickName, member.memberId)}
                                >
                                  <IoMdClose className={'text-xl fill-gray-dark mr-2'} /> 방출
                                </button>
                                <button
                                  className={
                                    'h-1/2 flex-row-center justify-start pl-2 font-bold text-gray-dark hover:bg-orange-light-sideBar'
                                  }
                                  onClick={() =>
                                    onClickAuthority(
                                      member.powerType as 'DEFAULT' | 'LEADER',
                                      member.memberNickName,
                                      member.memberId
                                    )
                                  }
                                >
                                  <HiOutlineRefresh className={'text-xl stroke-gray-dark mr-2'} />
                                  {member.powerType === 'LEADER' ? '리더 위임' : '리더 권한'}
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
      <AuthorityModal
        isOpen={isOpen}
        onClose={onClose}
        onClickChangeRoleLeader={onClickChangeRoleLeader}
        onClickChangeRoleDefault={onClickChangeRoleDefault}
        nowSelectedMemberId={nowSelectedMemberId}
        showMessage={showMessage}
      />
      <MemberListManageAlert
        isOut={isOut}
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        nickName={nowSelectedMember}
        onClickChangeRoleLeader={onClickChangeRoleLeader}
        nowSelectedMemberId={nowSelectedMemberId}
        showMessage={showMessage}
      />
    </section>
  );
}
