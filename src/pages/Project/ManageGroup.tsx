import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillCaretDown, AiOutlinePlus } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { groupMemberList } from '@/recoil/Project/atom.ts';
import { Editable, EditableInput, EditablePreview, Select } from '@chakra-ui/react';
import { Scrollbars } from 'rc-scrollbars';

export default function ManageGroup() {
  const { product, project, parentgroup, childgroup } = useParams();
  const [groupMembers, setGroupMembers] = useRecoilState(groupMemberList);
  const childGroups: string[] = ['Frontend', 'Backend'];
  const [isClickMemberAdd, setIsClickMemberAdd] = useState(false);
  const addMemberList: { profile: null | string; nickName: string; name: string }[] = [
    { profile: null, nickName: 'Crong', name: '권오현' },
    {
      profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
      nickName: 'OCI',
      name: '오채영',
    },
    {
      profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
      nickName: 'Argo',
      name: '박은령',
    },
    {
      profile:
        'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
      nickName: '젠킨스',
      name: '장준',
    },
    {
      profile:
        'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
      nickName: '나무늘보',
      name: '김윤정',
    },
    { profile: null, nickName: 'Crong', name: '권오현' },
    {
      profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
      nickName: 'OCI',
      name: '오채영',
    },
    {
      profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
      nickName: 'Argo',
      name: '박은령',
    },
    {
      profile:
        'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
      nickName: '젠킨스',
      name: '장준',
    },
    {
      profile:
        'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
      nickName: '나무늘보',
      name: '김윤정',
    },
  ];

  const onClickMemberAdd = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsClickMemberAdd((prev) => !prev);
  }, []);

  const onCloseMemberAdd = useCallback(() => {
    setIsClickMemberAdd(false);
  }, []);

  return (
    <section className={'w-full px-20 py-20'} onClick={onCloseMemberAdd}>
      <article
        className={
          'mx-auto flex justify-between w-[64rem] pb-4 border-b border-gray-light relative'
        }
      >
        <div className={'flex items-center font-bold'}>
          <h1 className={'text-3xl mr-4 mb-2'}>개발팀</h1>
          <h2 className={'text-[1.5rem] text-gray-dark'}>그룹 관리</h2>
        </div>
        <button
          className={'bg-orange rounded font-bold text-white w-[6.5rem] h-10 flex-row-center'}
          onClick={onClickMemberAdd}
        >
          <AiOutlinePlus className={'text-xl mr-1'} /> 멤버 추가
        </button>

        {isClickMemberAdd && (
          <div
            className={
              'absolute top-[3rem] right-0 w-48 h-80 z-20 bg-white shadow-sign-up rounded-[0.3rem]'
            }
          >
            <Scrollbars
              style={{ width: '100%', height: '100%' }}
              autoHide
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              {addMemberList.map((member, idx) => {
                return (
                  <div key={idx} className={'flex p-2 mb-1 cursor-pointer hover:bg-orange-light'}>
                    <img
                      src={member.profile ? member.profile : '/images/test_userprofile.png'}
                      alt={`${member.nickName}의 프로필 서진`}
                      className={'w-10 h-10 mr-4 rounded-[50%]'}
                    />
                    <div
                      className={'flex flex-col justify-center text-xs font-bold text-gray-dark'}
                    >
                      <span>
                        {member.nickName} ({member.name})
                      </span>
                    </div>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        )}
      </article>

      <article className={'w-[50rem] mx-auto mt-14'}>
        {groupMembers.map((group, idx) => {
          return (
            <div key={idx} className={'mb-12'}>
              <div className={'border-b border-gray-light font-bold text-[1.4rem] pb-2 mb-4'}>
                {group[0]?.group ?? '미소속'}
              </div>
              {group.map((member) => {
                return (
                  <div key={member.email} className={'flex justify-between items-center px-8 mb-6'}>
                    <div className={'flex'}>
                      <img
                        src={member.profile ? member.profile : '/images/test_userprofile.png'}
                        alt={`${member.nickName}의 프로필 서진`}
                        className={'w-12 h-12 mr-4 rounded-[50%]'}
                      />
                      <div className={'flex flex-col justify-center font-bold text-gray-dark'}>
                        <span>
                          {member.nickName} ({member.name})
                        </span>
                      </div>
                    </div>

                    <Select
                      width={'7rem'}
                      height={'1.6rem'}
                      color={'var(--gray-dark)'}
                      fontSize={'0.75rem'}
                      value={member.group ?? '미소속'}
                      icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
                    >
                      {!member.group && <option value={'미소속'}>미소속</option>}
                      {childGroups.map((group) => {
                        return (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/*TODO: 스타일 다시 해야됨*/}
        <Editable
          border={'1px solid var(--gray-light)'}
          borderRadius={'0.25rem'}
          height={'3.75rem'}
          placeholder={'서브그룹 추가하기'}
          padding={'0 2rem'}
          // isPreviewFocusable={false}
          selectAllOnFocus={false}
        >
          {/*<div className={'border h-full flex-row-center justify-start'}>*/}
          <EditablePreview
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          />
          {/*</div>*/}
          <EditableInput
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            _focus={{ outline: 'none', border: 'none' }}
          />
        </Editable>
      </article>
    </section>
  );
}
