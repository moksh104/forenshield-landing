export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(47, 129, 247, 0.05), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
    </div>
  );
}
