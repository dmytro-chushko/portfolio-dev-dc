import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import CONST from '@/lib/utils/consts';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

export const updateHeroPhotoSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<{ image: File }> =>
  yup.object({
    image: yup
      .mixed<File>()
      .required(t(`${CONST.FORM_FIELD_PREFIX}required`))
      .test(
        'fileType',
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.allowed_image_type`),
        (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }
      )
      .test(
        'fileSize',
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.allowed_image_width`, {
          width: '320',
        }),
        (value) => {
          return value && value.size <= FILE_SIZE_LIMIT;
        }
      ),
  });
