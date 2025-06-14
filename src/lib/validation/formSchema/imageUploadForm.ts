import * as yup from 'yup';

import getImageDimensions from '@/lib/utils/getImageDimentions';

export const fileSchema: yup.ObjectSchema<{ image: FileList }> = yup.object({
  image: yup
    .mixed<FileList>()
    .required('required')
    .test('fileType', 'allowed_image_type', (file) => {
      if (!file?.[0]) return false;

      return ['image/jpeg', 'image/png'].includes(file[0].type);
    })
    .test('minWidth', 'allowed_image_width', async (file) => {
      if (!file?.[0] || !['image/jpeg', 'image/png'].includes(file[0].type))
        return false;

      const imageDimensions = await getImageDimensions(file[0]);

      return imageDimensions.width >= 320;
    }),
});
