import techIconMap from '@/components/ui/TechIconFactory/techIconMap';

import { TechIconKey } from '../types/TechIconKey';

function isTechIconKey(value: string): value is TechIconKey {
  return value in techIconMap;
}

export default isTechIconKey;
