import Title from '@/components/typography/Title/Title';

type CareerPropsType = {
  children: React.ReactNode;
};

const Career = ({ children }: CareerPropsType) => {
  return (
    <section id="career" className="min-h-screen py-[104px] lg:min-h-screen">
      <Title className="section-title" header="h2" copy="Career" />
      {children}
    </section>
  );
};

export default Career;
