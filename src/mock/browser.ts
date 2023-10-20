// src/mocks/browser.js
import { setupWorker } from 'msw';
import { auth } from '@/mock/api/member/auth.ts';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...auth);
