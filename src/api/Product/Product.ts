import { FailCreateProduct, ProductBody, ProductData } from '@/typings/product.ts';
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
    console.log(error.response.data);
  }
};
