import * as yup from 'yup';

import { CreateLangType } from '@/lib/types/dbServices';
import { LangType } from '@/lib/types/LangType';

export const createLangSchema: yup.ObjectSchema<CreateLangType> = yup.object({
  code: yup.mixed<LangType>().required(),
  name: yup.string().required(),
});
