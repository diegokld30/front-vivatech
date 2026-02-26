export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center pt-0 pb-8 md:pb-12">
      <div className="w-full max-w-screen-xl px-4">{children}</div>
    </section>
  );
}
