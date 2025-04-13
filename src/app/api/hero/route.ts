import { NextRequest, NextResponse } from 'next/server';

import { apiErrorHandler } from '@/lib/errors/errorHandlers/apiErrorHandler';
import { createHeroVariant } from '@/lib/services/dbServices/heroService';
import { CreateHeroType, CreateHeroResType } from '@/lib/types/dbServices';
import { createHeroSchema } from '@/lib/validation/apiSchema/heroApiSchema';
import { validateReqBody } from '@/lib/validation/validationHandlers/validateReqBody';

export const POST = apiErrorHandler<CreateHeroResType>(
  async (req: NextRequest) => {
    const body = await req.json();

    const validatedBody = await validateReqBody<CreateHeroType>({
      body,
      schema: createHeroSchema,
    });

    const createdHero = await createHeroVariant(validatedBody);

    return NextResponse.json(createdHero, { status: 201 });
  }
);
