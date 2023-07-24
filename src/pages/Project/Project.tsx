import React from 'react';
import { useParams } from 'react-router-dom';

export default function Project() {
  const { projectName } = useParams();
  return <div>프로젝트 페이지 {projectName}</div>;
}
