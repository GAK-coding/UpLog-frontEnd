import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { useMessage } from '@/hooks/useMessage.ts';
import useInput from '@/hooks/useInput.ts';
import { SelectMenu } from '@/typings/project.ts';
import { DatePicker, DatePickerProps, Select } from 'antd';
import { ChangeEvent, useCallback } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateTask({ isOpen, onClose }: Props) {
  const { showMessage, contextHolder } = useMessage();

  const [taskName, onChangeTaskName] = useInput('');
  const [taskDescription, , setTaskDescription] = useInput('');

  const dateData: SelectMenu[] = [
    { value: '날짜', label: '날짜' },
    {
      value: '최신순',
      label: '최신순',
    },
  ];
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    //TODO : Task 상태, 날짜별로 필터링해서 보여주기
    console.log(value);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeTaskDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(e.target.value);
  }, []);

  const onClickCreateTask = useCallback(() => {}, []);
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        maxW="40rem"
        h={'55rem'}
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
          Task 생성
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <Flex justifyContent={'center'} h={'100%'}>
            <section className={'flex-col-center justify-evenly w-[80%] h-full'}>
              {contextHolder}

              {/*Task 정보 입력 -> 제목*/}
              <div className={'w-full mt-4 mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>Task 제목</span>
                <input
                  type="text"
                  value={taskName}
                  onChange={onChangeTaskName}
                  placeholder={'Task 제목을 입력해주세요.'}
                  maxLength={10}
                  className={
                    'w-full h-11 border-base border-gray-border text-[1rem] rounded-xl mb-2 p-4 text-black'
                  }
                />
              </div>

              {/*Task 기간 지정*/}
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>기간 설정</span>
                <div className={'w-h-full'}>
                  <Select
                    labelInValue
                    defaultValue={dateData[0]}
                    onChange={handleChange}
                    style={{ width: 120 }}
                    options={dateData}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
              </div>

              {/* 날짜 선택*/}
              <div className={'flex-row-center w-full mb-5 text-[1rem]'}>
                <div className={'flex-col w-1/2'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>시작 날짜</span>
                  <DatePicker onChange={onChange} placement={'bottomLeft'} />
                </div>
                <div className={'flex-col w-1/2 ml-16'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>종료 날짜</span>
                  <DatePicker onChange={onChange} placement={'bottomLeft'} />
                </div>
              </div>

              {/*메뉴 선택*/}
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>메뉴</span>
                <div className={'w-h-full'}>
                  <Select
                    labelInValue
                    defaultValue={dateData[0]}
                    onChange={handleChange}
                    style={{ width: 120 }}
                    options={dateData}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
              </div>

              {/*그룹 + 할당자*/}
              <div className={'flex-row-center w-full mb-5 text-[1rem]'}>
                <div className={'flex-col w-1/2'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>그룹</span>
                  <Select
                    labelInValue
                    defaultValue={dateData[0]}
                    onChange={handleChange}
                    style={{ width: 120 }}
                    options={dateData}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
                <div className={'flex-col w-1/2 ml-16'}>
                  <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>할당자</span>
                  <Select
                    labelInValue
                    defaultValue={dateData[0]}
                    onChange={handleChange}
                    style={{ width: 120 }}
                    options={dateData}
                    dropdownStyle={{
                      backgroundColor: 'var(--gray-sideBar)',
                      color: 'var(--black)',
                      borderColor: 'var(--border-line)',
                    }}
                  />
                </div>
              </div>

              {/*상세 설명*/}
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'flex mb-[0.5rem] text-gray-dark font-bold'}>메뉴</span>
                <div className={'w-full h-[80%]'}>
                  <Textarea
                    value={taskDescription}
                    onChange={onChangeTaskDescription}
                    border={'1px solid var(--border-line)'}
                    height={'100%'}
                    focusBorderColor={'none'}
                    resize={'none'}
                    placeholder="Task에 대한 상세 설명을 입력해주세요."
                    color={'var(--black)'}
                  />
                </div>
              </div>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-xs text-white h-9 w-[4.5rem]'}
            onClick={onClickCreateTask}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
