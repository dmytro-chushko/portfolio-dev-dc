import * as yup from 'yup';

import { UploadFileType } from '../types/storage';

const FILE_SIZE_LIMIT = 50 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

export const uploadFileSchema: yup.ObjectSchema<UploadFileType> = yup.object({
  fileBody: yup
    .mixed<File>()
    .required()
    .test('fileSize', 'sizeChacking', (value) =>
      value instanceof File ? value.size <= FILE_SIZE_LIMIT : false
    )
    .test('fileType', 'typeChecking', (value) =>
      value instanceof File ? SUPPORTED_FORMATS.includes(value.type) : false
    ),
  path: yup.string().optional(),
});
