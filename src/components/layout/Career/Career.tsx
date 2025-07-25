type CareerPropsType = {
  children: React.ReactNode;
};

const Career = ({ children }: CareerPropsType) => {
  return (
    <section
      id="career"
      className="min-h-screen pt-[104px] lg:min-h-[calc(100vh-104px)]"
    >
      {children}
    </section>
  );
};

export default Career;
