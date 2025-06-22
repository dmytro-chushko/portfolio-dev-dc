import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import { UpdateHeroNameType } from '@/lib/types/dbServices/UpdateHeroNameType';
import { LangType } from '@/lib/types/LangType';

export const updateHeroNameSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<UpdateHeroNameType & { lang: LangType }> =>
  yup.object({
    heroName: yup
      .string()
      .max(5, t('max_symbols', { number: '5' }))
      .required(),
    translationId: yup.string().required(),
    lang: yup.mixed<LangType>().required(),
  });
