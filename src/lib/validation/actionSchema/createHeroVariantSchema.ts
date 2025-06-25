import { LangType } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import { CreateHeroType } from '@/lib/types/dbServices';

export const createHeroVariantSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<CreateHeroType> =>
  yup.object({
    heroPhoto: yup.string().required(),
    heroVersion: yup.string().required(),
    translations: yup
      .array()
      .of(
        yup.object({
          lang: yup
            .mixed<LangType>()
            .oneOf(Object.values(LangType))
            .required(t('Language is required')),
          heroName: yup.string().required(t('Hero name is required')),
          heroDescription: yup
            .string()
            .required(t('Hero description is required')),
        })
      )
      .required(t('Translations are required'))
      .min(2, t('At least one translation is required')),
  });
