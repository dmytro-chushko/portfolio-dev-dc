import * as yup from 'yup';

import { UpdateHeroDescriptionType } from '@/lib/types/dbServices/UpdateHeroDescriptionType';
import { LangType } from '@/lib/types/LangType';

export const updateHeroDescriptionSchema: yup.ObjectSchema<
  UpdateHeroDescriptionType & { lang: LangType }
> = yup.object({
  heroDescription: yup.string().required(),
  translationId: yup.string().required(),
  lang: yup.mixed<LangType>().required(),
});
