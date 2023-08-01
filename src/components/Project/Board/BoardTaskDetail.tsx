export default function BoardTaskDetail() {
  return (
    <section
      className={
        'absolute flex-col-center w-[5rem] h-[5.5rem] top-[1rem] task-detail-border cursor-pointer text-[0.5rem] text-gray-dark'
      }
    >
      <div className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}>링크복사</div>
      <div className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}>수정</div>
      <div className={'flex-row-center w-full h-1/3 hover:bg-orange-light-sideBar'}>삭제</div>
    </section>
  );
}
