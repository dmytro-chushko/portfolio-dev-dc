'use client';

import { LangType } from '@prisma/client';
import { ChangeEvent, useActionState, useRef, useState } from 'react';

import updateHeroNameAction from '@/app/actions/updateHeroNameAction';
import Button from '@/components/ui/Button/Button';
import StyledInput from '@/components/ui/StyledInput/StyledInput';

import HeroFormWrapper from '../HeroFormWrapper/HeroFormWrapper';

type HeroNameFormProps = {
  translationId: string;
  lang: LangType;
  nameValue: string;
  onClose: () => void;
};

const HeroNameForm = ({
  translationId,
  lang,
  nameValue,
  onClose,
}: HeroNameFormProps) => {
  const [value, setValue] = useState<string>(nameValue);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    updateHeroNameAction,
    undefined
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <HeroFormWrapper
      formRef={formRef}
      formAction={formAction}
      onClose={onClose}
    >
      <StyledInput
        inputStyles="bg-bgInput text-lg"
        name="heroName"
        value={value}
        error={!Array.isArray(state?.errors) ? state?.errors : ''}
        autoFocus
        onChange={handleChange}
      />
      <Button type="submit" loading={pending}>
        Save
      </Button>
      <input type="hidden" name="translationId" value={translationId} />
      <input type="hidden" name="lang" value={lang} />
    </HeroFormWrapper>
  );
};

export default HeroNameForm;
