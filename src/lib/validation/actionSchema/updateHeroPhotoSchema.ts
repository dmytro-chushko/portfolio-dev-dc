import * as yup from 'yup';

const FILE_SIZE_LIMIT = 1 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

export const updateHeroPhotoSchema: yup.ObjectSchema<{ image: File }> =
  yup.object({
    image: yup
      .mixed<File>()
      .required('Файл обовʼязковий')
      .test('fileType', 'Дозволені лише JPG або PNG', (value) => {
        return value && SUPPORTED_FORMATS.includes(value.type);
      })
      .test('fileSize', 'Розмір файлу не має перевищувати 5MB', (value) => {
        return value && value.size <= FILE_SIZE_LIMIT;
      }),
  });
