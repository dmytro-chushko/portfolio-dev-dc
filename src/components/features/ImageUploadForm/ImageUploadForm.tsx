import { useRef } from 'react';

import Button from '@/components/ui/Button/Button';

type ImageUploadFormProps = {
  heroUploadLabel: string;
};

const ImageUploadForm = ({ heroUploadLabel }: ImageUploadFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickButton = () => inputRef?.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    alert(file?.name);
  };

  return (
    <form className="p-4">
      <Button variant="primary" type="button" onClick={handleClickButton}>
        {heroUploadLabel}
      </Button>
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
