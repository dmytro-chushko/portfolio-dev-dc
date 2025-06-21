import * as yup from 'yup';

import { UpdateHeroDescriptionForm } from '@/lib/types/initFormData/UpdateHeroDescriptionForm';

export const updateHeroDescriptionFormSchema: yup.ObjectSchema<UpdateHeroDescriptionForm> =
  yup.object({
    heroDescription: yup.string().max(5, 'max_symbols').required('required'),
  });
