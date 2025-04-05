import { NextResponse } from 'next/server';

import { createHeroVariant } from '@/lib/services/dbServices/heroService';
import { createHeroSchema } from '@/lib/validation/apiSchema/heroApiSchema';

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const body = await req.json();
  const fileBody = formData.get('fileBody');

  const validatedBody = await createHeroSchema.validate({
    ...body,
    heroPhoto: fileBody,
  });

  const createdHero = await createHeroVariant(validatedBody);

  return NextResponse.json({ createdHero });
};
