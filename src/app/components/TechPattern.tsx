/**
 * Devre kartı / ağ topolojisi deseni — birbirine bağlı düğümler ve çizgiler.
 * Düğümler yavaşça parlayıp söner (glow/pulse efekti).
 * Sadece düz renkli section'larda kullanılır, görsel/video üzerinde KULLANILMAZ.
 */

interface TechPatternProps {
  variant?: "light" | "dark";
}

// Sabit düğüm pozisyonları (% cinsinden)
const nodes = [
  { x: 8, y: 12 },
  { x: 25, y: 8 },
  { x: 45, y: 18 },
  { x: 72, y: 10 },
  { x: 90, y: 22 },
  { x: 15, y: 40 },
  { x: 38, y: 45 },
  { x: 60, y: 38 },
  { x: 82, y: 48 },
  { x: 5, y: 70 },
  { x: 28, y: 72 },
  { x: 50, y: 65 },
  { x: 70, y: 75 },
  { x: 92, y: 68 },
  { x: 18, y: 90 },
  { x: 42, y: 88 },
  { x: 65, y: 92 },
  { x: 85, y: 85 },
];

// Hangi düğümler birbirine bağlı (index çiftleri)
const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [1, 6], [2, 7], [3, 8],
  [5, 6], [6, 7], [7, 8],
  [5, 9], [6, 10], [7, 11], [8, 13],
  [9, 10], [10, 11], [11, 12], [12, 13],
  [10, 14], [11, 15], [12, 16], [13, 17],
  [14, 15], [15, 16], [16, 17],
  [2, 6], [6, 11], [7, 12],
];

export function TechPattern({ variant = "light" }: TechPatternProps) {
  const isLight = variant === "light";
  const lineColor = isLight ? "rgba(18,72,124,0.06)" : "rgba(255,255,255,0.06)";
  const nodeColor = isLight ? "rgba(18,72,124,0.12)" : "rgba(255,255,255,0.10)";
  const glowColor = isLight ? "rgba(18,72,124,0.25)" : "rgba(140,200,255,0.20)";
  const coreColor = isLight ? "rgba(18,72,124,0.35)" : "rgba(180,220,255,0.30)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filtresi */}
          <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bağlantı çizgileri */}
        {connections.map(([a, b], i) => (
          <line
            key={`line-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={lineColor}
            strokeWidth="0.15"
          >
            {/* Çizgide hafif parlaklık dalgası */}
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur={`${6 + (i % 5) * 2}s`}
              begin={`${(i * 0.7) % 8}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Düğümler */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`} filter="url(#nodeGlow)">
            {/* Dış glow halkası — parlayıp söner */}
            <circle
              cx={node.x}
              cy={node.y}
              r="0.9"
              fill="none"
              stroke={glowColor}
              strokeWidth="0.12"
            >
              <animate
                attributeName="r"
                values="0.6;1.2;0.6"
                dur={`${4 + (i % 4) * 1.5}s`}
                begin={`${(i * 0.5) % 6}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={`${4 + (i % 4) * 1.5}s`}
                begin={`${(i * 0.5) % 6}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Merkez nokta (küçük kare — devre hissi) */}
            <rect
              x={node.x - 0.35}
              y={node.y - 0.35}
              width="0.7"
              height="0.7"
              fill={nodeColor}
              rx="0.1"
            >
              <animate
                attributeName="fill"
                values={`${nodeColor};${coreColor};${nodeColor}`}
                dur={`${3 + (i % 5) * 1.2}s`}
                begin={`${(i * 0.8) % 7}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}
      </svg>
    </div>
  );
}
