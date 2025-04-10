import { AnyObject, ObjectSchema, ValidationError } from 'yup';

import PayloadValidationError from '@/lib/errors/PayloadValidationError';

type ValidateReqBodyParams<T extends AnyObject> = {
  body: Record<string, unknown>;
  schema: ObjectSchema<T>;
};

export const validateReqBody = async <T extends AnyObject>({
  body,
  schema,
}: ValidateReqBodyParams<T>) => {
  try {
    return await schema.validate(body);
  } catch (err) {
    if (err instanceof ValidationError)
      throw new PayloadValidationError(err.errors);
    throw err;
  }
};
