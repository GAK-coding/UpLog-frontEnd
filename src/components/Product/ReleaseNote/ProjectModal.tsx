import React, { useCallback, useEffect, useRef } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from '@chakra-ui/react';
import useInput from '@/hooks/useInput.ts';
import { BsQuestionCircle } from 'react-icons/bs';
import CompleteModalTooltip from '@/components/Member/MyPage/CompleteModalTooltip.tsx';
import { completeProject, createProject } from '@/api/Project/Version.ts';
import { useMutation, useQueryClient } from 'react-query';
import { ProductInfo } from '@/typings/product.ts';
import { eachProductProjects } from '@/recoil/Project/atom.ts';
import { useRecoilState } from 'recoil';
import { Release } from '@/typings/project.ts';
type MessageType = 'success' | 'error' | 'warning';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isAdd: boolean;
  versionName: string;
  showMessage: (type: MessageType, content: string) => void;
  nowProjectId: number;
}
export default function ProjectModal({
  isOpen,
  onClose,
  isAdd,
  versionName,
  showMessage,
  nowProjectId,
}: Props) {
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const queryClient = useQueryClient();

  // 프로젝트 추가에서는 프로젝트 이름, 완료에서는 최종 버전
  const [text, onChangeText, setText] = useInput('');
  const [projects, setProjects] = useRecoilState(eachProductProjects);
  const newProjectId = useRef(-1);

  const { mutate: createProjectMutate } = useMutation(createProject, {
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        newProjectId.current = data.id;
      }
    },
    onMutate: async ({ version }) => {
      await queryClient.cancelQueries(['getAllProductProjects', nowProduct?.productId]);

      const snapshot = queryClient.getQueryData(['getAllProductProjects', nowProduct?.productId]);

      queryClient.setQueriesData(['getAllProductProjects', nowProduct?.productId], () => {
        const temp: Release[] = [...projects, { version, projectStatus: 'PROGRESS_IN', id: -1 }];

        return temp;
      });

      return { snapshot };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueriesData(
        ['getAllProductProjects', nowProduct?.productId],
        context?.snapshot
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllProductProjects', nowProduct?.productId] });
    },
  });

  const { mutate: completeProjectMutate } = useMutation(completeProject, {
    onMutate: async ({ version, projectId }) => {
      await queryClient.cancelQueries(['getAllProductProjects', nowProduct?.productId]);

      const snapshot = queryClient.getQueryData(['getAllProductProjects', nowProduct?.productId]);

      queryClient.setQueriesData(['getAllProductProjects', nowProduct?.productId], () => {
        const temp: Release[] = projects.map((project) => {
          if (project.id === projectId) {
            return { ...project, version, projectStatus: 'PROGRESS_COMPLETE' };
          } else return project;
        });

        setProjects(temp);
        return temp;
      });

      return { snapshot };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueriesData(
        ['getAllProductProjects', nowProduct?.productId],
        context?.snapshot
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllProductProjects', nowProduct?.productId] });
    },
  });

  const onClickCreateProject = useCallback(() => {
    if (projects.some((project) => project.version === text)) {
      showMessage('error', '이미 존재하는 버전입니다!');
      return;
    }

    //TODO: url 수정 필요
    createProjectMutate({ productId: nowProduct?.productId, version: `${text}(임시)`, link: '/' });
    showMessage('success', '프로젝트가 생성되었습니다!');
    onClose();
    setText('');
  }, [text]);

  const onClickCompleteProject = useCallback(() => {
    if (projects.some((project) => project.version === text)) {
      showMessage('error', '이미 존재하는 버전입니다!');
      return;
    }

    completeProjectMutate({
      projectId: nowProjectId === -1 ? newProjectId.current : nowProjectId,
      version: text,
    });
    showMessage('success', '프로젝트 완료!');
    onClose();
    setText('');
  }, [text, newProjectId]);

  useEffect(() => {
    if (versionName && !isAdd) {
      setText(versionName.replace('(임시)', ''));
    } else setText('');
  }, [isAdd]);

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />

      <ModalContent
        maxW={'41rem'}
        h={'22rem'}
        shadow={'boxShadow-sign-up'}
        rounded={'none'}
        p={'1.2rem'}
        bg={'var(--white)'}
      >
        <ModalHeader
          fontSize={'1.8rem'}
          fontWeight={700}
          bg={'var(--white)'}
          color={'var(--black)'}
        >
          {isAdd ? '프로젝트 추가' : '프로젝트 완료'}
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <section className={'flex flex-col justify-center items-start w-h-full'}>
            <div className={'mx-auto'}>
              <span className={'text-gray-dark font-bold text-[1.2rem]'}>
                {isAdd ? '버전 입력' : '최종 버전 입력'}
              </span>
              <div className={'flex items-center'}>
                <input
                  className={`border-base mt-4 mb-2 ${
                    isAdd ? 'w-[29rem]' : 'w-[25rem]'
                  } h-14 rounded-xl px-4 py-2 text-[1.1rem] text-black `}
                  type="text"
                  value={text}
                  onChange={onChangeText}
                  placeholder={
                    isAdd ? '새로 생성할 버전을 입력해 주세요.' : '최종 버전을 입력해 주세요.'
                  }
                  maxLength={10}
                />

                {!isAdd && (
                  <Tooltip
                    placement={'bottom-start'}
                    label={<CompleteModalTooltip />}
                    color={'var(--black)'}
                    backgroundColor={'var(--white)'}
                    minW={'29rem'}
                    boxShadow={
                      '2px 2px 5px 1px rgba(0, 0, 0, 0.05), -2px -2px 5px 0px rgba(0, 0, 0, 0.05)'
                    }
                    borderRadius={'0.31rem'}
                  >
                    <span className={'flex-col-center mt-3 ml-4 text-gray-dark cursor-pointer '}>
                      <BsQuestionCircle className={'text-3xl mb-1'} />
                      버전
                    </span>
                  </Tooltip>
                )}
              </div>
              {isAdd && (
                <span className={'text-gray-light text-[0.6rem] ml-2'}>
                  * 현재 생성되는 버전은 임시 버전이며, 완료 시 최종 버전명을 재설정할 수 있습니다.
                </span>
              )}
            </div>
          </section>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-sm text-white w-[4.5rem] h-9'}
            onClick={() => {
              isAdd ? onClickCreateProject() : onClickCompleteProject();
            }}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
