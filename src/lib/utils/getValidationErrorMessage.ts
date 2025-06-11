import { useTranslations } from 'next-intl';
import { FieldError } from 'react-hook-form';

import CONST from './consts';

export const getValidationErrorMessage = (
  fn: ReturnType<typeof useTranslations>,
  message?: FieldError
): string | undefined => {
  if (message) {
    return fn(`${CONST.FORM_VALIDATION_DICT_PREFIX}.${message?.message}`);
  }
};
