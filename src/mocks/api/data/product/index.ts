import { GetProductList, powerTypeList } from '@/typings/product.ts';
import { faker } from '@faker-js/faker';

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

export function createProject(end?: boolean) {
  return {
    id: faker.number.int(),
    version: '',
    projectStatus: !end ? 'PROGRESS_IN' : 'PROGRESS_COMPLETE',
    endDate: end ? '' : null,
  };
}

const possibleIssueStatus = ['NEW', 'FEATURE', 'CHANGED', 'FIXED', 'DEPRECATED'];

export function createIssue() {
  return {
    id: faker.number.int(),
    content: faker.lorem.paragraph(), // Generates a random paragraph as a description
    title: faker.hacker.verb(), // Generates a random hacker verb as the issue change title
    image: faker.image.url(), // Generates a random image URL
    issueStatus: faker.helpers.arrayElement(possibleIssueStatus),
    createdTime: faker.date.past().toISOString(),
    modifiedTime: faker.date.recent().toISOString(),
  };
}
