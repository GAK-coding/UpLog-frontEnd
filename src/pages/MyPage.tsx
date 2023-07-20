import React, { useCallback, useState } from 'react';
import { UploadFile, UploadProps } from 'antd/lib';
import { useDisclosure } from '@chakra-ui/react';
import ChangePwModal from '../components/MyPage/ChangePwModal.tsx';
import { FaUserCircle } from 'react-icons/fa';
import { BsFillCameraFill } from 'react-icons/bs';
import ImageCrop from '../components/MyPage/ImageCrop..tsx';
import { RcFile } from 'antd/es/upload';

export default function MyPage() {
  // 비밀번호 변경 모달
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClickPwChange, setIsClickPwChange] = useState(false);

  const onChangeIsClickPw = useCallback((chk: boolean) => {
    setIsClickPwChange(chk);
  }, []);

  // 이미지
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

  return (
    <section className={'mypage flex flex-col items-center w-full h-[68rem]'}>
      <article className={'w-[43rem] h-[40rem] mt-12'}>
        <h1 className={'h-[10%] text-3xl font-bold'}>프로필 수정</h1>
        <div
          className={
            'w-full h-[90%] border-base border-line border-bg rounded-xl p-6 shadow-sign-up'
          }
        >
          {/* 상단 */}
          <div className={'flex-row-center justify-between w-full h-[13%]'}>
            <div className={'flex-col-center items-start'}>
              <span className={'text-xl font-bold'}>오현 프로필 관리</span>
              <span className={'text-[0.93rem] text-gray-dark'}>qhslsl@gmail.com</span>
            </div>
            <div className={'h-full flex-col-center justify-end'}>
              <button
                className={'text-gray-dark text-[0.93rem] font-bold underline'}
                onClick={() => {
                  onOpen();
                  onChangeIsClickPw(true);
                }}
              >
                비밀번호 변경
              </button>
            </div>
          </div>
          {/* 프로필 정보 수정 */}
          <div className={'w-full h-[79%] flex-col-center justify-end mt-[-1rem]'}>
            <div className={'h-[40%] flex-col-center justify-end mb-[1rem]'}>
              <ImageCrop
                fileList={fileList}
                onImageChange={onImageChange}
                cropShape={'round'}
                listType={'picture-circle'}
              >
                {fileList.length < 1 && (
                  <div className={'relative'}>
                    <FaUserCircle className={'w-[10rem] h-[10rem] fill-gray-dark'} />
                    <span
                      className={
                        'flex-row-center absolute bottom-[0.8rem] right-[0.8rem] w-7 h-7 rounded-[50%] bg-gray-light'
                      }
                    >
                      <BsFillCameraFill className={'fill-[#292723]'} />
                    </span>
                  </div>
                )}
              </ImageCrop>
            </div>

            <label className={'w-[22rem] flex-col-center justify-start items-start h-[25%]'}>
              <span className={'text-gray-dark text-[0.93rem] font-bold mb-4'}>이름</span>
              <input
                className={
                  'border-base border-gray-border w-full h-10 rounded-[0.625rem] text-[0.93rem] font-bold p-2'
                }
                type="text"
                maxLength={10}
                placeholder={'이름'}
              />
            </label>

            <label className={'w-[22rem] flex-col-center justify-start items-start h-[25%]'}>
              <span className={'text-gray-dark text-[0.93rem] font-bold mb-4'}>닉네임</span>
              <input
                className={
                  'border-base border-gray-border w-full h-10 rounded-[0.625rem] text-[0.93rem] font-bold p-2'
                }
                type="text"
                maxLength={10}
                placeholder={'닉네임'}
              />
            </label>
          </div>
          {/*  확인 취소 버튼  */}
          <div className={'w-full h-[8%] flex-row-center justify-end px-11 mt-[1rem]'}>
            <button className={'w-16 h-9 rounded-[0.3rem] bg-orange text-white text-xs font-bold'}>
              취소
            </button>
            <button
              className={'w-16 h-9 rounded-[0.3rem] bg-orange text-white text-xs font-bold ml-4'}
            >
              저장
            </button>
          </div>
        </div>
      </article>
      <article className={'w-[43rem] h-48 mt-16'}>
        <h1 className={'h-16 text-3xl font-bold'}>계정 관리</h1>

        <div className={'w-full h-32 border-base rounded-xl p-6 shadow-sign-up'}>
          <span className={'text-xl font-bold'}>계정 삭제</span>
          <div className={'flex-row-center justify-between px-5 mt-4'}>
            <span className={'text-gray-dark text-xs'}>
              계정 삭제 시 프로필 및 참여한 제품의 모든 정보가 삭제됩니다.
            </span>
            <button
              onClick={() => {
                onOpen();
                onChangeIsClickPw(false);
              }}
              className={'w-32 h-9 bg-orange text-white font-bold text-sm rounded'}
            >
              계정 삭제
            </button>
          </div>
        </div>
      </article>

      <ChangePwModal isOpen={isOpen} onClose={onClose} isClickPwChange={isClickPwChange} />
    </section>
  );
}
