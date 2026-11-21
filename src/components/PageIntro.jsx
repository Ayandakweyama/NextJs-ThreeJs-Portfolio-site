import MotionHeading from "./MotionHeading";

export default function PageIntro({ title, description }) {
  return (
    <header className="mb-8 max-w-2xl sm:mb-10">
      <MotionHeading className="text-4xl font-semibold tracking-tight sm:text-6xl">{title}</MotionHeading>
      <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
    </header>
  );
}
