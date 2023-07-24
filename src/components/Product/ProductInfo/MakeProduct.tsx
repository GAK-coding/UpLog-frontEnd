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
import { useCallback } from 'react';
import { useMessage } from '@hooks/useMessage.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MakeProduct({ isOpen, onClose }: Props) {
  const [productName, onChangeProductName, setProductName] = useInput('');
  const [masterEmail, onChangeMasterEmail, setMasterEmail] = useInput('');
  const [clientEmail, onChangeClientEmail, setClientEmail] = useInput('');
  const { showMessage, contextHolder } = useMessage();

  const onClickMakeProduct = useCallback(() => {
    if (!productName || !masterEmail) {
      showMessage('warning', '필수 정보를 입력해주세요.');
      console.log(productName, masterEmail);
      return;
    }
    onClose();
  }, [productName, masterEmail]);

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
              {contextHolder}

              {/*제품 이름*/}
              <div className={'w-full mt-4 mb-5 text-[1.1rem]'}>
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
                    'w-full h-11 border-base border-gray-border text-[1rem] rounded-xl mb-2 p-4 text-black'
                  }
                />
              </div>
              {/*제품 이미지*/}
              <div className={'w-full mb-5 text-[1.1rem]'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>제품 이미지</span>
                <div className={'border-base w-[9.3rem] h-[9.3rem]'}></div>
              </div>

              {/*마스터 설정*/}
              <div className={'w-full mb-5 text-[1.1rem]'}>
                <div className={'flex'}>
                  <span className={'text-gray-dark font-bold mb-[0.93rem]'}>마스터 설정</span>
                  <span className={'text-gray-light font-semibold text-[0.62rem] ml-[0.3rem]'}>
                    (필수)
                  </span>
                </div>
                <div
                  className={'flex w-full h-11 border-base border-gray-border rounded-xl relative'}
                >
                  <input
                    type="text"
                    value={masterEmail}
                    onChange={onChangeMasterEmail}
                    placeholder={'이메일을 입력해주세요.'}
                    className={'w-[20.7rem] h-9 p-4 text-[1rem] text-black'}
                  />
                  <button
                    className={
                      'self-center bg-orange rounded font-bold text-xs text-white h-7 mr-2 w-[3.5rem]'
                    }
                  >
                    확인
                  </button>
                </div>
              </div>

              {/*의뢰인 초대*/}
              <div className={'w-full mb-3 text-[1.1rem]'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>의뢰인 초대</span>
                <div
                  className={'flex w-full h-11 border-base border-gray-border rounded-xl relative'}
                >
                  <input
                    type="text"
                    value={clientEmail}
                    onChange={onChangeClientEmail}
                    placeholder={'이메일은 쉼표(,)로 구분해 주세요.'}
                    className={'w-[20.7rem] h-9 p-4 text-[1rem] text-black'}
                  />
                  <button
                    className={
                      'self-center bg-orange rounded font-bold text-xs text-white h-7 mr-2 w-[3.5rem]'
                    }
                  >
                    확인
                  </button>
                </div>
              </div>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-sm text-white h-9 w-[4.5rem]'}
            onClick={onClickMakeProduct}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
