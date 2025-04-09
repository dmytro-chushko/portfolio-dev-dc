import { StorageErrorType } from '../types/storage';

import CustomError from './CustomError';

class StorageError extends CustomError {
  constructor(storageResponse: StorageErrorType) {
    super({
      message: storageResponse.message,
      status: +storageResponse.statusCode,
      details: {
        error: storageResponse.error,
      },
    });
  }
}

export default StorageError;
