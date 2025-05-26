'use server';

import { revalidateTag } from 'next/cache';

const revalidateLang = async () => revalidateTag('lang');

export default revalidateLang;
