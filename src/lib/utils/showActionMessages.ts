import { toast } from 'sonner';

type ActionMessagesPropsType = {
  successMessage?: string;
  errorMessage?: Record<string, string>;
};

const showActionMessages = ({
  successMessage,
  errorMessage,
}: ActionMessagesPropsType): void => {
  if (successMessage) {
    toast.success(successMessage, { closeButton: true });
  }

  if (errorMessage) {
    if (errorMessage.message) {
      toast.error(errorMessage.message, {
        closeButton: true,
      });
    } else {
      Object.values(errorMessage).forEach((message) =>
        toast.error(message, {
          closeButton: true,
        })
      );
    }
  }
};

export default showActionMessages;
