const HeroLayout = ({
  children,
  heroList,
}: {
  children: React.ReactNode;
  heroList: React.ReactNode;
}) => {
  return (
    <>
      <div className="mb-4">{children}</div>
      {heroList}
    </>
  );
};

export default HeroLayout;
