'use server';

import { revalidateTag } from 'next/cache';

export default async () => revalidateTag('lang');
