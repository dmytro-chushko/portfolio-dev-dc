import { SVGProps, JSX } from 'react';

import AmazonAwsTechIcon from '@/components/icons/tech/amazonaws.svg';
import CssTechIcon from '@/components/icons/tech/css3.svg';
import DockerTechIcon from '@/components/icons/tech/docker.svg';
import ExpressTechIcon from '@/components/icons/tech/express.svg';
import FigmaTechIcon from '@/components/icons/tech/figma.svg';
import GatsbyTechIcon from '@/components/icons/tech/gatsby.svg';
import GithubTechIcon from '@/components/icons/tech/github.svg';
import GraphqlTechIcon from '@/components/icons/tech/graphql.svg';
import HerokuTechIcon from '@/components/icons/tech/heroku.svg';
import HtmlTechIcon from '@/components/icons/tech/html5.svg';
import MeteorTechIcon from '@/components/icons/tech/meteor.svg';
import MongoTechIcon from '@/components/icons/tech/mongodb.svg';
import MongooseTechIcon from '@/components/icons/tech/mongoose.svg';
import MysqlTechIcon from '@/components/icons/tech/mysql.svg';
import NestTechIcon from '@/components/icons/tech/nest.svg';
import NetlifyTechIcon from '@/components/icons/tech/netlify.svg';
import NextTechIcon from '@/components/icons/tech/next-dot-js.svg';
import NodeTechIcon from '@/components/icons/tech/node-dot-js.svg';
import PostgresqlTechIcon from '@/components/icons/tech/postgresql.svg';
import PostmanTechIcon from '@/components/icons/tech/postman.svg';
import PrismaOrmTechIcon from '@/components/icons/tech/prismaorm.svg';
import ReactTechIcon from '@/components/icons/tech/react.svg';
import ReduxTechIcon from '@/components/icons/tech/redux.svg';
import RemixTechIcon from '@/components/icons/tech/remix.svg';
import SassTechIcon from '@/components/icons/tech/sass.svg';
import ShopifyTechIcon from '@/components/icons/tech/shopify.svg';
import StorybookTechIcon from '@/components/icons/tech/storybook.svg';
import StyledComponentsTechIcon from '@/components/icons/tech/styled-components.svg';
import SwaggerTechIcon from '@/components/icons/tech/swagger.svg';
import Tailwind from '@/components/icons/tech/tailwind.svg';
import TypeOrmTechIcon from '@/components/icons/tech/typeorm-seeklogo.svg';
import TypeScriptTechIcon from '@/components/icons/tech/typescript.svg';
import VercelTechIcon from '@/components/icons/tech/vercel.svg';

const techIconMap = {
  gatsby: { icon: GatsbyTechIcon, title: 'Gatsby.js' },
  typescript: {
    icon: TypeScriptTechIcon,
    title: 'TypeScript',
  },
  next: {
    icon: NextTechIcon,
    title: 'Next.js',
  },
  css: {
    icon: CssTechIcon,
    title: 'CSS 3',
  },
  html: {
    icon: HtmlTechIcon,
    title: 'HTML 5',
  },
  meteor: {
    icon: MeteorTechIcon,
    title: 'Meteor.js',
  },
  graphql: {
    icon: GraphqlTechIcon,
    title: 'GraphQL',
  },
  mongodb: {
    icon: MongoTechIcon,
    title: 'Mongo DB',
  },
  mysql: {
    icon: MysqlTechIcon,
    title: 'My SQL',
  },
  postgresql: {
    icon: PostgresqlTechIcon,
    title: 'PostgreSQL',
  },
  react: {
    icon: ReactTechIcon,
    title: 'React.js',
  },
  redux: {
    icon: ReduxTechIcon,
    title: 'Redux ToolKit',
  },
  sass: {
    icon: SassTechIcon,
    title: 'SASS',
  },
  shopify: {
    icon: ShopifyTechIcon,
    title: 'Shopify',
  },
  styledcomponents: {
    icon: StyledComponentsTechIcon,
    title: 'Styled Components',
  },
  node: {
    icon: NodeTechIcon,
    title: 'Node.js',
  },
  netlify: {
    icon: NetlifyTechIcon,
    title: 'Netlify',
  },
  amazonaws: {
    icon: AmazonAwsTechIcon,
    title: 'Amazon AWS',
  },
  heroku: {
    icon: HerokuTechIcon,
    title: 'Heroku',
  },
  typeorm: {
    icon: TypeOrmTechIcon,
    title: 'Type ORM',
  },
  mongoose: {
    icon: MongooseTechIcon,
    title: 'Mongoose.js',
  },
  prismaorm: {
    icon: PrismaOrmTechIcon,
    title: 'Prisma ORM',
  },
  nest: {
    icon: NestTechIcon,
    title: 'Nest.js',
  },
  express: {
    icon: ExpressTechIcon,
    title: 'Express.js',
  },
  vercel: {
    icon: VercelTechIcon,
    title: 'Vercel',
  },
  remixjs: {
    icon: RemixTechIcon,
    title: 'Remix.js',
  },
  tailwind: {
    icon: Tailwind,
    title: 'Tailwind CSS',
  },
  docker: {
    icon: DockerTechIcon,
    title: 'Docker',
  },
  postman: {
    icon: PostmanTechIcon,
    title: 'Postman',
  },
  figma: {
    icon: FigmaTechIcon,
    title: 'Figma',
  },
  swagger: {
    icon: SwaggerTechIcon,
    title: 'Swagger',
  },
  github: {
    icon: GithubTechIcon,
    title: 'GitHub',
  },
  storybook: {
    icon: StorybookTechIcon,
    title: 'Storybook',
  },
} satisfies Record<
  string,
  {
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    title: string;
  }
>;

export default techIconMap;
