const Mockup = ({ src, alt, height, width }) => {
  return (
    <div className="browser-mockup mt-8 mb-12">
      <img
        src={src}
        alt={alt}
        height={height ? height : "600"}
        width={width ? width : "900"}
        className="my-0"
      />
    </div>
  );
};

export default Mockup;
