'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LangType } from '@prisma/client';
import { useActionState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import updateHeroNameAction from '@/app/actions/updateHeroNameAction';
import Button from '@/components/ui/Button/Button';
import StyledInput from '@/components/ui/StyledInput/StyledInput';
import { UpdateHeroNameForm } from '@/lib/types/initFormData/UpdateHeroNameForm';
import { updateHeroNameFormSchema } from '@/lib/validation/formSchema/updateHeroNameFormSchema';

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
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(updateHeroNameAction, {
    status: '',
    successMessage: '',
    translationId,
    lang,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateHeroNameForm>({
    defaultValues: {
      heroName: nameValue,
    },
    resolver: yupResolver(updateHeroNameFormSchema),
  });

  const onSubmit = (data: UpdateHeroNameForm) => {
    const formData = new FormData();

    formData.set('heroName', data.heroName);
    formAction(formData);
  };

  useEffect(() => {
    if (!state.status) return;

    if (state.successMessage) alert(state.successMessage);
  }, [state]);

  return (
    <HeroFormWrapper
      formRef={formRef}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <Controller
        name="heroName"
        control={control}
        render={({ field }) => (
          <StyledInput
            {...field}
            inputStyles="bg-bgInput text-lg"
            error={errors.heroName?.message}
            autoFocus
          />
        )}
      />
      <Button type="submit" loading={pending}>
        Save
      </Button>
    </HeroFormWrapper>
  );
};

export default HeroNameForm;
