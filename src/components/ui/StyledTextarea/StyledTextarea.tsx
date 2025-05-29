import { Description, Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';

type StyledTextareaProps = {
  label?: string;
  description?: string;
  error?: string;
  inputStyles?: string;
  labelStyles?: string;
  descriptionStyles?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const StyledTextarea = ({
  label,
  description,
  error,
  inputStyles,
  labelStyles,
  descriptionStyles,
  disabled,
  ...rest
}: StyledTextareaProps) => {
  return (
    <Field disabled={disabled}>
      {label && <Label className={clsx(labelStyles)}>{label}</Label>}
      <Textarea
        className={clsx('p-2 rounded', inputStyles)}
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

export default StyledTextarea;
