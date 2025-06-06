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
    return await schema.validate(body, { abortEarly: false });
  } catch (err) {
    if (err instanceof ValidationError) {
      const validationErrors = err.inner.reduce((acc, item) => {
        if (item.path) return { ...acc, [item.path]: item.errors.join(', ') };

        return acc;
      }, {});

      throw new PayloadValidationError(err.errors, validationErrors);
    }

    throw err;
  }
};
