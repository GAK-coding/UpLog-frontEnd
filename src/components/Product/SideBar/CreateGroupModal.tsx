import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import useInput from '@/hooks/useInput.ts';
import { createProjectTeam } from '@/api/Project/Version.ts';
import { useMutation, useQueryClient } from 'react-query';
import { ParentGroup, ParentGroupWithStates, Project } from '@/typings/project.ts';
import { ProductInfo, ProductMember } from '@/typings/product.ts';
import { useGetProductMembers } from '@/pages/Product/hooks/useGetProductMembers.ts';
import { AiOutlinePlus } from 'react-icons/ai';
import { Scrollbars } from 'react-custom-scrollbars';
import { convertNumberArrayToStringArray } from '@/utils/convertNumberArrayToStringArray.ts';
import { SetterOrUpdater } from 'recoil';
type MessageType = 'success' | 'error' | 'warning';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setMessageInfo: SetterOrUpdater<{ type: MessageType; content: string } | null>;
  parentGroups: ParentGroupWithStates[];
  setParentGroups: Dispatch<SetStateAction<ParentGroupWithStates[]>>;
}

export default function CreateGroupModal({ isOpen, onClose, setMessageInfo, parentGroups }: Props) {
  const [groupName, onChangeGroupName, setGroupName] = useInput('');
  const [isClickMemberList, setIsClickMemberList] = useState(false);
  const nowProject: Project = JSON.parse(sessionStorage.getItem('nowProject')!);
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  // 프로젝트 멤버 가져오는 훅
  const [data, isSuccess, refetch] = useGetProductMembers(nowProduct.productId);
  const [productMembers, setProductMembers] = useState<ProductMember[]>([]);
  const [inviteMembers, setInviteMembers] = useState<number[]>([]);

  /**초대 멤버 리스트 닫는 함수*/
  const onCloseMemberList = useCallback(() => {
    setIsClickMemberList(false);
  }, []);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLSpanElement | HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const onClickMemberList = useCallback(() => {
    setIsClickMemberList((prev) => !prev);
  }, []);

  const onClickMember = useCallback(
    (num: number) => {
      const tempProductMember: ProductMember[] = JSON.parse(JSON.stringify(productMembers));
      const tmepInviteMembers: number[] = JSON.parse(JSON.stringify(inviteMembers));

      tempProductMember[num]['isOpen'] = !tempProductMember[num]['isOpen'];

      if (tempProductMember[num]['isOpen']) {
        setInviteMembers([...inviteMembers, tempProductMember[num].memberId]);
      } else {
        const index = inviteMembers.indexOf(tempProductMember[num].memberId);
        if (index > -1) {
          tmepInviteMembers.splice(index, 1);
        }
        setInviteMembers(tmepInviteMembers);
      }

      setProductMembers(tempProductMember);
    },
    [productMembers, inviteMembers]
  );

  const queryClient = useQueryClient();

  const {
    mutate,
    // isSuccess: isCreateProjectTeamSuccess,
  } = useMutation(createProjectTeam, {
    onSuccess: (data) => {
      if (typeof data === 'string' && data === '프로젝트 내에서 팀 이름이 중복됩니다.') {
        setMessageInfo({ type: 'warning', content: '프로젝트 내에서 팀 이름이 중복됩니다.' });
        return;
      } else if (typeof data !== 'string') {
        onClose();
        setInviteMembers([]);
        setGroupName('');
        setMessageInfo({ type: 'success', content: '그룹이 생성되었습니다.' });
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['getProjectGroups', nowProject?.id]);

      const snapshot = queryClient.getQueryData(['getProjectGroups', nowProject?.id]);

      queryClient.setQueriesData(['getProjectGroups', nowProject?.id], () => {
        const temp: ParentGroup[] = [
          ...parentGroups,
          {
            teamName: groupName,
            id: -1,
            depth: 1,
          },
        ];
        return temp;
      });

      return { snapshot };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueriesData(['getProjectGroups', nowProject?.id], context?.snapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getProjectGroups', nowProject?.id]);
    },
  });

  const onClickCreate = useCallback(() => {
    if (groupName === '') {
      setMessageInfo({ type: 'warning', content: '그룹 이름을 입력해주세요.' });
      return;
    }

    // TODO: link 처리 필요
    mutate({
      name: groupName,
      parentTeamId: null,
      memberIdList: convertNumberArrayToStringArray(inviteMembers),
      link: '/',
      projectId: nowProject?.id,
    });
  }, [groupName, nowProject, inviteMembers]);

  useEffect(() => {
    if (isSuccess) {
      setProductMembers(JSON.parse(JSON.stringify(data)));
    }
  }, [isSuccess]);

  return (
    <Modal
      isCentered
      onClose={() => {
        onClose();
        onCloseMemberList();
        setGroupName('');
        productMembers.map((member) => {
          member.isOpen = false;
        });
      }}
      isOpen={isOpen}
    >
      <ModalOverlay />

      <ModalContent
        maxW={'41rem'}
        h={'34rem'}
        shadow={'boxShadow-sign-up'}
        rounded={'none'}
        p={'1.2rem'}
        bg={'var(--white)'}
        onClick={onCloseMemberList}
      >
        <ModalHeader
          fontSize={'1.8rem'}
          fontWeight={700}
          bg={'var(--white)'}
          color={'var(--black)'}
        >
          그룹 생성
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <section className={'flex flex-col justify-evenly items-start w-h-full'}>
            <div className={'mx-auto'}>
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>그룹 이름 (필수)</span>
              <div className={'flex items-center'}>
                <input
                  className={`border-base mt-4 mb-2 w-[29rem] h-14 rounded-xl px-4 py-2 text-[1.1rem] text-black `}
                  type="text"
                  value={groupName}
                  onChange={onChangeGroupName}
                  placeholder={'그룹 이름을 작성해주세요.'}
                  maxLength={10}
                />
              </div>
            </div>

            <div className={'mx-auto'}>
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>초대 멤버</span>

              <div className={'border-base rounded-xl flex items-center w-[29rem] mt-4 relative'}>
                <Scrollbars
                  // This will activate auto hide
                  autoHide
                  autoHeight
                  autoHeightMax={130}
                  autoHeightMin={110}
                  // Hide delay in ms
                  autoHideTimeout={1000}
                  // Duration for hide animation in ms.
                  autoHideDuration={200}
                >
                  <div className={'grid grid-cols-3 px-4'}>
                    {productMembers?.map((member: ProductMember) => {
                      return (
                        <span
                          key={member.memberId}
                          className={`flex items-center px-3 py-3 text-[0.93rem] cursor-pointer ${
                            !member.isOpen && 'hidden'
                          }`}
                        >
                          <img
                            src={member.image ?? '/public/images/test_userprofile.png'}
                            alt={`${member.memberName}님의 이미지`}
                            className={'w-8 h-8 mr-3 rounded-[50%]'}
                          />
                          <span className={'ellipsis'}>
                            {member.memberName}({member.memberName})
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </Scrollbars>

                <span
                  className={'cursor-pointer absolute top-2 right-2'}
                  onClick={(event) => {
                    onClickMemberList();
                    stopPropagation(event);
                  }}
                >
                  <AiOutlinePlus className={'text-2xl fill-gray-light'} />
                </span>
                {isClickMemberList && (
                  <div
                    className={'absolute top-9 right-2 w-40 bg-white rounded shadow-sign-up'}
                    onClick={stopPropagation}
                  >
                    <Scrollbars
                      // This will activate auto hide
                      autoHide
                      autoHeight
                      autoHeightMax={180}
                      // Hide delay in ms
                      autoHideTimeout={1000}
                      // Duration for hide animation in ms.
                      autoHideDuration={200}
                    >
                      {productMembers?.map((member: ProductMember, index) => {
                        return (
                          <span
                            key={member.memberId}
                            className={`flex items-center px-3 py-3 text-[0.93rem] cursor-pointer ${
                              member.isOpen && 'bg-orange-light'
                            }`}
                            onClick={() => onClickMember(index)}
                          >
                            <img
                              src={member.image ?? '/public/images/test_userprofile.png'}
                              alt={`${member.memberName}님의 이미지`}
                              className={'w-8 h-8 mr-3 rounded-[50%]'}
                            />
                            <span className={'ellipsis'}>
                              {member.memberName}({member.memberName})
                            </span>
                          </span>
                        );
                      })}
                    </Scrollbars>
                  </div>
                )}
              </div>
            </div>
          </section>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-sm text-white w-[4.5rem] h-9'}
            onClick={onClickCreate}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
