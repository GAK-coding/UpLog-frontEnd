import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ChildGroup, ChildGroupMember, ParentGroupMember } from '@/typings/project.ts';
import { ProductMember } from '@/typings/product.ts';
import { UseQueryResult } from 'react-query';
import { AiFillCaretDown } from 'react-icons/ai';
import { Select } from '@chakra-ui/react';

interface Props {
  childGroupAllMembers: ParentGroupMember[];
  productMembers: ProductMember[];
  childGroupMembers: UseQueryResult<ChildGroupMember[] | undefined, unknown>[];
  getChildGroup: { childTeamInfoDTOList: ChildGroup[] };
}
export default function NotTeamGroup({
  childGroupAllMembers,
  productMembers,
  childGroupMembers,
  getChildGroup,
}: Props) {
  const [productMembersHash, setProductMembersHash] = useState<
    Map<number, { image: string | null }>
  >(new Map());
  const [hasMember, setHasMember] = useState<number[]>([]);

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

  // 팀이 있는 멤버 거를려고 만듬
  useLayoutEffect(() => {
    if (childGroupMembers) {
      const set: Set<number> = new Set();

      childGroupMembers.forEach((member) => {
        const members = [...(member?.data ?? [])];

        members.map((member) => {
          return set.add(member?.id);
        });
      });

      setHasMember([...set]);
    }
  }, [childGroupMembers]);

  return (
    <div className={'mb-12'}>
      <div className={'border-b border-gray-light font-bold text-[1.4rem] pb-2 mb-4'}>미소속</div>
      {childGroupAllMembers?.map((member, index) => {
        if (hasMember.includes(member.memberId)) return;

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
                  {member?.['memberNickname']} ({member?.['memberName']})
                </span>
              </div>
            </div>

            <Select
              width={'8rem'}
              height={'1.6rem'}
              color={'var(--gray-dark)'}
              fontSize={'0.75rem'}
              defaultValue={'미소속'}
              icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
            >
              <option defaultValue={'미소속'}>미소속</option>
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
    </div>
  );
}
