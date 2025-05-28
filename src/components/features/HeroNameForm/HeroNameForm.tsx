'use client';

import { ChangeEvent, useRef, useState } from 'react';

import StyledInput from '@/components/ui/StyledInput/StyledInput';
import { useClickOutside } from '@/lib/hooks/useClickOutside.';

type HeroNameFormProps = {
  nameValue: string;
  onClose: () => void;
};

const HeroNameForm = ({ nameValue, onClose }: HeroNameFormProps) => {
  const [value, setValue] = useState(nameValue);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  useClickOutside<HTMLFormElement>(formRef, () => onClose());

  return (
    <form ref={formRef}>
      <StyledInput
        inputStyles="bg-bgInput"
        name="heroName"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

export default HeroNameForm;
