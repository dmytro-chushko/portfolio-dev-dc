import PayloadValidationError from '../errors/PayloadValidationError';

export const getActionErrorMessage = (
  error: unknown
): Record<string, string> => {
  if (error instanceof PayloadValidationError) {
    return error.errorMessage
      ? error.errorMessage
      : { message: 'Internal server error' };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'Internal server error' };
};
