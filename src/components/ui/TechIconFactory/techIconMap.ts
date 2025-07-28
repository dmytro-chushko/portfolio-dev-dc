import GatsbyTechIcon from '@/components/icons/tech/gatsby.svg';
import TypeScriptTechIcon from '@/components/icons/tech/typescript.svg';

const techIconMap = {
  gatsby: GatsbyTechIcon,
  typescript: TypeScriptTechIcon,
} satisfies Record<
  string,
  (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
>;

export default techIconMap;
