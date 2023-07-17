import {FaUserCircle} from "react-icons/fa";

export default function UserProfile () {
    // TODO: 실제 userprofile 값으로 변경하기

    const userInfo = {
        userprofile : '',
        userName : '오채영',
        userNickname : 'OCI',
        userId : 'oco6029@naver.com'
    }

    return (
    <section className={'border-solid border-[1px] border-line bg-border w-52 h-[13.6rem] absolute top-[5.5rem] right-[3rem] shadow-sign-up'}>
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
            <div className={'flex-col-center w-[9rem] h-full ml-1'}>
                <div className={'flex self-start text-lg'}>{`${userInfo.userNickname} (${userInfo.userName})`}</div>
                <div className={'flex self-start text-gray-light text-sm font-medium'}>{userInfo.userId}</div>
            </div>
        </div>
        <div className={'w-full h-[8.1rem] '}></div>
    </section>)
}