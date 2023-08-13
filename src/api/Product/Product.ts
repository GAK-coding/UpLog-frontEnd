import {
  FailProduct,
  ProductBody,
  ProductData,
  ProductEditBody,
  ProductEditData,
} from '@/typings/product.ts';
import { AxiosResponse } from 'axios';
import { instance } from '@/api';

// 제품 생성
export const createProduct = async (data: ProductBody) => {
  try {
    const res: AxiosResponse<ProductData | FailProduct> = await instance.post(`/products`, data);

    return res.data;
  } catch (error) {
    console.log(error);
    return 'create product fail';
  }
};

// 제품 정보 수정
export const productEdit = async (data: ProductEditBody, productId: number) => {
  try {
    const res: AxiosResponse<ProductEditData> = await instance.patch(
      `/products/${productId}`,
      data
    );

    return res.data;
  } catch (error) {
    return 'edit product fail';
  }
};

// 제품 정보 조회
export const eachProduct = async (productId: number) => {
  try {
    const res: AxiosResponse<ProductData | FailProduct> = await instance.get(
      `/products/${productId}`
    );

    return res.data;
  } catch (error) {
    return 'get product info fail';
  }
};
