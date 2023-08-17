import { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useMessage } from '@/hooks/useMessage.ts';
import { useRecoilState } from 'recoil';
import { postTagList } from '@/recoil/Project/Post.ts';

export default function TagInput() {
  const { showMessage, contextHolder } = useMessage();
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useRecoilState(postTagList);

  // Enter 입력 시 tagItem 추가
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 짤림 방지
    if (e.nativeEvent.isComposing) return;
    // Enter 입력 시 tagItem 추가
    if (e.key === 'Enter') {
      // tagList가 10개 이상일 경우 추가 안됨
      if (tagList.length >= 10) {
        showMessage('error', '태그는 10개까지만 입력 가능합니다.');
        return;
      }
      submitTagItem();
    }
  };

  // tagItem 추가
  const submitTagItem = () => {
    // 새로 입력된 값 tagList에 추가
    const updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);

    // 입력할 tagItem 초기화
    setTagItem('');
    console.log(tagList);
  };

  // tagItem 삭제
  const deleteTagItem = (num: number) => {
    const temp: string[] = JSON.parse(JSON.stringify(tagList));
    temp.splice(num, 1);
    setTagList(temp);
  };

  return (
    <div className={'flex-row-center flex-wrap justify-start w-[80%] h-auto '}>
      {contextHolder}
      {tagList.map((tagItem, index) => {
        return (
          <div
            className={'flex justify-between bg-line rounded-md px-3 py-1 mx-2 mb-3'}
            key={index}
          >
            <span className={'flex text-black'}>{tagItem}</span>
            <TiDelete
              className={'flex ml-1.5 text-[1.5rem] text-gray-dark cursor-pointer'}
              onClick={() => deleteTagItem(index)}
            />
          </div>
        );
      })}

      <input
        className={'min-w-[10rem] ml-4 text-black bg-transparent'}
        type="text"
        tabIndex={10}
        placeholder={'태그 입력'}
        value={tagItem}
        onChange={(e) => setTagItem(e.target.value)}
        onKeyDown={activeEnter}
      />
    </div>
  );
}
