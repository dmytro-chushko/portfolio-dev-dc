import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import { UpdateHeroNameForm } from '@/lib/types/initFormData/UpdateHeroNameForm';
import CONST from '@/lib/utils/consts';

export const updateHeroNameFormSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<UpdateHeroNameForm> =>
  yup.object({
    heroName: yup
      .string()
      .max(
        30,
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.max_symbols`, { number: '30' })
      )
      .required(
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
          fieldName: t(`${CONST.FORM_FIELD_PREFIX}.hero_name`),
        })
      ),
  });
