export default function Badge({ badge, type }) {
  return (
    <span
      className={`rounded py-1 px-3 text-sm ${
        type === "success"
          ? "bg-green-50 text-green-600"
          : type === "primary"
            ? "bg-primary/10  text-primary"
            : type === "pending"
              ? "bg-yellow-50  text-yellow-600"
              : type === "error"
                ? "bg-red-50  text-red-600"
                : ""
      } `}
    >
      {badge}
    </span>
  );
}
