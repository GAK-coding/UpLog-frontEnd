// src/mocks/handlers.ts
import { auth } from '@/mock/api/member/auth.ts';
import { emailController } from '@/mock/api/emailController';
import { common } from '@/mock/api/common.ts';

const handlers = [...auth, ...emailController, ...common];

export default handlers;
