import { FaUserCircle } from 'react-icons/fa';
import { AiFillStar, AiOutlinePoweroff } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { profileOpen } from '@/recoil/User/atom.tsx';
import { useRecoilState } from 'recoil';

export default function UserProfile() {
  // TODO: 실제 userprofile 값으로 변경하기
  const userInfo = {
    userprofile: '',
    userName: '오채영',
    userNickname: 'OCI',
    userId: 'oco6029@naver.com',
  };

  const navigate = useNavigate();

  // userProfile click
  const [isProfileClick, setIsProfileClick] = useRecoilState(profileOpen);

  return (
    <section
      className={'border-base w-60 h-[15rem] absolute top-[3rem] right-[0rem] shadow-sign-up'}
    >
      <div
        className={
          'flex-row-center justify-between border-solid border-b-[1px] border-line w-full h-[5.5rem]'
        }
      >
        {/*유저 정보*/}
        <div className={'flex-row-center w-[4rem] h-full'}>
          {!userInfo.userprofile ? (
            <FaUserCircle className={'text-[2.8rem] fill-gray-dark ml-2.5'} />
          ) : (
            <img src={userInfo.userprofile} alt="userprofile" className={'w-[2.8rem] h-[2.8rem]'} />
          )}
        </div>
        <div className={'flex-col-center w-[10rem] h-full'}>
          <span
            className={'flex self-start text-lg font-bold'}
          >{`${userInfo.userNickname} (${userInfo.userName})`}</span>
          <span className={'flex self-start text-gray-light text-base font-semibold'}>
            {userInfo.userId}
          </span>
        </div>
      </div>
      {/*스크랩 페이지 이동*/}
      <div className={'flex-col-center w-full h-[9.5rem] cursor-pointer'}>
        <div
          className={'flex-row-center justify-between w-full h-1/3 hover:bg-hover'}
          onClick={() => {
            setIsProfileClick((prevState) => !prevState);
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
        <div className={'flex-row-center justify-between w-full h-1/3 hover:bg-hover'}>
          <AiOutlinePoweroff className={'text-4xl ml-4 fill-gray-light'} />
          {/*TODO : 로그아웃 로직 추가하기*/}
          <span className={'w-full ml-3 text-[1.05rem] font-semibold'}>로그아웃</span>
        </div>
      </div>
    </section>
  );
}
