import '@/styles/globals.css';

import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';

import CustomToaster from '@/components/features/CustomToaster/CustomToaster';
import { LangType } from '@/lib/types/LangType';
import { RootLayoutProps } from '@/lib/types/RootLayoutType';
import { roboto } from '@/styles/fonts';

const RootLayout = async ({ children, params }: Readonly<RootLayoutProps>) => {
  const lang = (await params).lang as LangType;

  return (
    <html lang={lang || 'en'} className="scroll-smooth">
      <head>
        <style
          // Inline CSS to avoid initial flash before Tailwind/global styles load
          dangerouslySetInnerHTML={{
            __html: `
                    :root {
                      --background: 239, 246, 255;
                      --foreground: 23, 37, 84;
                    }
                    @media (prefers-color-scheme: dark) {
                      :root {
                        --background: 23, 37, 84;
                        --foreground: 239, 246, 255;
                      }
                    }
                    `,
          }}
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='theme',c='dark',r=document.documentElement,s=null;try{s=localStorage.getItem(k);}catch(e){}var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s==='dark'||(!s&&m);if(d){r.classList.add(c);}else{r.classList.remove(c);}}catch(e){}})();`,
          }}
        />
      </head>
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
