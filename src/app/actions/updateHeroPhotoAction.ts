'use server';

import { revalidateTag } from 'next/cache';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import PayloadValidationError from '@/lib/errors/PayloadValidationError';
import { updateHeroPhoto } from '@/lib/services/dbServices/heroService';
import { uploadFile } from '@/lib/services/storageService';
import { UpdateHeroPhotoActionType } from '@/lib/types/actions/UpdateHeroPhotoActionType';
import { UpdateHeroPhotoType } from '@/lib/types/dbServices/UpdateHeroPhotoType';
import { updateHeroPhotoSchema } from '@/lib/validation/actionSchema/updateHeroPhotoSchema';
import { validateFormData } from '@/lib/validation/validationHandlers/validateFormData';

const updateHeroPhotoAction = async (
  state: UpdateHeroPhotoActionType,
  formData: FormData
) => {
  const { heroVersion, lang } = state;

  try {
    const validatedBodyForUploadImage = await validateFormData<{
      image: File;
    }>({
      formData,
      schema: updateHeroPhotoSchema,
    });

    const { fullPath } = await uploadFile({
      fileBody: validatedBodyForUploadImage.image,
    });

    await dbQueryErrorHandler<void, UpdateHeroPhotoType>(
      updateHeroPhoto,
      lang
    )({
      heroPhoto: fullPath,
      heroVersion,
    });

    revalidateTag('all-heroes');

    return {
      status: 'success',
      heroVersion,
      lang,
      successMessage: 'Image updated',
    };
  } catch (err) {
    if (err instanceof PayloadValidationError) {
      return {
        status: 'error',
        errorMessage: err.errorMessage,
        heroVersion,
        lang,
      };
    }

    throw err;
  }
};

export default updateHeroPhotoAction;
