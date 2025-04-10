import { NextRequest, NextResponse } from 'next/server';

import CustomError from '../CustomError';

type RouteContextType = { params: { [key: string]: string } };

type RouteHandlerType<T> = (
  req: NextRequest,
  context?: RouteContextType
) => Promise<NextResponse<T>>;

export const apiErrorHandler = <T>(routeHandler: RouteHandlerType<T>) => {
  return async (req: NextRequest, context?: RouteContextType) => {
    try {
      return await routeHandler(req, context);
    } catch (err) {
      if (err instanceof CustomError)
        return NextResponse.json(
          { ...err, message: err.message },
          { status: err.status }
        );

      console.error(err);

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
