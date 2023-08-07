import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { Select, Textarea } from '@chakra-ui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import TaskEditInfo from '@/components/Project/Task/TaskEditInfo.tsx';
import { useState } from 'react';

export default function TaskDetail() {
  const { product, project, menutitle } = useParams();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <section className={'flex w-full h-auto py-20'}>
      {/*돌아가기 버튼*/}
      <article className={'pt-4 flex justify-center w-[10%] min-w-[6rem] lg:w-[16%]'}>
        <Link
          to={`/workspace/${product}/${project}/menu/${menutitle}`}
          className={'flex justify-center text-[1.3rem] text-gray-dark font-bold'}
        >
          <IoIosArrowBack className={'text-[2.3rem] block'} />
          <span className={'hidden xl:block'}>돌아가기</span>
        </Link>
      </article>
      <article
        className={
          'flex-col-center min-w-[50rem] w-[80%] lg:w-[68%] h-auto border-base border-[0.6px] ml-4 shadow-sign-up'
        }
      >
        <section
          className={'flex-row-center justify-between w-full h-[7rem] pt-[3.2rem] px-[7.2rem]'}
        >
          {/*task 제목, id*/}
          <div className={'flex items-center w-[70%] h-auto font-bold'}>
            <span className={'text-3xl mr-4'}>{`Task 제목`}</span>
            <span className={'text-[1.4rem] text-gray-light'}>{`task id`}</span>
          </div>
          {/*진행상태 select*/}
          <div className={'w-[30%] h-auto flex justify-end'}>
            <Select
              defaultValue={'hi'}
              // onChange={onChangeSelectedType}
              width={'10rem'}
              height={'2rem'}
              // backgroundColor={`var(--${selectedType})`}
              fontSize={'1.2rem'}
              border={'none'}
              fontWeight={700}
              color={'#292723'}
              marginLeft={'0.5rem'}
              icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
            >
              <option value={'hi'}>hi</option>
            </Select>
          </div>
        </section>
        <div className={'w-[80%] border-b border-gray-spring my-4'}></div>
        {/*부가 내용 detail*/}
        <TaskEditInfo />
        <div className={'w-[80%] border-b border-gray-spring my-4'}></div>
        {/*세부 내용 */}
        <section className={'w-[70%] h-auto text-[2rem] pt-4 pb-8'}>
          <Textarea
            value={'emails'}
            // onChange={onChangeEmails}
            border={'1px solid var(--border-line)'}
            height={'100%'}
            focusBorderColor={'none'}
            placeholder="이메일은 쉼표(,)로 구분해 주세요."
            isReadOnly={true}
          />
        </section>

        {/*수정 삭제 버튼*/}
        <section className={'flex-row-center justify-end w-full h-[4.5rem] mb-4'}>
          <nav
            className={`flex-row-center ${
              isEdit ? 'justify-end' : 'justify-between'
            } w-[13rem] h-auto py-4 px-4 mr-6 font-bold text-white`}
          >
            {!isEdit && <button className={'w-[5rem] rounded h-9 bg-orange'}>수정</button>}
            <button className={'w-[5rem] rounded h-9 bg-orange'}>{isEdit ? '완료' : '삭제'}</button>
          </nav>
        </section>
      </article>
    </section>
  );
}
