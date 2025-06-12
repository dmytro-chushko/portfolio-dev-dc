import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button/Button';
import { SetStateType } from '@/lib/types/SetStateType';
import { getValidationErrorMessage } from '@/lib/utils/getValidationErrorMessage';
import { fileSchema } from '@/lib/validation/formSchema/imageUploadForm';

type ImageUploadFormProps = {
  initPhoto: string;
  onChangePreview: SetStateType<string>;
};

const ImageUploadForm = ({
  initPhoto,
  onChangePreview,
}: ImageUploadFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [createdBlob, setCreatedBlob] = useState<string>('');
  const t = useTranslations('dashboard.hero_item');
  const messageGetter = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ image: File }>({
    resolver: yupResolver(fileSchema),
    defaultValues: { image: undefined },
  });

  const handleClickButton = () => inputRef?.current?.click();

  const handleClickCancelButton = () => {
    onChangePreview(initPhoto);
    setCreatedBlob('');
  };

  const handleClickConfirmButton = () => {};

  const handleFileChange = ({ image }: { image: File }) => {
    if (image) {
      const url = URL.createObjectURL(image);
      onChangePreview(url);
      setCreatedBlob(url);
    }
  };

  useEffect(() => {
    if (createdBlob) {
      return () => URL.revokeObjectURL(createdBlob);
    }
  }, [createdBlob]);

  return (
    <form className="py-4" onSubmit={handleSubmit(handleFileChange)}>
      {createdBlob ? (
        <div>
          <Button
            variant="primary"
            type="button"
            onClick={handleClickConfirmButton}
          >
            {t('confirmUploadFileLabel')}
          </Button>
          <Button
            variant="secondary"
            type="button"
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
      <span>{getValidationErrorMessage(messageGetter, errors?.image)}</span>
      <input
        className="hidden"
        {...register('image')}
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          register('image').onChange(e);
          handleSubmit(handleFileChange)();
        }}
      />
    </form>
  );
};

export default ImageUploadForm;
