import { Toaster } from 'sonner';

import ErrorIcon from '@/components/icons/toastIcons/toastError.svg';
import SuccessIcon from '@/components/icons/toastIcons/toastSuccess.svg';

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: '!bg-foreground',
          title: '!text-background',
          closeButton: '!border-foreground',
        },
      }}
      icons={{
        error: <ErrorIcon />,
        success: <SuccessIcon />,
      }}
    />
  );
};

export default CustomToaster;
