import { InitActionState } from './InitActionState';

export type UpdateHeroPhotoActionType = InitActionState & {
  heroVersion: string;
};
