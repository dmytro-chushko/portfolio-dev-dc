interface CustomErrorConfig {
  message: string;
  status: number;
  details?: Record<string, string>;
}

class CustomError extends Error {
  public status: number;
  public details: Record<string, string>;

  constructor({ message, status, details = {} }: CustomErrorConfig) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export default CustomError;
