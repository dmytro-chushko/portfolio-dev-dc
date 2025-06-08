import { LangType } from '@prisma/client';

export type UpdateHeroDataState = {
  status: string;
  translationId: string;
  lang: LangType;
  successMessage?: string;
  errorMessage?: Record<string, string>;
};
