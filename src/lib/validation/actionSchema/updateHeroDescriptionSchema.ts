import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import { UpdateHeroDescriptionType } from '@/lib/types/dbServices/UpdateHeroDescriptionType';
import { LangType } from '@/lib/types/LangType';
import CONST from '@/lib/utils/consts';

export const updateHeroDescriptionSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<UpdateHeroDescriptionType & { lang: LangType }> =>
  yup.object({
    heroDescription: yup
      .string()
      .max(
        500,
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.max_symbols`, { number: '500' })
      )
      .required(
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
          fieldName: t(`${CONST.FORM_FIELD_PREFIX}.hero_description`),
        })
      ),
    translationId: yup.string().required(),
    lang: yup.mixed<LangType>().required(),
  });
