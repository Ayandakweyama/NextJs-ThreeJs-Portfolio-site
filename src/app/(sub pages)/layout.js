export default function SubPagesLayout({ children }) {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl min-h-[75vh] px-5 py-10 sm:px-8 sm:py-14">
      {children}
    </main>
  );
}
