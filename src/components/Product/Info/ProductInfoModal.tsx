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
import useInput from '@/hooks/useInput.ts';
import { useCallback, useState } from 'react';
import { useMessage } from '@/hooks/useMessage.ts';
import ImageCrop from '@/components/Member/MyPage/ImageCrop.tsx';
import { UploadFile, UploadProps } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import { FiUpload } from 'react-icons/fi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isCreateProduct: boolean;
}

export default function ProductInfoModal({ isOpen, onClose, isCreateProduct }: Props) {
  const [productName, onChangeProductName] = useInput('');
  const [masterEmail, onChangeMasterEmail] = useInput('');
  const [clientEmail, onChangeClientEmail] = useInput('');
  const { showMessage, contextHolder } = useMessage();

  // 제품 이미지 업로드
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob: RcFile): Promise<void> => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
        resolve();
      };
    });
  };

  const onImageChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    await setFileList(newFileList);
    if (newFileList.length > 0) await encodeFileToBase64(newFileList?.[0]?.originFileObj!);
  };
  // 제품 추가 완료 버튼
  const onClickMakeProduct = useCallback(() => {
    // 필수 정보를 입력하지 않았을 때
    if (!productName || !masterEmail) {
      showMessage('warning', '필수 정보를 입력해주세요.');
      console.log(productName, masterEmail);
      return;
    }

    // TODO : 제품 정보 생성 + 이메일로 초대하기
    onClose();
  }, [productName, masterEmail]);

  // 마스터, 의뢰인 설정 시 유효한 이메일인지 확인
  const checkEmail = useCallback(() => {
    // TODO : 유효한 이메일인지 확인하기 (가입이 되어있는 이메일만 입력하는걸로 할지?)
  }, [clientEmail, masterEmail]);

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        maxW="40.5rem"
        h={isCreateProduct ? '48rem' : '42rem'}
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
          {isCreateProduct ? '제품 추가' : '제품 정보 수정'}
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
              <div className={'w-full mt-4 mb-5 text-[1rem]'}>
                <div className={'flex mb-[0.93rem]'}>
                  <span className={'text-gray-dark font-bold'}>제품 이름</span>
                  <span
                    className={
                      'text-gray-light self-center font-semibold text-[0.62rem] ml-[0.3rem]'
                    }
                  >
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
              <div className={'w-full mb-5 text-[1rem]'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>제품 이미지</span>
                <div className={'flex-row-center w-[9.3rem] h-[9.3rem] z-40'}>
                  <ImageCrop
                    fileList={fileList}
                    onImageChange={onImageChange}
                    cropShape={'rect'}
                    listType={'picture-card'}
                  >
                    {fileList.length < 1 && (
                      <div className={'flex-col-center border-base w-h-full'}>
                        <FiUpload className={'flex w-[5rem] h-[5rem] stroke-gray-light'} />
                        <span className={'flex text-gray-light'}>Image</span>
                      </div>
                    )}
                  </ImageCrop>
                </div>
              </div>

              {/*마스터 설정*/}
              {isCreateProduct && (
                <div className={'w-full mb-5 text-[1rem]'}>
                  <div className={'flex mb-[0.93rem]'}>
                    <span className={'text-gray-dark font-bold'}>마스터 설정</span>
                    <span
                      className={
                        'text-gray-light self-center font-semibold text-[0.62rem] ml-[0.3rem]'
                      }
                    >
                      (필수)
                    </span>
                  </div>
                  <div
                    className={
                      'flex w-full h-11 border-base border-gray-border rounded-xl relative'
                    }
                  >
                    <input
                      type="text"
                      value={masterEmail}
                      onChange={onChangeMasterEmail}
                      placeholder={'이메일을 입력해주세요.'}
                      className={
                        'self-center w-[20.7rem] h-9 p-4 bg-transparent text-[1rem] text-black'
                      }
                    />
                    <span
                      className={
                        'self-center bg-orange rounded font-bold text-xs text-white h-7 mr-2 w-[3.5rem]'
                      }
                    >
                      <button
                        type={'button'}
                        className={'self-center font-bold text-xs text-white h-7 mr-2 w-[3.5rem]'}
                        onClick={checkEmail}
                      >
                        확인
                      </button>
                    </span>
                  </div>
                </div>
              )}

              {/*의뢰인 초대*/}
              <div className={'w-full mb-3 text-[1rem]'}>
                <span className={'text-gray-dark font-bold mb-[0.93rem]'}>의뢰인 초대</span>
                <div
                  className={'flex w-full h-11 border-base border-gray-border rounded-xl relative'}
                >
                  <input
                    type="text"
                    value={clientEmail}
                    onChange={onChangeClientEmail}
                    placeholder={'이메일은 쉼표(,)로 구분해 주세요.'}
                    className={
                      'self-center w-[20.7rem] h-9 bg-transparent p-4 text-[1rem] text-black'
                    }
                  />
                  <span
                    className={
                      'self-center bg-orange rounded font-bold text-xs text-white h-7 mr-2 w-[3.5rem]'
                    }
                  >
                    <button
                      type={'button'}
                      className={'self-center font-bold text-xs text-white h-7 mr-2 w-[3.5rem]'}
                      onClick={checkEmail}
                    >
                      확인
                    </button>
                  </span>
                </div>
              </div>
            </section>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <button
            className={'bg-orange rounded font-bold text-xs text-white h-9 w-[4.5rem]'}
            onClick={onClickMakeProduct}
          >
            완료
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
