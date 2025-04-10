import { NextRequest, NextResponse } from 'next/server';

import { apiErrorHandler } from '@/lib/errors/errorHandlers/apiErrorHandler';
import { uploadFile } from '@/lib/services/storageService';
import { FileResponseType, UploadFileType } from '@/lib/types/storage';
import { uploadFileSchema } from '@/lib/validation/storageSchema';
import { validateFormData } from '@/lib/validation/validationHandlers/validateFormData';

export const POST = apiErrorHandler<FileResponseType>(
  async (req: NextRequest) => {
    const formData = await req.formData();

    const validatedFormData = await validateFormData<UploadFileType>({
      formData,
      schema: uploadFileSchema,
    });
    const heroPhotoObject = await uploadFile(validatedFormData);

    return NextResponse.json(heroPhotoObject, { status: 200 });
  }
);
