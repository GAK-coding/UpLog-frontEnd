import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { Select } from '@chakra-ui/react';
import { ChangeLogBody, changeType } from '@/typings/product.ts';
import useInput from '@/hooks/useInput.ts';
import { AiFillCaretDown } from 'react-icons/ai';
import { formatDate } from '@/utils/formatDate.ts';
import PostEditor from '@/components/Common/PostEditor.tsx';
import { UserInfo } from '@/typings/member.ts';
import { Project } from '@/typings/project.ts';
import { editorChangeLog, message } from '@/recoil/Common/atom.ts';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { createNewChangeLog } from '@/api/Project/Version.ts';
import { user } from '@/recoil/User/atom.ts';

const typeList: changeType[] = ['NEW', 'FEATURE', 'CHANGED', 'FIXED', 'DEPRECATED'];

export default function NewChangeLog() {
  const { product } = useParams();
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  const [userInfo, setUserInfo] = useRecoilState(user);
  const nowProject: Project = JSON.parse(sessionStorage.getItem('nowProject')!);
  const [editChangeLog, setEditChangeLog] = useRecoilState(editorChangeLog);

  const [selectedType, setSelectedType] = useState(typeList[0]);
  const onChangeSelectedType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as changeType);
    // console.log(e.target.value);
  };

  const [title, onChangeTitle, setTitle] = useInput('');
  const today: Date = new Date();

  const [newChangeLog, setNewChangeLog] = useState<ChangeLogBody>({
    title: '',
    content: '',
    issueStatus: 'NEW',
  });

  const [check, setCheck] = useState(false);

  const { mutate: createChangeLogMutate } = useMutation(
    (newChangeLog: ChangeLogBody) => createNewChangeLog(newChangeLog, nowProject.id),
    {
      onSuccess: (data) => {
        if (typeof data !== 'string' && 'projectId' in data) {
          setMessageInfo({ type: 'success', content: '변경사항이 성공적으로 등록되었습니다.' });
          setTimeout(() => {
            history.back();
          }, 2000);
        } else if (typeof data !== 'string' && 'message' in data) {
          setMessageInfo({ type: 'warning', content: data.message });
        } else {
          setMessageInfo({ type: 'error', content: '변경사항 등록에 실패하였습니다.' });
        }
      },
    }
  );

  const onClickCreate = useCallback(() => {
    if (title === '') {
      setMessageInfo({ type: 'warning', content: '변경사항 제목을 입력해주세요.' });
      return;
    }
    if (editChangeLog === '') {
      setMessageInfo({ type: 'warning', content: '변경사항 내용을 입력해주세요.' });
      return;
    }
    setNewChangeLog({
      ...newChangeLog,
      title: title,
      content: editChangeLog,
      issueStatus: selectedType,
    });

    setCheck(true);
  }, [title, editChangeLog]);

  useEffect(() => {
    if (check) {
      createChangeLogMutate(newChangeLog);

      setTimeout(() => {
        setNewChangeLog({
          title: '',
          content: '',
          issueStatus: 'NEW',
        });
        setTitle('');
        setEditChangeLog('');
      }, 3000);
      setCheck(false);
    }
  }, [check]);

  return (
    <section className={'w-full h-auto flex py-20'}>
      <article className={'pt-4 flex justify-center w-[10%] min-w-[6rem] lg:w-[16%]'}>
        <Link
          to={`/workspace/${product}`}
          className={'flex justify-center text-[1.3rem] text-gray-dark font-bold'}
        >
          <IoIosArrowBack className={'text-[2.3rem] block'} />
          <span className={'hidden xl:block'}>돌아가기</span>
        </Link>
      </article>
      <article
        className={
          'border-[0.6px] border-base shadow-sign-up h-auto min-w-[50rem] w-[80%] lg:w-[68%]'
        }
      >
        <nav className={'px-6 pt-6 mb-4 text-right'}>
          <button
            className={'bg-orange rounded font-bold text-white w-[5rem] h-9'}
            onClick={onClickCreate}
          >
            완료
          </button>
        </nav>
        <div className={'w-full px-24'}>
          <div className={'h-[17rem]'}>
            <Select
              defaultValue={typeList[0]}
              onChange={onChangeSelectedType}
              width={'10rem'}
              height={'2rem'}
              backgroundColor={`var(--${selectedType})`}
              fontSize={'1.2rem'}
              border={'none'}
              fontWeight={700}
              color={'#292723'}
              marginLeft={'0.5rem'}
              icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
            >
              {typeList.map((type, idx) => {
                return (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                );
              })}
            </Select>
            <input
              value={title}
              onChange={onChangeTitle}
              type="text"
              placeholder={'변경사항 제목'}
              className={'w-full mt-6 mb-4 px-4 text-3xl font-bold bg-inherit'}
              maxLength={50}
            />

            <div className={'border-b border-gray-spring'} />

            <div className={'my-4 mx-10'}>
              <div className={'flex items-center text-gray-dark w-full mb-4'}>
                <span className={'w-[11%] font-bold'}>버전</span>
                <span>{nowProject?.version}</span>
              </div>
              <div className={'flex items-center text-gray-dark w-full mb-4'}>
                <span className={'w-[11%] font-bold'}>날짜</span>
                <span>{formatDate(today)}</span>
              </div>
              <div className={'flex items-center text-gray-dark w-full mb-4'}>
                <span className={'w-[11%] font-bold'}>작성자</span>
                <span className={'flex items-center'}>
                  <img
                    src={userInfo?.image ? userInfo?.image : '/images/test_userprofile.png'}
                    alt="프로필 사진"
                    className={'w-10 h-10 rounded-[50%] mr-3'}
                  />
                  {userInfo?.nickname}({userInfo?.name})
                </span>
              </div>
            </div>

            <div className={'border-b border-gray-spring'} />
          </div>

          {/*<div className={'mt-4 min-h-change-post mb-20'}>*/}
          <div className={'mt-4 mb-20'}>
            <PostEditor isPost={false} />
          </div>
        </div>
      </article>
      <article className={'w-[10%] min-w-[6rem] h-[10rem] lg:w-[16%]'} />
    </section>
  );
}
