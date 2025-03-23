import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariant;
  fullwidth?: boolean;
  onClick?: () => void;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'primary',
  fullwidth,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      'border-2 border-solid border-transparent bg-foreground  text-background md:hover:bg-hovered md:active:bg-active',
    secondary:
      'border-2 border-solid border-foreground text-foreground  md:hover:border-hovered md:hover:text-hovered md:active:border-active md:active:text-active',
  };

  return (
    <button
      className={clsx(
        'rounded-full p-4 font-bold',
        variants[variant],
        fullwidth && 'w-full',
        'transition'
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
