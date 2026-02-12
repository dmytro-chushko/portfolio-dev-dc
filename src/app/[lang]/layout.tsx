import '@/styles/globals.css';

import { NextIntlClientProvider } from 'next-intl';

import CustomToaster from '@/components/features/CustomToaster/CustomToaster';
import { LangType } from '@/lib/types/LangType';
import { RootLayoutProps } from '@/lib/types/RootLayoutType';
import { roboto } from '@/styles/fonts';

const RootLayout = async ({ children, params }: Readonly<RootLayoutProps>) => {
  const lang = (await params).lang as LangType;

  return (
    <html lang={lang || 'en'} className="scroll-smooth">
      <body
        className={`font-roboto ${roboto.variable} font-normal antialiased`}
      >
        <NextIntlClientProvider>
          {children}
          <CustomToaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
