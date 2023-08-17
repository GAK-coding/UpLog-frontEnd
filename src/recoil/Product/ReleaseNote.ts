import { atom } from 'recoil';
import { changeType } from '@/typings/product.ts';

export const typeBgColors = atom<Record<changeType, string>>({
  key: 'typeBgColors',
  default: {
    FEATURE: 'bg-type-feature',
    CHANGED: 'bg-type-changed',
    FIXED: 'bg-type-fixed',
    NEW: 'bg-type-new',
    DEPRECATED: 'bg-type-deprecated',
  },
});
