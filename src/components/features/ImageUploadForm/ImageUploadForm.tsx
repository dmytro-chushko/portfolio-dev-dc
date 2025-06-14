import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
    // trigger,
    // watch,
    // handleSubmit,
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

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // const result = await trigger('image');
    // console.log(result);

    if (file) {
      const url = URL.createObjectURL(file);
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
        {...(register('image'), { onChange: handleFileChange })}
        ref={inputRef}
        type="file"
        accept="image/*"
        // onChange={(e) => {
        //   register('image').onChange(e);
        //   // handleSubmit(handleFileChange)();
        // }}
      />
    </form>
  );
};

export default ImageUploadForm;
