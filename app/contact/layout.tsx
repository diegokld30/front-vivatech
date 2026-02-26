export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-0 pb-12">
      <div className="container mx-auto max-w-5xl px-6">{children}</div>
    </section>
  );
}
