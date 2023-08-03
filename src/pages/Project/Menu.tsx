import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronCompactUp } from 'react-icons/bs';

export default function Menu() {
  const { product, project } = useParams();
  const navigate = useNavigate();
  return (
    <section className={'flex-col-center justify-start w-noneSideBar h-full'}>
      <section className={'flex-row-center h-[5rem] w-full'}>
        <BsChevronCompactUp
          className={'text-[4rem] text-gray-light'}
          onClick={() => navigate(`/workspace/${product}/${project}`)}
        />
      </section>
      <section className={'flex-col w-[80%] min-w-[80rem] h-menu pt-6'}>
        <section className={'w-h-full border-base border-b-0 border-gray-border'}>
          <div className={'flex-row-center w-full h-[5rem] border-b border-gray-border'}>
            <section className={'w-1/5 h-full border-r border-gray-border'}></section>
            <section className={'w-1/5 h-full border-r border-gray-border'}></section>
            <section className={'w-1/5 h-full border-r border-gray-border'}></section>
            <section className={'w-1/5 h-full border-r border-gray-border'}></section>
            <section className={'w-1/5 h-full'}></section>
          </div>
        </section>
      </section>
    </section>
  );
}
