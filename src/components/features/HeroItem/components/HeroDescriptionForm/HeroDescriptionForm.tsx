import { ChangeEvent, useEffect, useRef, useState } from 'react';

import StyledTextarea from '@/components/ui/StyledTextarea/StyledTextarea';
import useDebounce from '@/lib/hooks/useDebounce';

import HeroFormWrapper from '../HeroFormWrapper/HeroFormWrapper';

type HeroDescriptionFormProps = {
  descriptionValue: string;
  onClose: () => void;
};

const HeroDescriptionForm = ({
  descriptionValue,
  onClose,
}: HeroDescriptionFormProps) => {
  const [value, setValue] = useState<string>(descriptionValue);
  const formRef = useRef<HTMLFormElement>(null);

  const debouncedValue = useDebounce<string>({ value, delay: 500 });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  useEffect(() => {
    if (debouncedValue && formRef.current) {
      formRef.current.requestSubmit();
    }
  }, [debouncedValue]);

  return (
    <HeroFormWrapper formRef={formRef} formAction={() => {}} onClose={onClose}>
      <StyledTextarea
        inputStyles="bg-bgInput w-full"
        name="heroDescription"
        value={value}
        rows={6}
        autoFocus
        onChange={handleChange}
      />
    </HeroFormWrapper>
  );
};

export default HeroDescriptionForm;
