import { AnyObject, ObjectSchema, ValidationError } from 'yup';

import PayloadValidationError from '@/lib/errors/PayloadValidationError';

type ValidateSearchParams<T extends AnyObject> = {
  searchParams: URLSearchParams;
  schema: ObjectSchema<T>;
};

export const validateSearchParams = async <T extends AnyObject>({
  searchParams,
  schema,
}: ValidateSearchParams<T>) => {
  try {
    const searchParamsObj: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    });

    return await schema.validate(searchParamsObj);
  } catch (err) {
    if (err instanceof ValidationError)
      throw new PayloadValidationError(err.errors);
    throw err;
  }
};
