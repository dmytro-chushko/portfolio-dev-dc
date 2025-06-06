import CustomError from './CustomError';

class PayloadValidationError extends CustomError {
  public errorMessage?: Record<string, string>;

  constructor(
    errors: string | string[],
    validationErrors?: Record<string, string>
  ) {
    super({
      message: 'Bad Request',
      status: 400,
      details: { errors },
    });
    this.name = this.constructor.name;
    this.errorMessage = validationErrors;
  }
}

export default PayloadValidationError;
