import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import { ActivateHeroPropType } from '@/lib/types/dbServices/ActivateHeroPropType';
import CONST from '@/lib/utils/consts';

export const activateHeroSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<ActivateHeroPropType> =>
  yup.object({
    id: yup.string().required(
      t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
        fieldName: 'id',
      })
    ),
  });
