import { LangType } from '@/lib/types/LangType';
import { getDictionary } from '@/lib/utils/getDictionary';

import { getPrismaErrorDetails } from './getPrismaErrorDetails';

type ServiceQueryType<T, U> = (arg: U) => Promise<T>;

export const dbQueryErrorHandler = <T, U>(
  serviceQuery: ServiceQueryType<T, U>,
  lang: LangType
) => {
  return async (arg: U) => {
    const dict = await getDictionary(lang);
    try {
      return await serviceQuery(arg);
    } catch (err) {
      throw new Error(
        `${dict.errors.db}: ${getPrismaErrorDetails(err).message}`
      );
    }
  };
};
