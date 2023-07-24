import React from 'react';
import { useParams } from 'react-router-dom';

export default function Project() {
  const { project } = useParams();
  return <div>프로젝트 페이지 {project}</div>;
}
