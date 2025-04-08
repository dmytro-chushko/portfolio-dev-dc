export type StorageError = {
  statusCode: string;
  error: string;
  message: string;
};

export const storageErrorTypeGuard = (obj: unknown): obj is StorageError => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'statusCode' in obj &&
    typeof (obj as { statusCode: unknown }).statusCode === 'string' &&
    'error' in obj &&
    typeof (obj as { error: unknown }).error === 'string' &&
    'message' in obj &&
    typeof (obj as { message: unknown }).message === 'string'
  );
};
