import React, { useCallback, useState } from 'react';
import ImageCrop from '@/components/Member/MyPage/ImageCrop.tsx';
import { UploadFile, UploadProps } from 'antd/lib';
import { useDisclosure } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { BsFillCameraFill } from 'react-icons/bs';
import { RcFile } from 'antd/es/upload';
import UserManageModal from '@/components/Member/MyPage/UserManageModal.tsx';
import { SaveUserInfo } from '@/typings/member.ts';
import useInput from '@/hooks/useInput.ts';
import { useMutation } from 'react-query';
import { changeName, changeNickname } from '@/api/Members/mypage.ts';
import { useMessage } from '@/hooks/useMessage.ts';

export default function MyPage() {
  // const userInfo: SaveUserInfo = JSON.parse(sessionStorage.getItem('userInfo')!);
  const [userInfo, setUserInfo] = useState<SaveUserInfo>(
    JSON.parse(sessionStorage.getItem('userInfo')!)
  );
  const [newName, onChangeNewName, setNewName] = useInput('');
  const [newNickname, onChangeNewNickname, setNewNickname] = useInput('');
  const { showMessage, contextHolder } = useMessage();

  const { mutate: nameChangeMutate } = useMutation(changeName, {
    onError: () => {
      showMessage('error', '이름 변경 실패!');
    },
  });
  const { mutate: nicknameChangeMutate } = useMutation(changeNickname);

  const onChangeProfile = useCallback(async () => {
    if (!newName && !newNickname) {
      showMessage('warning', '이름과 닉네임을 입력해주세요.');
      return;
    }

    if (newName && newNickname) {
      await nameChangeMutate({ id: userInfo.id, newName });
      setTimeout(() => {
        nicknameChangeMutate({ id: userInfo.id, newNickname });
      }, 1000);

      setUserInfo({ ...userInfo, nickname: newNickname, name: newName });
      sessionStorage.setItem(
        'userInfo',
        JSON.stringify({ ...userInfo, nickname: newNickname, name: newName })
      );
      setNewNickname('');
      setNewName('');

      showMessage('success', '이름, 닉네임 변경 완료!');
    } else if (newName) {
      nameChangeMutate({ id: userInfo.id, newName });

      setUserInfo({ ...userInfo, name: newName });
      sessionStorage.setItem('userInfo', JSON.stringify({ ...userInfo, name: newName }));
      setNewName('');

      showMessage('success', '이름 변경 완료!');
    } else {
      nicknameChangeMutate({ id: userInfo.id, newNickname });

      setUserInfo({ ...userInfo, nickname: newNickname });
      sessionStorage.setItem('userInfo', JSON.stringify({ ...userInfo, nickname: newNickname }));
      setNewNickname('');

      showMessage('success', '닉네임 변경 완료!');
    }
  }, [newName, newNickname]);

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
    if (newFileList.length > 0) await encodeFileToBase64(newFileList[0]!.originFileObj!);
  };

  return (
    <section className={'mypage flex flex-col items-center w-full h-[68rem]'}>
      {contextHolder}
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
                {userInfo.nickname}({userInfo.name}) 프로필 관리
              </span>
              <span className={'text-[1.1rem] text-gray-dark'}>{userInfo.email}</span>
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
        showMessage={showMessage}
      />
    </section>
  );
}
