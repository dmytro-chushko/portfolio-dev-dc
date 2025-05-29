import { ChangeEvent, useState } from 'react';

import StyledTextarea from '@/components/ui/StyledTextarea/StyledTextarea';

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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  return (
    <HeroFormWrapper formAction={() => {}} onClose={onClose}>
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
