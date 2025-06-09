import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariant;
  fullwidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'primary',
  fullwidth,
  loading,
  disabled,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      'primary border-2 border-solid border-transparent bg-foreground text-background md:hover:bg-hovered md:active:bg-active md:disabled:hover:bg-foreground',
    secondary:
      'secondary border-2 border-solid border-foreground disabled:border-hovered text-foreground  md:hover:border-hovered md:hover:text-hovered md:active:border-active md:active:text-active',
  };

  return (
    <button
      className={clsx(
        'rounded-full min-w-20 p-4 font-bold disabled:text-hovered',
        variants[variant],
        fullwidth && 'w-full',
        loading && 'loading',
        'transition'
      )}
      disabled={loading || disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
