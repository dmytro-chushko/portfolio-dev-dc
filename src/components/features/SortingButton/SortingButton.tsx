'use client';

import Button from '@/components/ui/Button/Button';

const SortingButton = ({ onClick }: { onClick: () => void }) => {
  return <Button onClick={onClick}>Sorting change</Button>;
};

export default SortingButton;
