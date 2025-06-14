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
    trigger,
    watch,
    // handleSubmit,
    formState: { errors },
  } = useForm<{ image: FileList }>({
    resolver: yupResolver(fileSchema),
    defaultValues: { image: undefined },
  });

  const { onChange, onBlur, name, ref } = register('image');
  const uploadedFile = watch('image');

  const handleClickButton = () => inputRef?.current?.click();

  const handleClickCancelButton = () => {
    onChangePreview(initPhoto);
    setCreatedBlob('');
  };

  const handleClickConfirmButton = () => {};

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
    <form
      className="py-4"
      // onSubmit={handleSubmit(handleFileChange)}
    >
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
