import { useTranslations } from 'next-intl';
import { FieldError } from 'react-hook-form';

import CONST from './consts';

export const getValidationErrorMessage = (
  fn: ReturnType<typeof useTranslations>,
  message?: FieldError,
  messageProps?: Record<string, Record<string, string>>
): string | undefined => {
  if (message?.message && messageProps?.[message.message]) {
    return fn(
      `${CONST.FORM_VALIDATION_DICT_PREFIX}.${message.message}`,
      messageProps[message.message]
    );
  }

  if (message) {
    return fn(`${CONST.FORM_VALIDATION_DICT_PREFIX}.${message.message}`);
  }
};
