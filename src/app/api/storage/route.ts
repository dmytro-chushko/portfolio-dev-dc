import { NextRequest, NextResponse } from 'next/server';

import { uploadFile } from '@/lib/services/storageService';
import CustomError from '@/lib/utils/CustomError';
import { storageErrorTypeGuard } from '@/lib/utils/storageErrorTypeGuard';
import { uploadFileSchema } from '@/lib/validation/storageSchema';

export const POST = async (req: NextRequest) => {
  const formDataObj: Record<string, FormDataEntryValue> = {};
  try {
    const formData = await req.formData();

    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    const validatedPayload = await uploadFileSchema.validate(formDataObj);
    const heroPhotoObject = await uploadFile(validatedPayload);

    if (storageErrorTypeGuard(heroPhotoObject))
      throw new CustomError({
        message: heroPhotoObject.message,
        status: +heroPhotoObject.statusCode,
        details: { error: heroPhotoObject.error },
      });

    return NextResponse.json(heroPhotoObject, { status: 200 });
  } catch (err) {
    if (err instanceof CustomError)
      return NextResponse.json(err, { status: err.status });

    return NextResponse.json({ err }, { status: 500 });
  }
};
