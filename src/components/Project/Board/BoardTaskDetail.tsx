export default function BoardTaskDetail() {
  return (
    <section
      className={
        'absolute flex-col-center w-[4.5rem] h-[5rem] top-[1rem] task-detail-border cursor-pointer'
      }
    >
      <div
        className={
          'flex justify-center w-full h-1/3 text-[0.5rem] text-gray-dark hover:bg-orange-light-sideBar'
        }
      >
        링크복사
      </div>
      <div
        className={
          'flex justify-center w-full h-1/3 text-[0.5rem] text-gray-dark hover:bg-orange-light-sideBar'
        }
      >
        수정
      </div>
      <div
        className={
          'flex justify-center w-full h-1/3 text-[0.5rem] text-gray-dark hover:bg-orange-light-sideBar'
        }
      >
        삭제
      </div>
    </section>
  );
}
