import * as yup from 'yup';

import getImageDimensions from '@/lib/utils/getImageDimentions';

export const fileSchema: yup.ObjectSchema<{ image: File }> = yup.object({
  image: yup
    .mixed<File>()
    .required('required')
    .test('fileType', 'allowed_image_type', (file) => {
      if (!file) return false;

      return ['image/jpeg', 'image/png'].includes(file.type);
    })
    .test('minWidth', 'allowed_image_width', async (file) => {
      if (!file) return false;

      const imageDimensions = await getImageDimensions(file);

      return imageDimensions.width >= 320;
    }),
});
