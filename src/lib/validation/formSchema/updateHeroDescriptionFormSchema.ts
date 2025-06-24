import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import { UpdateHeroDescriptionForm } from '@/lib/types/initFormData/UpdateHeroDescriptionForm';
import CONST from '@/lib/utils/consts';

export const updateHeroDescriptionFormSchema = (
  t: ReturnType<typeof useTranslations>
): yup.ObjectSchema<UpdateHeroDescriptionForm> =>
  yup.object({
    heroDescription: yup
      .string()
      .max(
        600,
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.max_symbols`, { number: '600' })
      )
      .required(
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
          fieldName: t(`${CONST.FORM_FIELD_PREFIX}.hero_description`),
        })
      ),
  });
