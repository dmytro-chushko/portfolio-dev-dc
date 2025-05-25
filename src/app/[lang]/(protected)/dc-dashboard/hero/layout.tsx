const HeroLayout = ({
  children,
  heroList,
}: {
  children: React.ReactNode;
  heroList: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {heroList}
    </>
  );
};

export default HeroLayout;
