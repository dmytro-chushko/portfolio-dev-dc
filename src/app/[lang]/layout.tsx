import '@/styles/globals.css';

import { RootLayoutProps } from '@/lib/types/RootLayoutType';
import { roboto } from '@/styles/fonts';

const RootLayout = async ({ children, params }: Readonly<RootLayoutProps>) => {
  const lang = (await params).lang;

  return (
    <html lang={lang || 'en'}>
      <body
        className={`font-roboto ${roboto.variable} font-normal antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
