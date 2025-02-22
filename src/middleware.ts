import { stackMiddlewares } from './middlewares/stackMiddlewares';
import { withLocale } from './middlewares/withLocale';

const middlewares = [withLocale];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
