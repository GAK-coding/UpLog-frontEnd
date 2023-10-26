import { useEffect, useState } from 'react';
import { TaskPaging } from '@/typings/task.ts';
import { InfiniteQueryObserverResult } from 'react-query';

interface ObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<TaskPaging | 'get task pages fail'>>;
}

export const useIntersectionObserver = ({
  threshold = 0,
  hasNextPage,
  fetchNextPage,
}: ObserverProps) => {
  // 관찰할 요소, 스크롤 최하단 div 요소에 setTarget을 ref로 넣어서 사용함
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      // target이 화면에 관찰되고, 다음페이지가 있다면 다음페이지를 호출함
      if (entry.isIntersecting && hasNextPage) {
        console.log('호출');
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (!target) return;

    // intersectionObserver 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // target 관찰
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
};
