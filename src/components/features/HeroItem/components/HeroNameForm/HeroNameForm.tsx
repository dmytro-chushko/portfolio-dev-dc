'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LangType } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import updateHeroNameAction from '@/app/actions/updateHeroNameAction';
import Button from '@/components/ui/Button/Button';
import StyledInput from '@/components/ui/StyledInput/StyledInput';
import { UpdateHeroNameForm } from '@/lib/types/initFormData/UpdateHeroNameForm';
import showActionMessages from '@/lib/utils/showActionMessages';
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
  const t = useTranslations();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateHeroNameForm>({
    defaultValues: {
      heroName: nameValue,
    },
    resolver: yupResolver(updateHeroNameFormSchema(t)),
  });

  const onSubmit = (data: UpdateHeroNameForm) => {
    if (!isDirty) return onClose();

    const formData = new FormData();

    formData.set('heroName', data.heroName);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state.status) return;

    const { successMessage, errorMessage } = state;

    showActionMessages({ successMessage, errorMessage });

    if (state.status === 'success') onClose();
  }, [onClose, state, t]);

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
              error={errors?.heroName?.message}
              autoFocus
            />
          )}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" loading={pending}>
          {t('form.save_submit')}
        </Button>
        <Button type="button" loading={pending} onClick={onClose}>
          {t('form.cancel')}
        </Button>
      </div>
    </HeroFormWrapper>
  );
};

export default HeroNameForm;
