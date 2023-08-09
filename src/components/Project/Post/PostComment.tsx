import { useRecoilState } from 'recoil';
import { eachComment } from '@/recoil/Project/Post.ts';

interface Props {
  postId: number;
}
export default function PostComment({ postId }: Props) {
  const [commentList, setCommentList] = useRecoilState(eachComment);
  return (
    <div className={'flex-col-center justify-start w-[60%] h-auto bg-amber-400'}>
      {/*댓글 */}
      <div className={'flex-row-center justify-start w-full h-[4.6rem] bg-amber-400'}></div>
      {/*대댓글*/}
    </div>
  );
}
