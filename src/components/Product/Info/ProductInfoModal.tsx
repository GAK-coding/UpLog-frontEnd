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
import { useMutation, useQueryClient } from 'react-query';
import { createProduct, productEdit } from '@/api/Product/Product.ts';
import { ProductBody, ProductEditBody, SaveProductInfo } from '@/typings/product.ts';
import { useGetEachProduct } from '@/components/Product/hooks/useGetEachProduct.ts';
import { useRecoilValue } from 'recoil';
import { frontEndUrl } from '@/recoil/Common/atom.ts';
import { imageUpload } from '@/api/Members/mypage.ts';
import { useGetAllProduct } from '@/components/Product/hooks/useGetAllProduct.ts';
import { sendLog } from '@/api/Log';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isCreateProduct: boolean;
  productId: number;
}

export default function ProductInfoModal({ isOpen, onClose, isCreateProduct, productId }: Props) {
  const [productName, onChangeProductName, setProductName] = useInput('');
  const [masterEmail, onChangeMasterEmail, setMasterEmail] = useInput('');
  const [clientEmail, onChangeClientEmail, setClientEmail] = useInput<string>('');
  const { showMessage, contextHolder } = useMessage();
  const baseUrl = useRecoilValue(frontEndUrl);
  const [check, setCheck] = useState(false);
  const [productList, allProductListRefetch] = useGetAllProduct(false);
  const nowProduct: SaveProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);

  const [productInfo, setProductInfo] = useState<ProductBody>({
    name: '',
    image: null,
    masterEmail: '',
    clientEmail: null,
    link: `${baseUrl}`,
  });

  const [updateProductInfo, setUpdateProductInfo] = useState<ProductEditBody>({
    link: null,
    newName: productName,
    memberEmailList: [],
    powerType: null,
    image: null,
  });

  // 제품 이미지 업로드
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageSrc, setImageSrc] = useState('');
  const [imgUrl, setImgUrl] = useState<undefined | string>(undefined);

  const queryClient = useQueryClient();

  // 로그
  const { mutate: sendLogMutate } = useMutation(sendLog);

  // 제품 생성
  const { mutate: createProductMutate } = useMutation(
    () =>
      createProduct({
        ...productInfo,
        clientEmail: !clientEmail ? null : clientEmail,
        image: !imgUrl ? null : imgUrl,
      }),
    {
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
            allProductListRefetch();
            setTimeout(() => onClose(), 2000);
          }
        }
      },
    }
  );

  // TODO : staleTime 확인 필요
  // 제품 정보 조회
  const [productGetData, refetch] = useGetEachProduct(
    productId,
    showMessage,
    setProductName,
    false
  );

  // 제품 정보 수정
  const { mutate: updateProduct } = useMutation(productEdit, {
    onMutate: async (updateData) => {
      await queryClient.cancelQueries('myProductList');

      const previousProductList = queryClient.getQueryData('myProductList');

      queryClient.setQueryData('myProductList', updateData);

      sessionStorage.setItem(
        'nowProduct',
        JSON.stringify({ ...nowProduct, productName: updateProductInfo.newName })
      );

      return () => queryClient.setQueryData('myProductList', previousProductList);
    },
    onSuccess: (data) => {
      if (typeof data !== 'string' && data.updateResultDTO) {
        const { failCnt, failMemberList, duplicatedCnt, duplicatedMemberList } =
          data.updateResultDTO;

        if (failCnt > 0 && duplicatedCnt > 0) {
          showMessage(
            'error',
            `${failMemberList.join(', ')}님 가입되어 있지 않고, ${duplicatedMemberList.join(
              ', '
            )}님은 이미 존재하여 초대에 실패했습니다.`
          );
          return;
        } else if (failCnt > 0) {
          showMessage(
            'error',
            `${failMemberList.join(', ')}님은 가입되어 있지 않아 초대에 실패했습니다.`
          );
          return;
        } else if (duplicatedCnt > 0) {
          showMessage(
            'error',
            `${duplicatedMemberList.join(', ')}님은 이미 존재하여 초대에 실패했습니다.`
          );
          return;
        }

        showMessage('success', '제품 수정이 완료되었습니다.');
        setTimeout(() => onClose(), 2000);
      }
    },
    onError: (error, value, rollback) => {
      if (rollback) {
        rollback();
        showMessage('error', '제품 정보 변경에 실패했습니다.');
      } else {
        showMessage('error', '제품 정보 변경에 실패했습니다.');
      }
    },
    onSettled: () => {
      return queryClient.invalidateQueries('myProductList');
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
      if ('name' in productGetData && productName === productGetData.name && clientEmail === '') {
        showMessage('warning', '변경된 정보가 없습니다.');
        return;
      }

      if (clientEmail === '') {
        setUpdateProductInfo({
          ...updateProductInfo,
          newName: productName,
        });
      } else {
        let isEmailFormat = true;
        const clientEmailList = clientEmail
          .split(',')
          .map((email) => {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(email.trim()) && email.trim() !== '') {
              isEmailFormat = false;
            }

            if (email.trim() !== '') {
              return email.trim();
            } else {
              return null; // 빈 문자열이 아닌 경우에는 null을 반환하도록 수정
            }
          })
          .filter((email) => email !== null) as string[];

        if (!isEmailFormat) {
          showMessage('warning', '이메일 형식이 올바르지 않은 메일이 존재합니다.');
          return;
        }

        setUpdateProductInfo({
          ...updateProductInfo,
          memberEmailList: clientEmailList,
          link: `${baseUrl}`,
          powerType: 'CLIENT',
        });
      }
      setCheck(true);
      return;
    }

    // 필수 정보를 입력하지 않았을 때
    if (!productName || !masterEmail) {
      // log : 모든 정보를 입력하지 않았을 때
      if (!productName && !masterEmail) {
        sendLogMutate({ page: 'product', status: false, message: 'all' });
      }
      // log : 제품 이름만 입력하지 않았을 때
      else if (!productName) {
        sendLogMutate({ page: 'product', status: false, message: 'name' });
      }
      // log : 마스터 이메일만 입력하지 않았을 때
      else if (!masterEmail) {
        sendLogMutate({ page: 'product', status: false, message: 'master' });
      }

      showMessage('warning', '필수 정보를 입력해주세요.');
      return;
    }

    if (productInfo.clientEmail === '') {
      setProductInfo({
        ...productInfo,
        clientEmail: null,
      });
    }

    setProductInfo({
      name: productName,
      masterEmail: masterEmail,
      clientEmail: clientEmail,
      link: `${baseUrl}`,
      image: null,
    });
    setCheck(true);
  }, [productName, masterEmail, clientEmail, updateProductInfo, productGetData]);

  useEffect(() => {
    // 모달창 껏다가 키면 정보 초기화
    if (isCreateProduct) {
      setProductInfo({
        name: '',
        masterEmail: '',
        clientEmail: null,
        link: '',
        image: null,
      });
      setProductName('');
      setClientEmail('');
      setMasterEmail('');
    } else {
      // 수정일 경우에 기존 post 정보로 값 채워넣기
      refetch();
      setProductName('');
      setClientEmail('');
      setMasterEmail('');
    }
  }, [isOpen, isCreateProduct, productId]);

  useEffect(() => {}, [clientEmail]);
  useEffect(() => {
    // if (check) {
    //   isCreateProduct
    //     ? createProductMutate()
    //     : updateProduct({ data: updateProductInfo, productId });
    // }

    if (check) {
      if (isCreateProduct) {
        createProductMutate();
        sendLogMutate({ page: 'product', status: true, message: 'success' });
      } else {
        updateProduct({ data: updateProductInfo, productId });
      }
    }

    setUpdateProductInfo({
      link: null,
      newName: productName,
      memberEmailList: [],
      powerType: null,
      image: null,
    });
    setCheck(false);
  }, [check, isCreateProduct]);

  const getUrl = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const url = await imageUpload(formData);

    url && setImgUrl(url);
    url && setUpdateProductInfo({ ...updateProductInfo, image: url });
    return url;
  };

  useEffect(() => {
    if (fileList[0]) {
      getUrl(fileList[0].originFileObj!);
    }
  }, [fileList]);

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
