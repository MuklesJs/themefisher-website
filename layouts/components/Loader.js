import Image from "next/image";

export default function Loader() {
  return (
    <div className="mb-5">
      <Image
        height={100}
        width={100}
        alt="Loader"
        src={"/images/loader.svg"}
        priority
        className="mx-auto"
      />
    </div>
  );
}
