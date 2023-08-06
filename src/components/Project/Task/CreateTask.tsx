import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMessage } from '@/hooks/useMessage.ts';
import useInput from '@/hooks/useInput.ts';
import { SelectMenu } from '@/typings/project.ts';
import { DatePicker, DatePickerProps, Select } from 'antd';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function CreateTask({ isOpen, onClose }: Props) {
  const { showMessage, contextHolder } = useMessage();

  const [taskName, onChangeTaskName] = useInput('');

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

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        maxW="40rem"
        h={'50rem'}
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
                <span className={'flex mb-[0.93rem] text-gray-dark font-bold'}>Task 제목</span>
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
                <span className={'flex mb-[0.93rem] text-gray-dark font-bold'}>기간 설정</span>
                <div className={'w-h-full'}>
                  <Select
                    labelInValue
                    defaultValue={dateData[0]}
                    onChange={handleChange}
                    style={{ width: 100 }}
                    options={dateData}
                  />
                </div>
              </div>

              {/* 날짜 선택*/}
              <div className={'flex-row-center w-full mb-5 text-[1rem]'}>
                <div className={'w-1/2 bg-teal-200 pr-6 z-50'}>
                  <span className={'flex mb-[0.93rem] text-gray-dark font-bold'}>시작 날짜</span>
                  <DatePicker onChange={onChange} placement={'bottomLeft'} />
                </div>
                <div className={'w-1/2 bg-amber-400 pl-6'}>
                  <span className={'flex mb-[0.93rem] text-gray-dark font-bold'}>종료 날짜</span>
                </div>
              </div>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          {/*<button*/}
          {/*  className={'bg-orange rounded font-bold text-xs text-white h-9 w-[4.5rem]'}*/}
          {/*  onClick={onClickMakeProduct}*/}
          {/*>*/}
          {/*  완료*/}
          {/*</button>*/}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
