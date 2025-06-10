import { cookies } from 'next/headers';

const getUserLocale = async (): Promise<string> => {
  return (await cookies()).get('NEXT_LOCALE')?.value || 'en';
};

export default getUserLocale;
