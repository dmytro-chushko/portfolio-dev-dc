import { AnyObject, ObjectSchema, ValidationError } from 'yup';

type ValidateFormDateParams<T extends AnyObject> = {
  formData: FormData;
  schema: ObjectSchema<T>;
};

export const validateFormData = async <T extends AnyObject>({
  formData,
  schema,
}: ValidateFormDateParams<T>) => {
  try {
    const formDataObj: Record<string, FormDataEntryValue> = {};

    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    return await schema.validate(formDataObj);
  } catch (err) {
    if (err instanceof ValidationError) throw err;
    throw err;
  }
};
