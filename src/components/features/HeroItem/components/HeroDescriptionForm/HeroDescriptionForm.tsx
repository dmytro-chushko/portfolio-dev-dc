import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import updateHeroDescriptionAction from '@/app/actions/updateHeroDescriptionAction';
import Button from '@/components/ui/Button/Button';
import StyledTextarea from '@/components/ui/StyledTextarea/StyledTextarea';
import { UpdateHeroDescriptionForm } from '@/lib/types/initFormData/UpdateHeroDescriptionForm';
import { LangType } from '@/lib/types/LangType';
import { getValidationErrorMessage } from '@/lib/utils/getValidationErrorMessage';
import showActionMessages from '@/lib/utils/showActionMessages';
import { updateHeroDescriptionFormSchema } from '@/lib/validation/formSchema/updateHeroDescriptionFormSchema';

import HeroFormWrapper from '../HeroFormWrapper/HeroFormWrapper';

type HeroDescriptionFormProps = {
  translationId: string;
  lang: LangType;
  descriptionValue: string;
  onClose: () => void;
};

const HeroDescriptionForm = ({
  translationId,
  lang,
  descriptionValue,
  onClose,
}: HeroDescriptionFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    updateHeroDescriptionAction,
    {
      status: '',
      successMessage: '',
      translationId,
      lang,
    }
  );
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateHeroDescriptionForm>({
    defaultValues: {
      heroDescription: descriptionValue,
    },
    resolver: yupResolver(updateHeroDescriptionFormSchema),
  });
  const t = useTranslations();

  const onSubmit = (data: UpdateHeroDescriptionForm) => {
    if (!isDirty) return onClose();

    const formData = new FormData();

    formData.set('heroDescription', data.heroDescription);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state.status) return;

    const { successMessage, errorMessage } = state;

    showActionMessages({ t, successMessage, errorMessage });

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
          name="heroDescription"
          control={control}
          render={({ field }) => (
            <StyledTextarea
              {...field}
              inputStyles="bg-bgInput w-full"
              rows={6}
              error={getValidationErrorMessage(t, errors?.heroDescription)}
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

export default HeroDescriptionForm;
