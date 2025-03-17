import clsx from 'clsx';
import { ReactNode } from 'react';

type ParagraphProps = {
  children: ReactNode;
  accent?: boolean;
  className?: string;
};

const Paragraph = ({ children, accent, className }: ParagraphProps) => {
  return <p className={clsx(accent && 'text-lg', className)}>{children}</p>;
};

export default Paragraph;
