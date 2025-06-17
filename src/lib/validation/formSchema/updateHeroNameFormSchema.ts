import * as yup from 'yup';

import { UpdateHeroNameForm } from '@/lib/types/initFormData/UpdateHeroNameForm';

export const updateHeroNameFormSchema: yup.ObjectSchema<UpdateHeroNameForm> =
  yup.object({
    heroName: yup.string().max(30, 'max_symbols').required(),
  });
