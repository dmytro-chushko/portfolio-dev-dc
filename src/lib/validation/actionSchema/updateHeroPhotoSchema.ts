import { getTranslations } from 'next-intl/server';
import * as yup from 'yup';

import CONST from '@/lib/utils/consts';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

export const updateHeroPhotoSchema = (
  t: Awaited<ReturnType<typeof getTranslations>>
): yup.ObjectSchema<{ image: File; prevPhoto: string }> =>
  yup.object({
    image: yup
      .mixed<File>()
      .required(
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.required`, {
          fieldName: t(`${CONST.FORM_FIELD_PREFIX}.hero_photo`),
        })
      )
      .test(
        'fileType',
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.allowed_image_type`),
        (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }
      )
      .test(
        'fileSize',
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.allowed_image_size`, {
          size: '5MB',
        }),
        (value) => {
          return value && value.size <= FILE_SIZE_LIMIT;
        }
      ),
    prevPhoto: yup.string().required(),
  });
