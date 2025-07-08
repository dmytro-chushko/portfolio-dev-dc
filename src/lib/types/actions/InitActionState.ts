import { LangType } from '../LangType';

export type InitActionState = {
  status: string;
  lang: LangType;
  successMessage?: string;
  errorMessage?: Record<string, string>;
};
