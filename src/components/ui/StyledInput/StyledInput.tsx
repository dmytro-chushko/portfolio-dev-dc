import { Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type StyledInputProps = {
  label?: string;
  description?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const StyledInput = ({
  label,
  description,
  error,
  ...rest
}: StyledInputProps) => {
  return (
    <Field>
      {label && <Label>{label}</Label>}
      <Input invalid={!!error} {...rest} />
      {(description || error) && (
        <Description className={clsx(error && 'text-error')}>
          {description || error}
        </Description>
      )}
    </Field>
  );
};

export default StyledInput;
