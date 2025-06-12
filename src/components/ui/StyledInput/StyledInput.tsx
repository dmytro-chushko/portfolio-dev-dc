import { Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type StyledInputProps = {
  label?: string;
  description?: string;
  error?: string;
  inputStyles?: string;
  labelStyles?: string;
  descriptionStyles?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const StyledInput = ({
  label,
  description,
  error,
  inputStyles,
  labelStyles,
  descriptionStyles,
  disabled,
  ...rest
}: StyledInputProps) => {
  return (
    <Field disabled={disabled}>
      {label && <Label className={clsx(labelStyles)}>{label}</Label>}
      <Input
        className={clsx(
          'p-2 rounded',
          description || (error && 'mb-2'),
          inputStyles
        )}
        invalid={!!error}
        {...rest}
      />
      {(description || error) && (
        <Description className={clsx(error && 'text-error', descriptionStyles)}>
          {description || error}
        </Description>
      )}
    </Field>
  );
};

export default StyledInput;
