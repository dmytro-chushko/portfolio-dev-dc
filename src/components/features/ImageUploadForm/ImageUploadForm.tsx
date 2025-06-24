'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LangType } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

import updateHeroPhotoAction from '@/app/actions/updateHeroPhotoAction';
import Button from '@/components/ui/Button/Button';
import { SetStateType } from '@/lib/types/SetStateType';
import showActionMessages from '@/lib/utils/showActionMessages';
import { imageUploadForm } from '@/lib/validation/formSchema/imageUploadForm';

type ImageUploadFormProps = {
  initPhoto: string;
  heroVersion: string;
  onChangePreview: SetStateType<string>;
};

const ImageUploadForm = ({
  initPhoto,
  heroVersion,
  onChangePreview,
}: ImageUploadFormProps) => {
  const { lang } = useParams<{ lang: LangType }>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [createdBlob, setCreatedBlob] = useState<string>('');
  const t = useTranslations('dashboard.hero_item');
  const messageGetter = useTranslations();
  const [state, formAction, pending] = useActionState(updateHeroPhotoAction, {
    status: '',
    successMessage: '',
    heroVersion,
    lang,
  });
  const {
    register,
    trigger,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ image: FileList }>({
    resolver: yupResolver(imageUploadForm(messageGetter)),
    defaultValues: { image: undefined },
  });

  const { onChange, onBlur, name, ref } = register('image');
  const uploadedFile = watch('image');

  const handleClickButton = () => inputRef?.current?.click();

  const handleClickCancelButton = () => {
    onChangePreview(initPhoto);
    setCreatedBlob('');
  };

  const onSubmit = (data: { image: FileList }) => {
    const formData = new FormData();
    formData.set('image', data.image[0]);
    formData.set('prevPhoto', initPhoto);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state.status) return;

    const { successMessage, errorMessage } = state;

    showActionMessages({ successMessage, errorMessage });

    if (state.status === 'success') setCreatedBlob('');
  }, [state]);

  useEffect(() => {
    const check = async () => {
      if (uploadedFile && uploadedFile.length) {
        const fileIsValid = await trigger('image');

        if (fileIsValid) {
          const url = URL.createObjectURL(uploadedFile[0]);
          onChangePreview(url);
          setCreatedBlob(url);
        }
      }
    };

    check();
  }, [uploadedFile, onChangePreview, trigger]);

  useEffect(() => {
    if (createdBlob) {
      return () => URL.revokeObjectURL(createdBlob);
    }
  }, [createdBlob]);

  return (
    <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
      {createdBlob ? (
        <div className="flex items-center justify-between">
          <Button variant="primary" type="submit" loading={pending}>
            {t('confirmUploadFileLabel')}
          </Button>
          <Button
            variant="secondary"
            type="button"
            loading={pending}
            onClick={handleClickCancelButton}
          >
            {t('cancelUploadFileLabel')}
          </Button>
        </div>
      ) : (
        <Button
          variant="primary"
          type="button"
          loading={pending}
          onClick={handleClickButton}
        >
          {t('uploadFileLabel')}
        </Button>
      )}
      {errors?.image && (
        <span className="text-error block pt-4">{errors?.image?.message}</span>
      )}
      <input
        className="hidden"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        type="file"
        accept="image/*"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
    </form>
  );
};

export default ImageUploadForm;
