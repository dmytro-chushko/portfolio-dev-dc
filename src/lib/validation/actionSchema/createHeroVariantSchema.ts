import { LangType } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import { CreateHeroType } from '@/lib/types/dbServices';
import CONST from '@/lib/utils/consts';

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
            .required(
              t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
                fieldName: t(`${CONST.FORM_FIELD_PREFIX}.translation.lang`),
              })
            ),
          heroName: yup.string().required(
            t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
              fieldName: t(`${CONST.FORM_FIELD_PREFIX}.hero_name`),
            })
          ),
          heroDescription: yup.string().required(
            t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
              fieldName: t(`${CONST.FORM_FIELD_PREFIX}.hero_description`),
            })
          ),
        })
      )
      .required(
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
          fieldName: t(`${CONST.FORM_FIELD_PREFIX}.translation.array`),
        })
      )
      .min(2, t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.quantity`)),
  });
