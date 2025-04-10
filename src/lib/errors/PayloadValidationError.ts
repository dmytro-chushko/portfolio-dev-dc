import CustomError from './CustomError';

class PayloadValidationError extends CustomError {
  constructor(errors: string | string[]) {
    super({
      message: 'Bad Request',
      status: 400,
      details: { errors },
    });
    this.name = this.constructor.name;
  }
}

export default PayloadValidationError;
