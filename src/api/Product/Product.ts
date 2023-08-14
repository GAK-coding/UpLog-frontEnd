import {
  FailProduct,
  ProductBody,
  ProductsData,
  ProductEditBody,
  ProductEditData,
  Product,
  GetProductList,
} from '@/typings/product.ts';
import { AxiosResponse } from 'axios';
import { instance } from '@/api';

// 제품 생성
export const createProduct = async (data: ProductBody) => {
  try {
    const res: AxiosResponse<ProductsData | FailProduct> = await instance.post(
      '/products',

      data,
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return 'create product fail';
  }
};

// 제품 정보 수정
export const productEdit = async ({
  data,
  productId,
}: {
  data: ProductEditBody;
  productId: number;
}) => {
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
    const res: AxiosResponse<ProductsData | FailProduct> = await instance.get(
      `/products/${productId}`
    );

    return res.data;
  } catch (error) {
    return 'get product info fail';
  }
};

export const getMyProducts = async () => {
  try {
    const res: AxiosResponse<GetProductList[]> = await instance.get('/products');

    return res.data;
  } catch (err) {
    return 'fail get my products';
  }
};

export const changeProductsSequence = async (updateIndexList: number[]) => {
  try {
    await instance.patch('/products', { updateIndexList });
  } catch (err) {
    return 'fail change Products sequence';
  }
};
