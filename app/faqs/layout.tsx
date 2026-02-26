export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 pt-0 pb-8 md:pb-12">
      <div className="max-w-screen-lg w-full px-4">{children}</div>
    </section>
  );
}
