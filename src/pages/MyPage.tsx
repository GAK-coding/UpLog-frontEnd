import React from 'react';

export default function MyPage() {
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
            <div className={'h-full flex-col-center border-base justify-end '}>
              <button>비밀번호 변경</button>
            </div>
          </div>
          {/* 프로필 정보 수정 */}
          <div className={'w-full h-[79%] border-base'}>
            <div>프로필 사진</div>
            <label>
              <span>이름</span>
              <input type="text" placeholder={'이름'} />
            </label>
            <label>
              <span>닉네임</span>
              <input type="text" placeholder={'닉네임'} />
            </label>
          </div>
          {/*  확인 취소 버튼  */}
          <div className={'w-full h-[8%] border-base'}>
            <button>
              <span>취소</span>
            </button>
            <button>
              <span>저장</span>
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
