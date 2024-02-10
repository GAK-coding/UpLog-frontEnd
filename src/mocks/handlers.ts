// src/mocks/handlers.ts
import { auth } from '@/mocks/api/member/auth.ts';
import { emailController } from '@/mocks/api/emailController';
import { common } from '@/mocks/api/common.ts';
import { product } from '@/mocks/api/product';

const handlers = [...auth, ...emailController, ...common, ...product];

export default handlers;
