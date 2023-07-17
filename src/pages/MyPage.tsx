import React, { useState } from 'react';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import message from 'antd/lib/message';
import { UploadFile, UploadProps } from 'antd/lib';
import { Upload } from 'antd';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
export default function MyPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? '로딩' : '플러스'}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <section className={'flex justify-center w-h-full'}>
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
              <button className={'text-gray-dark text-[0.93rem] font-bold underline'}>
                비밀번호 변경
              </button>
            </div>
          </div>
          {/* 프로필 정보 수정 */}
          <div className={'w-full h-[79%] flex-col-center border-base'}>
            <div>
              {' '}
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <label className={'w-[22rem] flex-col-center items-start mb-5'}>
              <span className={'text-gray-dark text-[0.93rem] font-bold mb-4'}>이름</span>
              <input
                className={
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
    </section>
  );
}
