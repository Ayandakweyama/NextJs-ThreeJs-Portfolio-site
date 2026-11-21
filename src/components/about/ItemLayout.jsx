import clsx from "clsx";

export default function ItemLayout({ children, className }) {
  return (
    <div className={clsx("min-w-0 rounded-2xl border border-white/15 bg-black/65 p-5 backdrop-blur-md sm:p-6", className)}>
      {children}
    </div>
  );
}
