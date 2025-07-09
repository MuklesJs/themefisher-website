export default function Status({ status, type }) {
  return (
    <span
      className={`rounded-[20px] py-0.5 px-3 text-sm border ${
        type === "success"
          ? "bg-green-50 border-green-400 text-green-600"
          : type === "pending"
          ? "bg-yellow-50 border-yellow-400 text-yellow-600"
          : type === "error"
          ? "bg-red-50 border-red-400 text-red-600"
          : ""
      } `}
    >
      {status}
    </span>
  );
}
