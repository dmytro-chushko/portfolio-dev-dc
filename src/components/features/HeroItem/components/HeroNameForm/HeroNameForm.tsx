'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LangType } from '@prisma/client';
import { useActionState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import updateHeroNameAction from '@/app/actions/updateHeroNameAction';
import Button from '@/components/ui/Button/Button';
import StyledInput from '@/components/ui/StyledInput/StyledInput';
import { UpdateHeroNameForm } from '@/lib/types/initFormData/UpdateHeroNameForm';
import { Dictionary } from '@/lib/utils/getDictionary';
import { updateHeroNameFormSchema } from '@/lib/validation/formSchema/updateHeroNameFormSchema';

import HeroFormWrapper from '../HeroFormWrapper/HeroFormWrapper';

type HeroNameFormProps = {
  translationId: string;
  lang: LangType;
  nameValue: string;
  formDictionary: Dictionary['form'];
  onClose: () => void;
};

const HeroNameForm = ({
  translationId,
  lang,
  nameValue,
  formDictionary,
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
      <div className="mb-2">
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
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" loading={pending}>
          {formDictionary.save_submit}
        </Button>
        <Button type="button" loading={pending} onClick={onClose}>
          {formDictionary.cancel}
        </Button>
      </div>
    </HeroFormWrapper>
  );
};

export default HeroNameForm;
