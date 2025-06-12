import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/ui/Button/Button';
import { SetStateType } from '@/lib/types/SetStateType';

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

  const handleClickButton = () => inputRef?.current?.click();

  const handleClickCancelButton = () => {
    onChangePreview(initPhoto);
    setCreatedBlob('');
  };

  const handleClickConfirmButton = () => {};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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
    <form className="py-4">
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
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </form>
  );
};

export default ImageUploadForm;
