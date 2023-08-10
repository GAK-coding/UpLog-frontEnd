import {
  FailCreateProduct,
  ProductBody,
  ProductData,
  ProductEditBody,
  ProductEditData,
} from '@/typings/product.ts';
import { AxiosResponse } from 'axios';
import { instance } from '@/api';

export const products = async (data: ProductBody) => {
  try {
    const res: AxiosResponse<ProductData | FailCreateProduct> = await instance.post(
      `/members/${data.memberId}/products`,
      data
    );

    return res.data;
  } catch (error) {
    return 'create product fail';
  }
};

export const productEdit = async (data: ProductEditBody) => {
  try {
    const res: AxiosResponse<ProductEditData> = await instance.patch(
      `/products/${data.productId}`,
      data
    );

    return res.data;
  } catch (error) {
    return 'edit product fail';
  }
};
