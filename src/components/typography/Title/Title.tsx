import clsx from 'clsx';
import { JSX } from 'react';

type HeaderType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

type TitleProps = {
  header: HeaderType;
  copy: string;
  className?: string;
};

const Title = ({ header, copy, className }: TitleProps) => {
  const headers: Record<HeaderType, JSX.Element> = {
    h1: <h1 className={clsx('text-3xl', className)}>{copy}</h1>,
    h2: <h2 className={clsx('text-2xl', className)}>{copy}</h2>,
    h3: <h3 className={clsx('text-xl', className)}>{copy}</h3>,
    h4: <h4 className={clsx('text-lg', className)}>{copy}</h4>,
    h5: <h5 className={clsx('text-base', className)}>{copy}</h5>,
  };

  return headers[header] ? headers[header] : null;
};

export default Title;
