'use client';

import Button from '@/components/ui/Button/Button';

const SortingButton = ({ onClick }: { onClick: () => void }) => {
  return <Button onClick={onClick}>Change sorting</Button>;
};

export default SortingButton;
