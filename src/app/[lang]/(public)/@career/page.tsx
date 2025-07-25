import CareerList from '@/components/features/CareerList/CareerList';
import Career from '@/components/layout/Career/Career';

export default function CareerSlot() {
  return (
    <Career>
      <CareerList careers={[]} />
    </Career>
  );
}
