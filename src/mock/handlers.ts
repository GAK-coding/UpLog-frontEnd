// src/mocks/handlers.ts
import { auth } from '@/mock/api/member/auth.ts';
import { emailController } from '@/mock/api/emailController';

const handlers = [...auth, ...emailController];

export default handlers;
