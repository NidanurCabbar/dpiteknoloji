/**
 * LED nokta matris deseni — section arka planlarında dekoratif olarak kullanılır.
 * DPI'nın LED ekran uzmanlığını çağrıştıran özgün bir grafiksel eleman.
 */
export function LedGrid({
  color = "rgba(18,72,124,0.06)",
  dotSize = 3,
  gap = 28,
  className = "",
}: {
  color?: string;
  dotSize?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  );
}
