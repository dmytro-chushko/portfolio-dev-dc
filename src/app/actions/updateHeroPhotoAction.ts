'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { dbQueryErrorHandler } from '@/lib/errors/errorHandlers/dbQueryErrorHandler';
import { updateHeroPhoto } from '@/lib/services/dbServices/heroService';
import { removeFile, uploadFile } from '@/lib/services/storageService';
import { UpdateHeroPhotoActionType } from '@/lib/types/actions/UpdateHeroPhotoActionType';
import { UpdateHeroPhotoType } from '@/lib/types/dbServices/UpdateHeroPhotoType';
import { getActionErrorMessage } from '@/lib/utils/getActionErrorMessage';
import { updateHeroPhotoSchema } from '@/lib/validation/actionSchema/updateHeroPhotoSchema';
import { validateFormData } from '@/lib/validation/validationHandlers/validateFormData';

const updateHeroPhotoAction = async (
  state: UpdateHeroPhotoActionType,
  formData: FormData
) => {
  const { heroVersion, lang } = state;
  const t = await getTranslations();

  try {
    const validatedBodyForUploadImage = await validateFormData<{
      image: File;
      prevPhoto: string;
    }>({
      formData,
      schema: updateHeroPhotoSchema(t),
    });

    const prevPhotoPath = validatedBodyForUploadImage.prevPhoto
      .split('/')
      .slice(-2)
      .join('/');

    const { fullPath } = await uploadFile({
      fileBody: validatedBodyForUploadImage.image,
    });

    await removeFile({ filePath: prevPhotoPath });

    await dbQueryErrorHandler<void, UpdateHeroPhotoType>(
      updateHeroPhoto,
      lang
    )({
      heroPhoto: fullPath,
      heroVersion,
    });

    revalidateTag('all-heroes');
    revalidateTag('active-hero');

    return {
      status: 'success',
      heroVersion,
      lang,
      successMessage: t('success.update_hero_photo'),
    };
  } catch (err) {
    return {
      status: 'error',
      errorMessage: getActionErrorMessage(err),
      heroVersion,
      lang,
    };
  }
};

export default updateHeroPhotoAction;
