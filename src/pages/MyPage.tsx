import React, { useState } from 'react';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import message from 'antd/lib/message';
import { UploadFile, UploadProps } from 'antd/lib';
import { Button, Upload } from 'antd';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import ImgCrop from 'antd-img-crop';

export default function MyPage() {
  // 비밀번호 변경 모달
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 이미지
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <section className={'flex flex-col items-center w-h-full min-h-[70rem]'}>
      <article className={'w-[43rem] h-[40rem] mt-12'}>
        <h1 className={'h-[10%] text-3xl font-bold'}>프로필 수정</h1>
        <div
          className={
            'w-full h-[90%] border-base border-line border-bg rounded-xl p-6 shadow-sign-up'
          }
        >
          {/* 상단 */}
          <div className={'flex-row-center justify-between w-full h-[13%] border-base'}>
            <div className={'flex-col-center items-start'}>
              <span className={'text-xl font-bold'}>오현 프로필 관리</span>
              <span className={'text-[0.93rem] text-gray-dark'}>qhslsl@gmail.com</span>
            </div>
            <div className={'h-full flex-col-center justify-end '}>
              <button
                className={'text-gray-dark text-[0.93rem] font-bold underline'}
                onClick={onOpen}
              >
                비밀번호 변경
              </button>
            </div>
          </div>
          {/* 프로필 정보 수정 */}
          <div className={'w-full h-[79%] flex-col-center border-base'}>
            <div>
              <ImgCrop cropShape={'round'}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </div>
            <label className={'w-[22rem] flex-col-center items-start mb-5'}>
              <span className={'text-gray-dark text-[0.93rem] font-bold mb-4'}>이름</span>
              <input
                className={
                  // TODO: border-gray 뭐임!!!
                  'border-base border-gray w-full h-10 rounded-[0.625rem] text-[0.93rem] font-bold p-2'
                }
                type="text"
                maxLength={10}
                placeholder={'이름'}
              />
            </label>
            <label className={'w-[22rem] flex-col-center items-start'}>
              <span className={'text-gray-dark text-[0.93rem] font-bold mb-4'}>닉네임</span>
              <input
                className={
                  // TODO: border-gray 뭐임!!!
                  'border-base border-gray w-full h-10 rounded-[0.625rem] text-[0.93rem] font-bold p-2'
                }
                type="text"
                maxLength={10}
                placeholder={'닉네임'}
              />
            </label>
          </div>
          {/*  확인 취소 버튼  */}
          <div className={'w-full h-[8%] border-base flex-row-center justify-end px-11'}>
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
      <article className={'w-[43rem] h-48 mt-12'}>
        <h1 className={'h-16 text-3xl font-bold'}>계정 관리</h1>

        <div className={'w-full h-32 border-line border-bg rounded-xl p-6 shadow-sign-up'}>
          <span className={'text-xl font-bold'}>계정 삭제</span>
          <div className={'flex-row-center justify-between px-5 mt-4'}>
            <span className={'text-gray-dark text-xs'}>
              계정 삭제 시 프로필 및 참여한 제품의 모든 정보가 삭제 됩니다.
            </span>
            <button className={'w-32 h-9 bg-orange text-white font-bold text-sm rounded'}>
              계정 삭제
            </button>
          </div>
        </div>
      </article>

      <Modal isCentered onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>비밀번호 변경</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <span>123</span>
          </ModalBody>

          <ModalFooter>
            <Button>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
