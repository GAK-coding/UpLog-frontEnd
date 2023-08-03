import { useParams } from 'react-router-dom';

export default function Menu() {
  const { product, project } = useParams();
  return (
    <div>
      {product} + {project} + menu
    </div>
  );
}
