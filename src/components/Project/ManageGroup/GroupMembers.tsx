import React, { useCallback, useEffect, useState } from 'react';
import { ChildGroup, ParentGroupMember } from '@/typings/project.ts';
import { ProductMember } from '@/typings/product.ts';
import { AiFillCaretDown } from 'react-icons/ai';
import { Select } from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { SaveUserInfo } from '@/typings/member.ts';

interface Props {
  childGroupAllMembers: ParentGroupMember[];
  productMembers: ProductMember[];
  getChildGroup: { childTeamInfoDTOList: ChildGroup[] };
  isInclude: boolean;
}
export default function GroupMembers({
  childGroupAllMembers,
  productMembers,
  getChildGroup,
  isInclude,
}: Props) {
  const [productMembersHash, setProductMembersHash] = useState<
    Map<number, { image: string | null }>
  >(new Map());
  const [isSeeMore, setIsSeeMore] = useState(false);
  const { parentgroup } = useParams();
  const userInfo: SaveUserInfo = JSON.parse(sessionStorage.getItem('userInfo')!);

  const onClickSeeMore = useCallback(() => {
    setIsSeeMore((prev) => !prev);
  }, []);

  // 제품 전체 멤버에서 사진 가져오려고 만듬
  useEffect(() => {
    if (productMembers) {
      productMembers.forEach((member) => {
        setProductMembersHash((prev) =>
          new Map(prev).set(member.memberId, { image: member?.image ?? null })
        );
      });
    }
  }, [productMembers]);

  useEffect(() => {
    setIsSeeMore(false);
  }, [parentgroup]);

  return (
    <div className={'mb-12'}>
      <div className={'flex justify-between items-center border-b border-gray-light pb-2 mb-4'}>
        <div className={' font-bold text-[1.4rem] '}>
          모든 멤버({childGroupAllMembers?.length ?? 0}명)
        </div>
        {isInclude && (
          <button
            className={'bg-orange rounded font-bold text-white text-sm w-16 h-8 flex-row-center'}
            onClick={() => {}}
          >
            나가기
          </button>
        )}
      </div>

      {(childGroupAllMembers?.length > 5 && !isSeeMore
        ? childGroupAllMembers.slice(0, 5)
        : childGroupAllMembers
      )?.map((member, index) => {
        return (
          <div
            key={`${member['memberId']}-${index}`}
            className={'flex justify-between items-center px-8 mb-6'}
          >
            <div className={'flex'}>
              <img
                src={
                  productMembersHash.get(member['memberId'])?.image ??
                  '/images/test_userprofile.png'
                }
                alt={`${member?.['memberNickname']}의 프로필 서진`}
                className={'w-12 h-12 mr-4 rounded-[50%]'}
              />
              <div className={'flex flex-col justify-center font-bold text-gray-dark'}>
                <span>
                  {userInfo.id === member?.['memberId'] && '(나)'} {member?.['memberNickname']} (
                  {member?.['memberName']})
                </span>
              </div>
            </div>
            <Select
              width={'9rem'}
              height={'1.7rem'}
              color={'var(--gray-dark)'}
              fontSize={'0.75rem'}
              defaultValue={'미소속'}
              icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
            >
              <option defaultValue={'하위 그룹 배정'}>하위 그룹 배정</option>
              {(getChildGroup as { childTeamInfoDTOList: ChildGroup[] })?.[
                'childTeamInfoDTOList'
              ]?.map((group) => {
                return (
                  <option key={group['teamId']} value={group['teamName']}>
                    {group['teamName']}
                  </option>
                );
              })}
            </Select>
          </div>
        );
      })}
      {childGroupAllMembers?.length > 5 && (
        <div>
          {isSeeMore ? (
            <MdKeyboardArrowUp
              className={'text-5xl m-auto cursor-pointer hover:fill-orange'}
              onClick={onClickSeeMore}
            />
          ) : (
            <MdKeyboardArrowDown
              className={'text-5xl m-auto cursor-pointer hover:fill-orange'}
              onClick={onClickSeeMore}
            />
          )}
        </div>
      )}
    </div>
  );
}
