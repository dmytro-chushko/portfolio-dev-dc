import * as yup from 'yup';

import { LangType } from '@/lib/types/LangType';

const FILE_SIZE_LIMIT = 50 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

export const createHeroSchema = yup.object({
  translations: yup
    .array()
    .of(
      yup.object().shape({
        lang: yup.mixed<LangType>().required(),
        heroName: yup.string().required(),
        heroDescription: yup.string().required(),
      })
    )
    .required(),
  heroPhoto: yup
    .mixed<File>()
    .required()
    .test('fileSize', 'sizeChacking', (value) =>
      value instanceof File ? value.size <= FILE_SIZE_LIMIT : false
    )
    .test('fileType', 'typeChecking', (value) =>
      value instanceof File ? SUPPORTED_FORMATS.includes(value.type) : false
    ),
  heroVersion: yup.string().required(),
});
