import { LangType } from '@prisma/client';
import * as yup from 'yup';

import { UpdateHeroNameType } from '@/lib/types/dbServices/UpdateHeroNameType';

export const updateHeroNameSchema: yup.ObjectSchema<
  UpdateHeroNameType & { lang: LangType }
> = yup.object({
  heroName: yup.string().max(5, 'max_symbols').required(),
  translationId: yup.string().required(),
  lang: yup.mixed<LangType>().required(),
});
