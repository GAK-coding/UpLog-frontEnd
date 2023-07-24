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
import useInput from '@hooks/useInput.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MakeProduct({ isOpen, onClose }: Props) {
  const [productName, onChangeProductName, setProductName] = useInput('');
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        maxW="39.5rem"
        h={'46rem'}
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
          제품 추가
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody>
          <Flex justifyContent={'center'} h={'100%'}>
            <section className={'flex-col-center justify-evenly w-[25rem] h-full'}>
              {/*제품 이름*/}
              <div className={'w-full mt-4 mb-6 text-[0.93rem]'}>
                <div className={'flex'}>
                  <span className={'text-gray-dark font-bold mb-[0.93rem]'}>제품 이름</span>
                  <span className={'text-gray-light font-semibold text-[0.62rem] ml-[0.3rem]'}>
                    (필수)
                  </span>
                </div>
                <input
                  type="text"
                  value={productName}
                  onChange={onChangeProductName}
                  placeholder={'제품 이름을 입력해주세요. (최대 10자)'}
                  maxLength={10}
                  className={
                    'w-full h-10 border-base border-gray-border rounded-xl mb-2 p-4 text-black'
                  }
                />
              </div>
              {/*제품 이미지*/}
              <div className={'w-full mb-6 text-[0.93rem]'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>제품 이미지</span>
                <div className={'border-base w-[9.3rem] h-[9.3rem]'}></div>
              </div>

              {/*마스터 설정*/}
              <div className={'w-full mb-4 text-[0.93rem]'}>
                <div className={'flex'}>
                  <span className={'text-gray-dark font-bold mb-[0.93rem]'}>마스터 설정</span>
                  <span className={'text-gray-light font-semibold text-[0.62rem] ml-[0.3rem]'}>
                    (필수)
                  </span>
                </div>
                <input
                  type="text"
                  value={productName}
                  onChange={onChangeProductName}
                  placeholder={'이메일을 입력해주세요.'}
                  maxLength={10}
                  className={'w-full h-10 border-base border-gray-border rounded-xl p-4 text-black'}
                />
              </div>

              {/*의뢰인 초대*/}
              <div className={'w-full mb-4 text-[0.93rem]'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>의뢰인 초대</span>
                <input
                  type="text"
                  value={productName}
                  onChange={onChangeProductName}
                  placeholder={'이메일은 쉼표(,)로 구분해 주세요.'}
                  maxLength={10}
                  className={'w-full h-10 border-base border-gray-border rounded-xl p-4 text-black'}
                />
              </div>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-xs text-white h-9 w-[4.5rem]'}
            // onClick={onClickChangePw}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
