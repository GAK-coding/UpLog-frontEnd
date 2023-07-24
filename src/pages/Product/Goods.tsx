import React from 'react';
import { useParams } from 'react-router-dom';

export default function Goods() {
  const { productName } = useParams();

  return <div>제품 페이지 {productName}</div>;
}
