'use client';

import { ChangeEvent, useRef, useState } from 'react';

import StyledInput from '@/components/ui/StyledInput/StyledInput';

import HeroFormWrapper from '../HeroFormWrapper/HeroFormWrapper';

type HeroNameFormProps = {
  nameValue: string;
  onClose: () => void;
};

const HeroNameForm = ({ nameValue, onClose }: HeroNameFormProps) => {
  const [value, setValue] = useState<string>(nameValue);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <HeroFormWrapper formRef={formRef} formAction={() => {}} onClose={onClose}>
      <StyledInput
        inputStyles="bg-bgInput text-lg"
        name="heroName"
        value={value}
        autoFocus
        onChange={handleChange}
      />
    </HeroFormWrapper>
  );
};

export default HeroNameForm;
