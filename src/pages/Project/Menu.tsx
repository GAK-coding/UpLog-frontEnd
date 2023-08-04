import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronCompactUp } from 'react-icons/bs';
import MenuSlider from '@/components/Project/Menu/MenuSlider.tsx';
import { useRecoilState, useRecoilValue } from 'recoil';
import { menuListData } from '@/recoil/Project/atom.ts';
import { useState } from 'react';
import { Select } from 'antd';
import { SelectMenu } from '@/typings/project.ts';

export default function Menu() {
  const { product, project, menutitle } = useParams();
  const navigate = useNavigate();

  const dateData: SelectMenu[] = [
    { value: '날짜', label: '날짜' },
    {
      value: '최신순',
      label: '최신순',
    },
  ];

  const statusData: SelectMenu[] = [
    { value: 'done', label: '완료' },
    { value: 'before', label: '완료 전' },
    { value: 'all', label: '전체' },
  ];

  // post, task 구분
  const [isPost, setIsPost] = useState(true);

  // 날짜, 상태 데이터 필터링 값
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    //TODO : Task 상태, 날짜별로 필터링해서 보여주기
    console.log(value);
  };

  return (
    <section className={'flex-col-center justify-start w-noneSideBar h-full'}>
      <section className={'flex-row-center h-[5rem] w-full'}>
        {/*프로젝트 페이지로 이동하는 버튼*/}
        <BsChevronCompactUp
          className={'text-[4rem] text-gray-light cursor-pointer'}
          onClick={() => navigate(`/workspace/${product}/${project}`)}
        />
      </section>
      {/*메뉴 보드 Wrapper*/}
      <section className={'flex-col w-[80%] min-w-[80rem] h-menu pt-6'}>
        {/*post, task 메뉴보드*/}
        <section className={'flex-col-center w-h-full border-base border-b-0 border-gray-border'}>
          {/*메뉴 list*/}
          <div className={'flex-row-center w-full h-[5rem] border-b border-gray-border '}>
            <div className={'w-full min-w-[70rem] h-full items-center justify-center'}>
              <MenuSlider product={product!} project={project!} menuTitle={menutitle!} />
            </div>
          </div>
          <div className={'flex-col-center w-h-full overflow-y-auto'}>
            {/*post, task 선택*/}
            <section className={'flex-row-center w-full h-[4.5rem] pt-6'}>
              <button type={'button'} onClick={() => setIsPost(true)}>
                <span
                  className={`text-[1.4rem] ${
                    isPost ? 'text-black font-bold' : 'text-gray-border font-semibold'
                  }transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-1`}
                >
                  Post
                </span>
              </button>
              <div className={'mx-5 h-6 border-solid border-r border-[1px] border-gray-border'} />
              <button type={'button'} onClick={() => setIsPost(false)}>
                <span
                  className={`text-[1.4rem] ${
                    !isPost ? 'text-black font-bold' : 'text-gray-border font-semibold'
                  }transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-1`}
                >
                  Task
                </span>
              </button>
            </section>
            {/*상태별 개수 링 + 날짜, 상태 필터링*/}
            <section className={'flex-row-center justify-between w-full h-[4rem]'}>
              <div className={'flex justify-between w-[13rem] px-8'}>
                <div
                  className={
                    'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-before'
                  }
                >
                  1
                </div>
                <div
                  className={
                    'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-going'
                  }
                >
                  2
                </div>
                <div
                  className={
                    'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-done'
                  }
                >
                  3
                </div>
              </div>
              <div className={'flex-row-center justify-between w-[18rem] px-4'}>
                <Select
                  labelInValue
                  defaultValue={dateData[0]}
                  onChange={handleChange}
                  style={{ width: 90 }}
                  options={dateData}
                />
                <Select
                  labelInValue
                  defaultValue={statusData[2]}
                  onChange={handleChange}
                  style={{ width: 90 }}
                  options={statusData}
                />{' '}
              </div>
            </section>
            <section
              className={
                'flex-col-center justify-start items-start w-[70%] min-w-[60rem] h-content-board pt-6'
              }
            >
              <div
                className={
                  'flex-col-center justify-start items-start w-full min-h-[7rem] border-base rounded-[5px] '
                }
              ></div>
            </section>
          </div>
        </section>
      </section>
    </section>
  );
}
