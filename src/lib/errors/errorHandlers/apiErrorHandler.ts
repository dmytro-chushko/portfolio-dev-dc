// import type { RouteContext } from 'next/dist/server/future/route-modules/app-route/types';
import { NextRequest, NextResponse } from 'next/server';

import CustomError from '../CustomError';

// type RouteContextType = { params: { [key: string]: string } };

type RouteHandlerType<T> = (
  req: NextRequest
  // context: RouteContext
) => Promise<NextResponse<T>>;

export const apiErrorHandler = <T>(routeHandler: RouteHandlerType<T>) => {
  return async (
    req: NextRequest
    // context: RouteContext
  ) => {
    try {
      return await routeHandler(req);
    } catch (err) {
      if (err instanceof CustomError)
        return NextResponse.json(
          { ...err, message: err.message },
          { status: err.status }
        );

      console.error(
        err && typeof err === 'object' && 'name' in err && err.name
      );

      return NextResponse.json(
        {
          message:
            err && typeof err === 'object' && 'message' in err
              ? err.message
              : 'Internal server error',
          err,
        },
        { status: 500 }
      );
    }
  };
};
