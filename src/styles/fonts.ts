import { Roboto } from 'next/font/google';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

export { roboto };
