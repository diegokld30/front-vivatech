export default function KitSolarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-10">
      <div className="w-full max-w-xl">{children}</div>
    </section>
  );
}
