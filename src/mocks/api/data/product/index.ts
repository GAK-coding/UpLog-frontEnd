import { GetProductList, powerTypeList } from '@/typings/product.ts';
import { faker } from '@faker-js/faker';
import { UserInfo } from '@/typings/member.ts';

const powerTypes = ['MASTER', 'LEADER', 'DEFAULT', 'CLIENT'];
const name = faker.person.firstName();
const nickname = faker.person.middleName();

export function createProduct(): GetProductList {
  return {
    productId: faker.number.int(),
    productImage: faker.number.int({ min: 0, max: 1 }) % 2 === 0 ? null : faker.image.url(),
    productName: faker.company.name().slice(0, 6),
    memberName: name,
    memberNickname: nickname,
    powerType: powerTypes[faker.number.int({ min: 0, max: 3 })] as powerTypeList,
    indexNum: 0,
    delStatus: false,
  };
}
