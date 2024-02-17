import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImageCrop from '@/components/Member/MyPage/ImageCrop.tsx';
import { UploadFile, UploadProps } from 'antd/lib';
import { useDisclosure } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { BsFillCameraFill } from 'react-icons/bs';
import { RcFile } from 'antd/es/upload';
import UserManageModal from '@/components/Member/MyPage/UserManageModal.tsx';
import useInput from '@/hooks/useInput.ts';
import { useMutation } from 'react-query';
import { imageUpload, updateMyInfo } from '@/api/Members/mypage.ts';
import { useRecoilState } from 'recoil';
import { user } from '@/recoil/User/atom.ts';
import { message } from '@/recoil/Common/atom.ts';
import { UserInfo } from '../../typings/member';
import { decrypt, encrypt } from '../../utils/crypto';

export default function MyPage() {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [newName, onChangeNewName, setNewName] = useInput('');
  const [newNickname, onChangeNewNickname, setNewNickname] = useInput('');
  const [messageInfo, setMessageInfo] = useRecoilState(message);

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
    if (newFileList.length > 0) await encodeFileToBase64(newFileList[0]!.originFileObj!);
  };

  const nowImage = useRef<string>();
  const { mutate } = useMutation(updateMyInfo, {
    onSuccess: (data) => {
      if (userInfo) {
        nowImage.current = data.image ?? '';

        const newUserInfo: UserInfo = {
          ...JSON.parse(JSON.stringify(userInfo)),
          nickname: !newNickname ? userInfo.nickname : newNickname,
          name: !newName ? userInfo.name : newName,
          image: data.image,
        };

        setUserInfo({ ...newUserInfo });

        sessionStorage.setItem(
          'userInfo',
          encrypt(
            JSON.stringify({
              ...newUserInfo,
            })
          )
        );

        setNewNickname('');
        setNewName('');
        setMessageInfo({ type: 'success', content: '프로필 변경 완료!' });
      } else {
        setMessageInfo({ type: 'error', content: '잠시 후에 다시 시도해주세요.' });
      }
    },
    onError: () => {
      setMessageInfo({ type: 'error', content: '잠시 후에 다시 시도해주세요.' });
    },
  });

  const onChangeProfile = useCallback(async () => {
    if (!userInfo) return;

    // 바뀐 사진이 있거나 || 설정해 둔 이미지가 있는데 제거하는 경우, isImageChange는 true
    const isImageChange =
      (fileList.length > 0 && fileList?.[0]?.url !== userInfo.image) ||
      (userInfo.image && fileList.length === 0);

    if (!newName && !newNickname && !isImageChange) {
      setMessageInfo({ type: 'warning', content: '프로필 수정을 해주세요.' });
      return;
    }

    const formData = new FormData();
    let imageUrl: string | null = null;
    if (fileList[0]) {
      formData.append('file', fileList[0]!.originFileObj!);
      imageUrl = await imageUpload(formData);
    }

    mutate({
      newNickname: !newNickname ? null : newNickname,
      newName: !newName ? null : newName,
      image: (userInfo.image && fileList.length) === 0 ? 'delete' : imageUrl,
    });
  }, [newName, newNickname, fileList, userInfo]);

  // 비밀번호 변경 모달
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClickPwChange, setIsClickPwChange] = useState(false);

  const onChangeIsClickPw = useCallback((chk: boolean) => {
    setIsClickPwChange(chk);
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.image) {
      const imageFile: UploadFile = {
        uid: '-1',
        name: 'image.png', // You can set a desired name here
        status: 'done',
        url: userInfo.image, // Set the URL of the image
      };
      setFileList([imageFile]);
    }
  }, [userInfo]);

  useEffect(() => {
    const getUserInfo = decrypt(sessionStorage.getItem('userInfo'));
    const userInfo: UserInfo = getUserInfo ? JSON.parse(getUserInfo) : {};

    setUserInfo(userInfo);
  }, []);

  return (
    <section className={'mypage flex flex-col items-center w-full h-[68rem]'}>
      <article className={'w-[46rem] h-[44rem] mt-12'}>
        <h1 className={'h-[10%] text-3xl font-bold'}>프로필 수정</h1>
        <div
          className={
            'w-full h-[90%] border-base border-line border-bg rounded-xl p-6 shadow-sign-up'
          }
        >
          {/* 상단 */}
          <div className={'flex-row-center justify-between w-full h-[13%]'}>
            <div className={'flex-col-center items-start'}>
              <span className={'text-[1.4rem] font-bold'}>
                {userInfo?.nickname}({userInfo?.name}) 프로필 관리
              </span>
              <span className={'text-[1.1rem] text-gray-dark'}>{userInfo?.email}</span>
            </div>
            <div className={'h-full flex-col-center justify-end'}>
              <button
                className={'text-gray-dark text-[1rem] font-bold underline'}
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
          <div className={'w-full h-[79%] flex-col-center justify-end '}>
            <div className={'h-[40%] flex-col-center justify-end mb-[1rem]'}>
              <ImageCrop
                fileList={fileList}
                onImageChange={onImageChange}
                cropShape={'round'}
                listType={'picture-circle'}
              >
                {fileList.length < 1 && (
                  <div className={'relative'}>
                    <FaUserCircle className={'w-[10rem] h-[10rem] fill-gray-dark mt-[-1rem]'} />
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

            <label className={'w-[25rem] flex-col-center justify-start items-start h-[25%]'}>
              <span className={'text-gray-dark text-[1rem] font-bold mb-4'}>이름</span>
              <input
                className={
                  'border-base border-gray-border w-full h-11 rounded-[0.625rem] text-[0.93rem] font-semibold p-2'
                }
                type="text"
                data-cy={'newNameInput'}
                value={newName}
                onChange={onChangeNewName}
                maxLength={10}
                placeholder={'이름'}
              />
            </label>

            <label className={'w-[25rem] flex-col-center justify-start items-start h-[25%]'}>
              <span className={'text-gray-dark text-[1rem] font-bold mb-4'}>닉네임</span>
              <input
                className={
                  'border-base border-gray-border w-full h-11 rounded-[0.625rem] text-[0.93rem] font-semibold p-2'
                }
                type="text"
                data-cy={'newNicknameInput'}
                value={newNickname}
                onChange={onChangeNewNickname}
                maxLength={10}
                placeholder={'닉네임'}
              />
            </label>
          </div>
          {/*  확인 취소 버튼  */}
          <div className={'w-full h-[8%] flex-row-center justify-end px-9'}>
            <button
              className={
                'w-[4.5rem] h-10 rounded-[0.3rem] bg-orange text-white text-xs font-bold ml-4'
              }
              data-cy={'saveButton'}
              onClick={onChangeProfile}
            >
              저장
            </button>
          </div>
        </div>
      </article>
      <article className={'w-[46rem] h-48 mt-16'}>
        <h1 className={'h-16 text-3xl font-bold'}>계정 관리</h1>

        <div className={'w-full h-40 border-base rounded-xl p-6 shadow-sign-up'}>
          <span className={'text-[1.4rem] font-bold'}>계정 삭제</span>
          <div className={'flex-row-center justify-between px-9 mt-6'}>
            <span className={'flex-row-center text-gray-dark font-semibold text-[1rem]'}>
              계정 삭제 시 프로필 및 참여한 제품의 모든 정보가 삭제됩니다.
            </span>
            <button
              onClick={() => {
                onOpen();
                onChangeIsClickPw(false);
              }}
              className={'w-32 h-10 bg-orange text-white font-semibold text-[0.93rem] rounded'}
            >
              계정 삭제
            </button>
          </div>
        </div>
      </article>

      <UserManageModal
        isOpen={isOpen}
        onClose={onClose}
        isClickPwChange={isClickPwChange}
        setMessageInfo={setMessageInfo}
      />
    </section>
  );
}
