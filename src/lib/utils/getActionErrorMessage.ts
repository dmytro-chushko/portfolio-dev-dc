import PayloadValidationError from '../errors/PayloadValidationError';
import StorageError from '../errors/StorageError';

export const getActionErrorMessage = (
  error: unknown
): Record<string, string> => {
  if (error instanceof PayloadValidationError) {
    return error.errorMessage
      ? error.errorMessage
      : { message: 'Internal server error' };
  }

  if (error instanceof Error || error instanceof StorageError) {
    return { message: error.message };
  }

  return { message: 'Internal server error' };
};
