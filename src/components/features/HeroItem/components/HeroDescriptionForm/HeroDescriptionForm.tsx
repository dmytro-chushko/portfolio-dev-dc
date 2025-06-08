import { yupResolver } from '@hookform/resolvers/yup';
import { useActionState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import updateHeroDescriptionAction from '@/app/actions/updateHeroDescriptionType';
import Button from '@/components/ui/Button/Button';
import StyledTextarea from '@/components/ui/StyledTextarea/StyledTextarea';
import { UpdateHeroDescriptionForm } from '@/lib/types/initFormData/UpdateHeroDescriptionForm';
import { LangType } from '@/lib/types/LangType';
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
    formState: { errors },
  } = useForm<UpdateHeroDescriptionForm>({
    defaultValues: {
      heroDescription: descriptionValue,
    },
    resolver: yupResolver(updateHeroDescriptionFormSchema),
  });

  const onSubmit = (data: UpdateHeroDescriptionForm) => {
    const formData = new FormData();

    formData.set('heroDescription', data.heroDescription);
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
        name="heroDescription"
        control={control}
        render={({ field }) => (
          <StyledTextarea
            {...field}
            inputStyles="bg-bgInput w-full"
            rows={6}
            error={errors.heroDescription?.message}
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

export default HeroDescriptionForm;
