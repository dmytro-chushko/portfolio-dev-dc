import * as yup from 'yup';

import { LangType } from '@/lib/types/LangType';

export const createHeroSchema = yup.object({
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
  heroPhoto: yup.mixed<File>().required(),
});

export type CreateHeroSchema = yup.InferType<typeof createHeroSchema>;
