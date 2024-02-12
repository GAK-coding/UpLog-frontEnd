import { FaUserCircle } from 'react-icons/fa';
import { AiFillStar, AiOutlinePoweroff } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { loginStatus, profileOpen, user } from '@/recoil/User/atom.ts';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { logout } from '@/api/Members/Login-Signup.ts';
import { useMutation } from 'react-query';
import { message } from '../../../recoil/Common/atom';

export default function UserProfile() {
  const [userInfo, setUserInfo] = useRecoilState(user);
  const [messageInfo, setMessageInfo] = useRecoilState(message);

  const navigate = useNavigate();

  // userProfile click
  const [isProfileClick, setIsProfileClick] = useRecoilState(profileOpen);
  const setIsLogin = useSetRecoilState(loginStatus);

  const { mutate } = useMutation(logout, {
    onSuccess: () => {
      sessionStorage.removeItem('userInfo');
      sessionStorage.removeItem('nowProduct');
      sessionStorage.removeItem('nowProject');
      sessionStorage.removeItem('nowTeamId');
      sessionStorage.removeItem('nowGroupId');
      setIsLogin(false);
      setIsProfileClick(false);

      setMessageInfo({ type: 'success', content: '로그아웃 되었습니다.' });
    },
    onError: () => {
      setMessageInfo({ type: 'error', content: '잠시후에 다시 시도해주세요.' });
    },
  });

  const onClickLogout = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <section
      className={'border-base w-[17rem] h-[17rem] absolute top-[3rem] right-[0rem] shadow-sign-up'}
    >
      <div
        className={
          'flex-row-center justify-between border-solid border-b-[1px] border-line w-full h-[5.5rem] px-3'
        }
      >
        {/*유저 정보*/}
        <div className={'flex-row-center w-[4rem] h-full'}>
          {/*TODO: 백엔드에서 로그인 정보 프로필 사진 추가해주면 됨*/}
          {!userInfo?.image ? (
            <FaUserCircle className={'text-[2.6rem] fill-gray-dark cursor-pointer'} />
          ) : (
            <img
              src={userInfo?.image}
              alt="userprofile"
              className={'w-[2.6rem] h-[2.6rem] cursor-pointer ml-3 rounded-[50%]'}
            />
          )}
        </div>
        <div className={'flex-col-center w-[13rem] h-full pl-2'}>
          <span
            className={'flex self-start text-lg font-bold'}
          >{`${userInfo.nickname} (${userInfo.name})`}</span>
          <span className={'flex self-start text-gray-light text-base font-semibold'}>
            {userInfo.email}
          </span>
        </div>
      </div>
      {/*스크랩 페이지 이동*/}
      <div className={'flex-col-center w-full h-[11.5rem] cursor-pointer'}>
        <div
          className={'flex-row-center justify-between w-full h-1/3 hover:bg-hover'}
          onClick={() => {
            setIsProfileClick(!isProfileClick);
            navigate('/scrap');
          }}
        >
          <AiFillStar className={'text-4xl ml-4 fill-yellow'} />
          <span className={'w-full ml-3 text-[1.05rem] font-semibold cursor-pointer'}>스크랩</span>
        </div>
        {/*마이페이지 수정 이동*/}
        <div
          className={'flex-row-center justify-between w-full h-1/3 hover:bg-hover'}
          onClick={() => {
            setIsProfileClick(!isProfileClick);
            navigate('/mypage');
          }}
        >
          <BiPencil className={'text-4xl ml-4 fill-gray-light'} />
          <span className={'w-full ml-3 text-[1.05rem] font-semibold'}>프로필 수정</span>
        </div>
        {/*로그아웃*/}
        <div
          className={'flex-row-center justify-between w-full h-1/3 hover:bg-hover'}
          onClick={onClickLogout}
        >
          <AiOutlinePoweroff className={'text-4xl ml-4 fill-gray-light'} />
          {/*TODO : 로그아웃 로직 추가하기*/}
          <span className={'w-full ml-3 text-[1.05rem] font-semibold'}>로그아웃</span>
        </div>
      </div>
    </section>
  );
}
