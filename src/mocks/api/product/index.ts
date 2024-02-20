import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import {
  createIssue,
  createProduct,
  createProductMembers,
  createProject,
} from '@/mocks/api/data/product';
import { checkAuthorization } from '@/mocks/api/common.ts';

// 현재 날짜에서 매개변수만큼 더하거나 빼줌
function getDateByOffset(offset: number) {
  const today = new Date();
  today.setDate(today.getDate() + offset);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

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
    const projectsTemp = faker.helpers.multiple(() => createProject(true), {
      count: faker.number.int({ min: 0, max: 5 }),
    });

    const num = faker.number.int({ min: 0, max: 1 });
    if (num % 2 === 0) {
      projectsTemp.push(createProject());
    }

    const projects = projectsTemp.map((project, index) => {
      return {
        ...project,
        version: project.endDate === null ? `V1.0.${index}(임시)` : `V1.0.${index}`,
        endDate: project.endDate === '' ? getDateByOffset(-(projectsTemp.length - index)) : null,
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
  http.patch('/projects/:projectId', async () => {
    return HttpResponse.json(createProject(true));
  }),
  http.post('/products/:productId/projects', async ({ request }) => {
    const { version } = (await request.json()) as { version: string };

    const newProjectInfo = {
      id: faker.number.int(),
      version: version,
      productId: faker.number.int(),
      menuList: [
        {
          id: faker.number.int(),
          menuName: '결과물',
        },
        {
          id: faker.number.int(),
          menuName: '요구사항',
        },
        {
          id: faker.number.int(),
          menuName: '개발',
        },
        {
          id: faker.number.int(),
          menuName: '배포',
        },
      ],
      teamIdList: [],
      projectStatus: 'PROGRESS_IN',
    };

    return HttpResponse.json(newProjectInfo);
  }),
  http.get('/products/:productId/members', () => {
    const productMembers = faker.helpers.multiple(createProductMembers, {
      count: faker.number.int({ min: 0, max: 20 }),
    });
    return HttpResponse.json(productMembers);
  }),
];
