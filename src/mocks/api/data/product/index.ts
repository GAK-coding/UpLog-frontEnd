import { GetProductList, powerTypeList } from '@/typings/product.ts';
import { faker } from '@faker-js/faker';
import { SaveUserInfo } from '@/typings/member.ts';

const powerTypes = ['MASTER', 'LEADER', 'DEFAULT', 'CLIENT'];

export function createProduct(): GetProductList {
  return {
    productId: faker.number.int(),
    productImage: faker.number.int({ min: 0, max: 1 }) % 2 === 0 ? null : faker.image.url(),
    productName: faker.company.name().slice(0, 6),
    memberName: '',
    memberNickname: '',
    powerType: powerTypes[faker.number.int({ min: 0, max: 3 })] as powerTypeList,
    indexNum: 0,
    delStatus: false,
  };
}
