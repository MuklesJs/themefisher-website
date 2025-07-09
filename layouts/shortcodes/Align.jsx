const Align = ({ position, children }) => {
  return <div className={`text-${position}`}>{children}</div>;
};

export default Align;
