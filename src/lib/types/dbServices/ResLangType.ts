import { LangType } from '@prisma/client';

export type ResLangType = {
  id: string;
  code: LangType;
  name: string;
};
