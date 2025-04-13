import * as yup from 'yup';

import { CreateHeroType } from '@/lib/types/dbServices';
import { LangType } from '@/lib/types/LangType';

export const createHeroSchema: yup.ObjectSchema<CreateHeroType> = yup.object({
  translations: yup
    .array()
    .of(
      yup.object().shape({
        lang: yup.mixed<LangType>().required(),
        heroName: yup.string().required(),
        heroDescription: yup.string().required(),
      })
    )
    .required(),
  heroPhoto: yup.string().required(),
  heroVersion: yup.string().required(),
});
