import React, { ChangeEvent, useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { Select } from '@chakra-ui/react';
import { typeBgColors } from '@/recoil/Product/ReleaseNote.tsx';
import { useRecoilValue } from 'recoil';
import { changeType } from '@/typings/product.ts';
import useInput from '@/hooks/useInput.ts';
import { AiFillCaretDown } from 'react-icons/ai';
import { formatDate } from '@/utils/formatDate.ts';
import PostEditor from '@/components/Common/PostEditor.tsx';

const typeList: changeType[] = ['New', 'Feature', 'Changed', 'Fixed', 'Deprecated'];

export default function NewChangeLog() {
  const { product } = useParams();
  const bgColor = useRecoilValue(typeBgColors);

  const [selectedType, setSelectedType] = useState(typeList[0]);
  const onChangeSelectedType = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as changeType);
  }, []);

  const [title, onChangeTitle, setTitle] = useInput('');
  const today: Date = new Date();

  return (
    <section className={'w-h-full py-20'}>
      <Row className={'h-full'}>
        <Col span={4} className={'px-14 pt-4'}>
          <Link
            to={`/workspace/${product}`}
            className={'flex items-center text-[1.4rem] text-gray-dark font-bold '}
          >
            <IoIosArrowBack className={'text-[2.2rem]'} /> 돌아가기
          </Link>
        </Col>
        <Col span={16} className={'border-[0.6px] border-line bg-borderc shadow-sign-up'}>
          <nav className={'h-[8%] px-6 pt-6 text-right'}>
            <button
              className={'bg-orange rounded font-bold text-sm text-white w-[4.7rem] h-8'}
              onClick={() => {}}
            >
              완료
            </button>
          </nav>
          <article className={'w-full h-[92%] px-24'}>
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
              className={'w-full mt-6 mb-4 mx-4 text-3xl font-bold bg-inherit'}
              maxLength={50}
            />

            <div className={'border-b border-gray-spring'} />

            <div className={'my-4 mx-10'}>
              <div className={'flex items-center text-gray-dark w-full mb-4'}>
                <span className={'w-[11%] font-bold'}>버전</span>
                <span>v.1.1.2</span>
              </div>
              <div className={'flex items-center text-gray-dark w-full mb-4'}>
                <span className={'w-[11%] font-bold'}>날짜</span>
                <span>{formatDate(today)}</span>
              </div>
              <div className={'flex items-center text-gray-dark w-full mb-4'}>
                <span className={'w-[11%] font-bold'}>작성자</span>
                <span className={'flex items-center'}>
                  <img
                    src="/images/test.jpeg"
                    alt="프로필 사진"
                    className={'w-10 h-10 rounded-[50%] mr-3'}
                  />
                  Crong(권오현)
                </span>
              </div>
            </div>

            <div className={'border-b border-gray-spring'} />

            <div>{/*<PostEditor />*/}</div>
          </article>
        </Col>
        <Col span={4} />
      </Row>
    </section>
  );
}
