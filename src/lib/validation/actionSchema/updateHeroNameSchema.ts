import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import { UpdateHeroNameType } from '@/lib/types/dbServices/UpdateHeroNameType';
import { LangType } from '@/lib/types/LangType';
import CONST from '@/lib/utils/consts';

export const updateHeroNameSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<UpdateHeroNameType & { lang: LangType }> =>
  yup.object({
    heroName: yup
      .string()
      .max(
        5,
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.max_symbols`, { number: '5' })
      )
      .required(
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
          fieldName: t(`${CONST.FORM_FIELD_PREFIX}.hero_name`),
        })
      ),
    translationId: yup.string().required(),
    lang: yup.mixed<LangType>().required(),
  });
