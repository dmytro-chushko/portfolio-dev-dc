import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import CONST from '@/lib/utils/consts';
import getImageDimensions from '@/lib/utils/getImageDimentions';

export const imageUploadForm = (
  t: ReturnType<typeof useTranslations>
): yup.ObjectSchema<{ image: FileList }> =>
  yup.object({
    image: yup
      .mixed<FileList>()
      .required('required')
      .test(
        'fileType',
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.allowed_image_type`),
        (file) => {
          if (!file?.[0]) return false;

          return ['image/jpeg', 'image/png'].includes(file[0].type);
        }
      )
      .test(
        'minWidth',
        t(`${CONST.FORM_VALIDATION_DICT_PREFIX}.allowed_image_width`, {
          width: '320',
        }),
        async (file) => {
          if (!file?.[0] || !['image/jpeg', 'image/png'].includes(file[0].type))
            return false;

          const imageDimensions = await getImageDimensions(file[0]);

          return imageDimensions.width >= 320;
        }
      ),
  });
