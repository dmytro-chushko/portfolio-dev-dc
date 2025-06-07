import { LangType } from '@prisma/client';

export type UpdateHeroNameState = {
  status: string;
  translationId: string;
  lang: LangType;
  successMessage?: string;
  errorMessage?: Record<string, string>;
};
