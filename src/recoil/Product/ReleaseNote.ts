import { atom } from 'recoil';
import { changeType } from '@/typings/product.ts';

export const typeBgColors = atom<Record<changeType, string>>({
  key: 'typeBgColors',
  default: {
    Feature: 'bg-type-feature',
    Changed: 'bg-type-changed',
    Fixed: 'bg-type-fixed',
    New: 'bg-type-new',
    Deprecated: 'bg-type-deprecated',
  },
});
