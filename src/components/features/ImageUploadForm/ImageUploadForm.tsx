'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LangType } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import updateHeroPhotoAction from '@/app/actions/updateHeroPhotoAction';
import Button from '@/components/ui/Button/Button';
import { SetStateType } from '@/lib/types/SetStateType';
import { getValidationErrorMessage } from '@/lib/utils/getValidationErrorMessage';
import { imageUploadForm } from '@/lib/validation/formSchema/imageUploadForm';

type ImageUploadFormProps = {
  initPhoto: string;
  onChangePreview: SetStateType<string>;
};

const ImageUploadForm = ({
  initPhoto,
  onChangePreview,
}: ImageUploadFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { lang } = useParams<{ lang: LangType }>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [createdBlob, setCreatedBlob] = useState<string>('');
  const t = useTranslations('dashboard.hero_item');
  const messageGetter = useTranslations();
  const {
    register,
    trigger,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ image: FileList }>({
    resolver: yupResolver(imageUploadForm),
    defaultValues: { image: undefined },
  });

  const { onChange, onBlur, name, ref } = register('image');
  const uploadedFile = watch('image');

  const handleClickButton = () => inputRef?.current?.click();

  const handleClickCancelButton = () => {
    onChangePreview(initPhoto);
    setCreatedBlob('');
  };

  const onSubmit = async (data: { image: FileList }) => {
    setIsLoading(true);

    try {
      await updateHeroPhotoAction({
        heroVarsion: '',
        fileList: data.image,
        lang,
      });
    } catch (e) {
      setIsLoading(false);

      throw e;
    }

    setIsLoading(false);
  };

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
          <Button variant="primary" type="submit" loading={isLoading}>
            {t('confirmUploadFileLabel')}
          </Button>
          <Button
            variant="secondary"
            type="button"
            loading={isLoading}
            onClick={handleClickCancelButton}
          >
            {t('cancelUploadFileLabel')}
          </Button>
        </div>
      ) : (
        <Button variant="primary" type="button" onClick={handleClickButton}>
          {t('uploadFileLabel')}
        </Button>
      )}
      {errors?.image && (
        <span className="text-error block pt-4">
          {getValidationErrorMessage(messageGetter, errors?.image)}
        </span>
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
