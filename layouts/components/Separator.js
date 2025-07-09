const Separator = () => {
  return (
    <div className="relative mb-3.5 py-3.5">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium leading-none text-text-light bg-white px-2">
        Or
      </span>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 h-[1px] w-full bg-gray-100"
      />
    </div>
  );
};

export default Separator;
