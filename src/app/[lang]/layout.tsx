import '@/styles/globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';

import ErrorIcon from '@/components/icons/toastIcons/toastError.svg';
import { RootLayoutProps } from '@/lib/types/RootLayoutType';
import { roboto } from '@/styles/fonts';

const RootLayout = async ({ children, params }: Readonly<RootLayoutProps>) => {
  const lang = (await params).lang;

  return (
    <html lang={lang || 'en'}>
      <body
        className={`font-roboto ${roboto.variable} font-normal antialiased`}
      >
        <NextIntlClientProvider>
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                toast: '!bg-foreground',
                title: '!text-background',
              },
            }}
            icons={{
              error: <ErrorIcon />,
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
