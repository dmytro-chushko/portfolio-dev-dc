import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import CONST from './consts';

type ActionMessagesPropsType = {
  t: ReturnType<typeof useTranslations>;
  successMessage?: string;
  errorMessage?: Record<string, string>;
};

const showActionMessages = ({
  t,
  successMessage,
  errorMessage,
}: ActionMessagesPropsType): void => {
  if (successMessage) {
    toast.success(successMessage, { closeButton: true });
  }

  if (errorMessage) {
    Object.values(errorMessage).forEach((message) =>
      toast.error(t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.${message}`), {
        closeButton: true,
      })
    );
  }
};

export default showActionMessages;
