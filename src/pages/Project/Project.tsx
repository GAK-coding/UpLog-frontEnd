import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsChevronCompactDown } from 'react-icons/bs';
import { ProjectGroupFilter } from '@/typings/project.ts';
import { Progress, Select } from 'antd';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';

export default function Project() {
  const { project } = useParams();

  const userprofile = '';

  const pGroup: ProjectGroupFilter[] = [
    { value: 'all', label: '그룹' },
    { value: 'develop', label: '개발팀' },
    { value: 'marketing', label: '마케팅' },
    { value: 'promotion', label: '홍보' },
  ];

  const cGroup: ProjectGroupFilter[] = [
    { value: 'all', label: '하위그룹' },
    { value: 'develop', label: '개발팀' },
    { value: 'marketing', label: '마케팅' },
    { value: 'promotion', label: '홍보' },
  ];

  const statusCount = [1, 2, 3];

  const progress = 77;
  const [isKanban, setIsKanban] = useState(true);

  const [isClickTaskDetail, setIsClickTaskDetail] = useState(false);

  const onClickKanban = useCallback((check: boolean) => {
    setIsKanban(check);
  }, []);

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };
  return (
    <section className={'flex-col justify-start w-noneSideBar h-full relative overflow-x-hidden'}>
      <div className={'w-noneSideBar h-[13.8rem] flex-col'}>
        <section className={'flex-row-center justify-start w-full h-[3.5rem] px-12 pt-4'}>
          {/*그룹 필터링*/}
          <div className={'flex-row-center w-[18rem] justify-between'}>
            {/*그룹 -> 하위로 바꾸기*/}
            <Select
              labelInValue
              defaultValue={{ value: pGroup[0].value, label: pGroup[0].label }}
              style={{ width: 100 }}
              onChange={handleChange}
              options={pGroup}
            ></Select>

            <Select
              labelInValue
              defaultValue={{ value: cGroup[0].value, label: cGroup[0].label }}
              style={{ width: 100 }}
              onChange={handleChange}
              options={cGroup}
            ></Select>
          </div>
        </section>
        {/*칸반, 스크럼 선택*/}
        <section className={'w-full h-[6rem]'}>
          <div className={'flex-row-center justify-center w-full h-full px-2 '}>
            <button type={'button'} onClick={() => onClickKanban(true)}>
              <span
                className={`text-3xl  ${
                  isKanban ? 'text-black font-bold' : 'text-gray-board font-semibold'
                }`}
              >
                칸반
              </span>
            </button>

            <div className={'mx-4 h-8 border-solid border-r border-[1px] border-gray-board'} />

            <button type={'button'} onClick={() => onClickKanban(false)}>
              <span
                className={`text-3xl  ${
                  !isKanban ? 'text-black font-bold' : 'text-gray-board font-semibold'
                }`}
              >
                스크럼
              </span>
            </button>
          </div>
        </section>
        {/*진행률*/}
        <section className={'flex-row-center justify-end w-full h-[4.3rem] pr-[4.5rem]'}>
          <span
            className={'flex-row-center self-center text-[0.93rem] font-bold mr-4 text-gray-dark'}
          >
            진행률
          </span>
          <div className={'mt-2 self-center w-[15.6rem]'}>
            <Progress className={'progress'} percent={progress} />
          </div>
        </section>
      </div>

      {/*보드*/}
      <div className={'w-noneSideBar h-board flex-col'}>
        <section className={'flex-col-center w-noneSideBar h-[90%]'}>
          <div className={'flex-row-center justify-between w-[80rem] h-full pt-8 '}>
            {/*진행 전 보드*/}
            <section className={'w-[24rem] h-full task-border'}>
              {/*제목, 개수*/}
              <div
                className={
                  'flex-row-center justify-between h-[3.5rem] px-[2.3rem] text-gray-dark text-[0.93rem]'
                }
              >
                <span>진행 전</span>
                <span>{statusCount[0]}개</span>
              </div>
              {/*태스크들*/}
              <div
                className={'flex-col max-h-[90%] px-[1.8rem] overflow-y-auto border border-red-400'}
              >
                {/*태스크 한개*/}
                <section
                  className={
                    'flex-col w-[19.5rem] h-[8rem] bg-white rounded-[10px] mt-[0.6rem] px-[1.12rem] py-[0.5rem]'
                  }
                >
                  {/*케밥 버튼*/}
                  <div className={'flex justify-end h-[0.7rem] relative'}>
                    <GoKebabHorizontal
                      className={'fill-gray-dark cursor-pointer'}
                      onClick={() => setIsClickTaskDetail(!isClickTaskDetail)}
                    />
                    {
                      /*케밥 버튼 클릭시*/
                      isClickTaskDetail && (
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
                      )
                    }
                  </div>
                  {/*task제목*/}
                  <div className={'flex justify-start h-[2.5rem]'}>
                    <span className={'text-[1rem]'}>task 제목</span>
                  </div>
                  {/*그룹정보*/}
                  <div className={'flex justify-start items-center mb-2'}>
                    <span className={'text-gray-dark text-[0.65rem]'}>Group1</span>
                  </div>
                  {/*menu, 할당자 정보 */}
                  <div className={'flex-row-center justify-between text-[0.65rem] text-gray-dark'}>
                    <span
                      className={
                        'flex items-center px-2 h-[1.5rem] rounded-[0.31rem] bg-orange-light-sideBar '
                      }
                    >
                      요구사항
                    </span>
                    <div className={'flex-row-center justify-between items-center'}>
                      <span className={'px-2 text-[0.65rem] text-gray-dark'}>OCI(오채영)</span>
                      {!userprofile ? (
                        <FaUserCircle className={'flex-row text-[1.7rem] fill-gray-dark'} />
                      ) : (
                        <img
                          src={userprofile}
                          alt="userprofile"
                          className={'flex w-[1.7rem] h-[1.7rem]'}
                        />
                      )}
                    </div>
                  </div>
                  {/*</div>*/}
                </section>
                <section
                  className={'w-[19.5rem] h-[8rem] bg-white rounded-[10px] mt-[0.6rem]'}
                ></section>
              </div>
            </section>
            <section className={'w-[24rem] h-full task-border'}>보드 2</section>
            <section className={'w-[24rem] h-full task-border'}>보드 3</section>
          </div>
        </section>
        {/*하단페이지로 이동*/}
        <section className={'flex-row-center w-full h-[10%]'}>
          <BsChevronCompactDown className={'text-[4rem] text-gray-light'} />
        </section>
      </div>
    </section>
  );
}
