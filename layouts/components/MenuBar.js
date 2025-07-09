import Image from "next/image";

export default function MenuBar({
  label,
  menus,
  fillerData,
  name,
  setFillerData,
}) {
  return (
    <div>
      <h3 className="text-lg px-8 relative hidden lg:block after:bg-primary after:absolute after:h-[3px] after:w-10 after:bottom-0 after:left-8 pb-2 after:rounded-full">
        {label}
      </h3>
      {menus.length > 0 && (
        <ul className="mt-4">
          {menus.map((item, i) => {
            const isActive = fillerData[name] === item.value;
            return (
              <li
                key={i}
                className={`flex items-center cursor-pointer gap-2 py-2 px-8 ${isActive ? "bg-primary/10 text-primary" : "text-[#405460]"}`}
                onClick={() => {
                  setFillerData({
                    ...fillerData,
                    [name]: isActive ? "all" : item.value,
                  });
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                />
                <span className="text-[16px] font-medium capitalize">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
