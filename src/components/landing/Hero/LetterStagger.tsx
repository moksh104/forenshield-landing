export function LetterStagger({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) {
  return (
    <>
      {children.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block opacity-0"
          style={{
            animation: `fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards`,
            animationDelay: `${delay + i * 24}ms`,
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch}
        </span>
      ))}
    </>
  );
}
