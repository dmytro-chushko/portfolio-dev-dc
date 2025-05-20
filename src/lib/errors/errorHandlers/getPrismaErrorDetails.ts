export interface PrismaErrorDetails {
  code?: string;
  message: string;
  meta?: unknown;
}

export function getPrismaErrorDetails(error: unknown): PrismaErrorDetails {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    const code =
      'code' in error && typeof error.code === 'string'
        ? error.code
        : undefined;
    const meta = 'meta' in error ? error.meta : undefined;

    return {
      code,
      message: error.message,
      meta,
    };
  }

  return {
    message: 'Unknown error',
  };
}
