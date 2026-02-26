export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-0 pb-12">
      <div className="container mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}
