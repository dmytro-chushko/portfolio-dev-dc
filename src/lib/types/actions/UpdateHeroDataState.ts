import { InitActionState } from './InitActionState';

export type UpdateHeroDataState = InitActionState & {
  translationId: string;
};
