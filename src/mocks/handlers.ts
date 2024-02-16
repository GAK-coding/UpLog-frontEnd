// src/mocks/handlers.ts
import { auth } from '@/mocks/api/member/auth.ts';
import { emailController } from '@/mocks/api/emailController';
import { common } from '@/mocks/api/common.ts';
import { product } from '@/mocks/api/product';
import { myPage } from '@/mocks/api/member/myPage.ts';

const handlers = [...auth, ...emailController, ...common, ...product, ...myPage];

export default handlers;
