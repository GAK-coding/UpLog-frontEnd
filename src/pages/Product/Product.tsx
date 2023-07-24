import React from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { product } = useParams();

  return <div>제품 페이지 {product}</div>;
}
