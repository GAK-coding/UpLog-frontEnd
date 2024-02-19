import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { createIssue, createProduct, createProject } from '@/mocks/api/data/product';
import { checkAuthorization } from '@/mocks/api/common.ts';

export const product = [
  http.get('/products', async ({ cookies, request }) => {
    // 함수 호출
    const authCheckResult = checkAuthorization({ cookies, request });

    // 만약 인증에 실패한 경우
    if (authCheckResult !== null) {
      return authCheckResult;
    }

    const products = faker.helpers.multiple(createProduct, {
      count: faker.number.int({ min: 0, max: 5 }),
    });

    for (let i = 0; i < products.length; i++) {
      products[i].indexNum = i + 1;
    }

    return HttpResponse.json(products);
  }),
  http.get('/products/:productId/projects', () => {
    const temp = faker.helpers.multiple(() => createProject(true), {
      count: faker.number.int({ min: 0, max: 5 }),
    });

    const num = faker.number.int({ min: 0, max: 1 });
    if (num % 2 === 0) {
      temp.push(createProject());
    }

    function getDateByOffset(offset: number) {
      const today = new Date();
      today.setDate(today.getDate() + offset);

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(today.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }

    const projects = temp.map((project, index) => {
      return {
        ...project,
        version: `V1.0.${index}`,
        endDate: project.endDate === '' ? getDateByOffset(-(temp.length - index)) : null,
      };
    });

    return HttpResponse.json(projects);
  }),
  http.get('/changedIssues/:projectId/issue', () => {
    const changedIssues = faker.helpers.multiple(createIssue, {
      count: faker.number.int({ min: 0, max: 10 }),
    });

    return HttpResponse.json(changedIssues);
  }),
];
