import * as yup from 'yup';

import { UpdateHeroDescriptionType } from '@/lib/types/dbServices/UpdateHeroDescriptionType';

export const updateHeroDescriptionSchema: yup.ObjectSchema<UpdateHeroDescriptionType> =
  yup.object({
    heroDescription: yup.string().required(),
    translationId: yup.string().required(),
  });
