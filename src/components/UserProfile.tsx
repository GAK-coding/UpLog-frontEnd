import {FaUserCircle} from "react-icons/fa";
import {AiFillStar, AiOutlinePoweroff} from "react-icons/ai";
import {BiPencil} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

export default function UserProfile () {
    // TODO: 실제 userprofile 값으로 변경하기
    const userInfo = {
        userprofile : '',
        userName : '오채영',
        userNickname : 'OCI',
        userId : 'oco6029@naver.com'
    }

    const navigate = useNavigate();

    return (
    <section className={'border-solid border-[1px] border-line bg-border w-56 h-[13.6rem] absolute top-[5.5rem] right-[3rem] shadow-sign-up'}>
        <div className={'flex-row-center justify-between border-solid border-b-[1px] border-line w-full h-[5.5rem]'}>
            <div className={'flex-row-center w-[4rem] h-full'}>
                {!userInfo.userprofile ? (
                    <FaUserCircle className={'text-[2.8rem] fill-gray-dark'} />
                ) : (
                    <img
                        src={userInfo.userprofile}
                        alt="userprofile"
                        className={'w-[2.8rem] h-[2.8rem]'}
                    />
                )}
            </div>
            <div className={'flex-col-center w-[10rem] h-full ml-1'}>
                <span className={'flex self-start text-lg'}>{`${userInfo.userNickname} (${userInfo.userName})`}</span>
                <span className={'flex self-start text-gray-light text-sm font-medium'}>{userInfo.userId}</span>
            </div>
        </div>
        <div className={'w-full h-[8.1rem] cursor-pointer'}>
            <div className={'flex-row-center justify-between w-full h-[2.7rem] hover:bg-orange-light'}>
                <AiFillStar className={'text-4xl ml-4 fill-yellow'} />
                <span className={'w-full ml-3 text-base font-medium'} onClick={() => navigate('/scrap')}>스크랩</span>
            </div>
            <div className={'flex-row-center justify-between w-full h-[2.7rem] hover:bg-orange-light'}>
                <BiPencil className={'text-4xl ml-4 fill-gray-light'}/>
                <span className={'w-full ml-3 text-base font-medium'}  onClick={() => navigate('/mypage')}>프로필 수정</span>
            </div>
            <div className={'flex-row-center justify-between w-full h-[2.6rem] hover:bg-orange-light'}>
                <AiOutlinePoweroff className={'text-4xl ml-4 fill-gray-light'}/>
                {/*TODO : 로그아웃 로직 추가하기*/}
                <span className={'w-full ml-3 text-base font-medium'}>로그아웃</span>
            </div>
        </div>
    </section>)
}