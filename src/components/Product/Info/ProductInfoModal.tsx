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
import { useCallback, useEffect, useState } from 'react';
import { useMessage } from '@/hooks/useMessage.ts';
import ImageCrop from '@/components/Member/MyPage/ImageCrop.tsx';
import { UploadFile, UploadProps } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import { FiUpload } from 'react-icons/fi';
import { useMutation, useQuery } from 'react-query';
import { createProduct, eachProduct, productEdit } from '@/api/Product/Product.ts';
import { ProductBody, ProductEditBody } from '@/typings/product.ts';
import { SaveUserInfo } from '@/typings/member.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isCreateProduct: boolean;
  productId: number;
}

export default function ProductInfoModal({ isOpen, onClose, isCreateProduct, productId }: Props) {
  const [productName, onChangeProductName, setProductName] = useInput('');
  const [masterEmail, onChangeMasterEmail, setMasterEmail] = useInput('');
  const [clientEmail, onChangeClientEmail, setClientEmail] = useInput('');
  const { showMessage, contextHolder } = useMessage();

  const userInfo: SaveUserInfo = JSON.parse(sessionStorage.getItem('userInfo')!);

  // TODO : 링크 임베딩 된 링크로 다시 보내기
  const productInfo: ProductBody = {
    name: productName,
    masterEmail: masterEmail,
    link: 'www.naver.com',
  };

  const updateProductInfo: ProductEditBody = {
    link: null,
    newName: productName,
    memberEmailList: [],
    powerType: null,
  };

  // 제품 이미지 업로드
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageSrc, setImageSrc] = useState('');

  // 제품 생성
  const { mutate: createProductMutate } = useMutation(() => createProduct(productInfo), {
    onSuccess: (data) => {
      if (data === 'create product fail') {
        showMessage('error', '중복된 제품 이름입니다.');
        return;
      } else {
        if (typeof data === 'object' && 'message' in data) {
          if (data.httpStatus === 'NOT_FOUND')
            showMessage('warning', '마스터 정보가 올바르지 않습니다.');
          else showMessage('error', '제품 생성 권한이 없습니다.');
        } else {
          showMessage('success', '제품이 생성되었습니다.');
          setTimeout(() => onClose(), 2000);
        }
      }
    },
  });

  // TODO : staleTime 확인 필요
  // 제품 정보 조회
  const { refetch, data: productGetData } = useQuery(
    ['getProjectInfo'],
    () => eachProduct(productId),
    {
      onSuccess: (data) => {
        if (typeof data === 'object' && 'message' in data) {
          showMessage('error', '제품 정보를 불러오는데 실패했습니다.');
        } else if (typeof data !== 'string' && 'name' in data) {
          setProductName(data.name);
        }
      },
      enabled: false,
      staleTime: 6000, // 1분
      cacheTime: 8000, // 1분 20초
      refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
      refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
      refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
    }
  );

  // 제품 정보 수정
  const { mutate: updateProduct } = useMutation(() => productEdit(updateProductInfo, productId), {
    onSuccess: (data) => {
      if (typeof data === 'object') {
        showMessage('success', '제품 정보가 변경되었습니다.');
        setTimeout(() => onClose(), 2000);
      }
    },
  });

  // 사진 업로드
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
    if (!isCreateProduct) {
      if (!productName) {
        showMessage('warning', '제품 이름을 입력해주세요.');
        return;
      }

      // 변경된 사항이 없으면 수정 요청 보내지 않음
      if (typeof productGetData === 'object' && productGetData !== null) {
        if ('name' in productGetData && productName === productGetData.name) {
          showMessage('warning', '변경된 정보가 없습니다.');
          return;
        }
      }

      // 수정 요청 보냄
      updateProduct();
      return;
    }
    // 필수 정보를 입력하지 않았을 때
    if (!productName || !masterEmail) {
      showMessage('warning', '필수 정보를 입력해주세요.');
      return;
    }

    // 제품 생성
    createProductMutate();
  }, [productName, masterEmail]);

  useEffect(() => {
    // 모달창 껏다가 키면 정보 초기화
    if (isCreateProduct) {
      setProductName('');
      setClientEmail('');
      setMasterEmail('');
    }

    // 수정일 경우에 기존 post 정보로 값 채워넣기
    else {
      refetch();
    }
  }, [isOpen, isCreateProduct, productId]);

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
                <span className={'text-gray-dark font-bold'}>제품 이미지</span>
                <div className={'flex-row-center w-[9.3rem] h-[9.3rem] z-40 mt-[0.93rem]'}>
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
                  </div>
                </div>
              )}

              {/*의뢰인 초대*/}
              <div className={'w-full mb-3 text-[1rem]'}>
                <span className={'text-gray-dark font-bold'}>의뢰인 초대</span>
                <div
                  className={
                    'flex w-full h-11 border-base border-gray-border rounded-xl relative mt-[0.93rem]'
                  }
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
