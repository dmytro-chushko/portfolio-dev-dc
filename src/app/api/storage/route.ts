import { NextRequest, NextResponse } from 'next/server';

import { apiErrorHandler } from '@/lib/errors/errorHandlers/apiErrorHandler';
import StorageError from '@/lib/errors/StorageError';
import { uploadFile } from '@/lib/services/storageService';
import { FileResponseType, UploadFileType } from '@/lib/types/storage';
import { storageErrorTypeGuard } from '@/lib/utils/storageErrorTypeGuard';
import { uploadFileSchema } from '@/lib/validation/storageSchema';
import { validateFormData } from '@/lib/validation/validationHandlers/validateFormData';

export const POST = apiErrorHandler<FileResponseType | Error>(
  async (req: NextRequest) => {
    const formData = await req.formData();

    const validatedFormData = await validateFormData<UploadFileType>({
      formData,
      schema: uploadFileSchema,
    });
    const heroPhotoObject = await uploadFile(validatedFormData);

    if (storageErrorTypeGuard(heroPhotoObject))
      throw new StorageError(heroPhotoObject);

    return NextResponse.json(heroPhotoObject, { status: 200 });
  }
);
