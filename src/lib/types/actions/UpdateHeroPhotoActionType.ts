import { LangType } from '@prisma/client';

export type UpdateHeroPhotoActionType = {
  status: string;
  heroVersion: string;
  lang: LangType;
  successMessage?: string;
  errorMessage?: Record<string, string>;
};
