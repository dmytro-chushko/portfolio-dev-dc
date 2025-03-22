import clsx from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  fullwidth?: boolean;
  children: ReactNode;
};

const Button = ({ primary, secondary, fullwidth, children }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-full p-4 font-bold',
        primary &&
          'border-2 border-solid border-transparent bg-foreground  text-background md:hover:bg-hovered md:active:bg-active',
        secondary &&
          'border-2 border-solid border-foreground text-foreground  md:hover:border-hovered md:hover:text-hovered md:active:border-active md:active:text-active',
        fullwidth && 'w-full',
        'transition'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
