interface CustomErrorConfig {
  message: string;
  status: number;
  details?: Record<string, string | string[]>;
}

class CustomError extends Error {
  public name: string;
  public status: number;
  public details: Record<string, string | string[]>;

  constructor({ message, status, details = {} }: CustomErrorConfig) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.details = details;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export default CustomError;
