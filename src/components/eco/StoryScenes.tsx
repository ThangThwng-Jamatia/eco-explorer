import { cn } from "@/lib/utils";

type SceneProps = {
  className?: string | undefined;
};

/** Shared 3D stage: perspective wrapper + floor shadow, so every scene sits with real depth. */
function Stage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn("scene-stage relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72", className)}
      style={{ perspective: "900px" }}
    >
      <div className="scene-tilt relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
      <div
        className="scene-floor-shadow absolute bottom-2 left-1/2 h-6 w-32 -translate-x-1/2 rounded-[100%] bg-forest/25 blur-md sm:w-40"
        aria-hidden
      />
    </div>
  );
}

export function SunScene({ className }: SceneProps) {
  return (
    <Stage className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl" style={{ transform: "translateZ(40px)" }}>
        <defs>
          <radialGradient id="sunCore" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fff6cf" />
            <stop offset="55%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </radialGradient>
          <filter id="sunGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="scene-glow" filter="url(#sunGlow)">
          <circle cx="100" cy="100" r="46" fill="url(#sunCore)" />
        </g>
        <g className="scene-rays" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const round = (n: number) => Math.round(n * 100) / 100;
            const x1 = round(100 + Math.cos(angle) * 62);
            const y1 = round(100 + Math.sin(angle) * 62);
            const x2 = round(100 + Math.cos(angle) * 82);
            const y2 = round(100 + Math.sin(angle) * 82);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      </svg>
    </Stage>
  );
}

export function SolarPanelScene({ className }: SceneProps) {
  return (
    <Stage className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl" style={{ transform: "translateZ(40px) rotateX(8deg)" }}>
        <defs>
          <linearGradient id="panelFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0d3d1f" />
          </linearGradient>
          <filter id="panelGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* stand */}
        <rect x="92" y="140" width="16" height="45" rx="4" fill="#6b8e6f" />
        {/* panel body, tilted like a real rooftop panel */}
        <g transform="translate(100 110) rotate(-8) translate(-100 -110)">
          <rect x="35" y="80" width="130" height="70" rx="8" fill="url(#panelFace)" stroke="#166534" strokeWidth="3" />
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                className="scene-cell"
                x={42 + c * 30}
                y={87 + r * 20}
                width="26"
                height="16"
                rx="2"
                fill="#22c55e"
                fillOpacity="0.35"
                filter="url(#panelGlow)"
              />
            )),
          )}
        </g>
      </svg>
    </Stage>
  );
}

export function RainwaterScene({ className }: SceneProps) {
  return (
    <Stage className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl" style={{ transform: "translateZ(40px)" }}>
        <defs>
          <linearGradient id="tankBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <clipPath id="tankClip">
            <rect x="70" y="70" width="60" height="95" rx="10" />
          </clipPath>
        </defs>
        {/* cloud */}
        <g fill="#e0f2fe" stroke="#93c5fd" strokeWidth="1.5">
          <ellipse cx="90" cy="35" rx="26" ry="16" />
          <ellipse cx="115" cy="30" rx="22" ry="17" />
          <ellipse cx="135" cy="38" rx="18" ry="13" />
        </g>
        {/* rain drops */}
        <g className="scene-rain" fill="#38bdf8">
          <path d="M85 55 q4 10 0 16 a4 4 0 1 1 -1 0 q-3 -6 1 -16" />
          <path d="M105 58 q4 10 0 16 a4 4 0 1 1 -1 0 q-3 -6 1 -16" />
          <path d="M125 55 q4 10 0 16 a4 4 0 1 1 -1 0 q-3 -6 1 -16" />
        </g>
        {/* storage tank */}
        <rect x="70" y="70" width="60" height="95" rx="10" fill="#f0f9ff" stroke="#0369a1" strokeWidth="3" />
        <g clipPath="url(#tankClip)">
          <rect className="scene-water-fill" x="70" y="140" width="60" height="60" fill="url(#tankBody)" />
        </g>
        <rect x="70" y="70" width="60" height="95" rx="10" fill="none" stroke="#0369a1" strokeWidth="3" />
      </svg>
    </Stage>
  );
}

export function WasteScene({ className }: SceneProps) {
  const bins = [
    { x: 40, color: "#22c55e", label: "recycle" },
    { x: 85, color: "#f59e0b", label: "compost" },
    { x: 130, color: "#64748b", label: "waste" },
  ];
  return (
    <Stage className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl" style={{ transform: "translateZ(40px)" }}>
        <defs>
          <filter id="binGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {bins.map((bin, i) => (
          <g key={bin.label} className="scene-bin" style={{ transformOrigin: `${bin.x + 15}px 160px`, animationDelay: `${i * 0.15}s` }}>
            <rect x={bin.x} y={100} width="30" height="60" rx="6" fill={bin.color} fillOpacity="0.85" />
            <rect x={bin.x - 3} y={92} width="36" height="10" rx="4" fill={bin.color} />
            <rect
              className="scene-bin-glow"
              x={bin.x - 4}
              y={91}
              width="38"
              height="12"
              rx="5"
              fill={bin.color}
              filter="url(#binGlow)"
              opacity="0"
            />
          </g>
        ))}
      </svg>
    </Stage>
  );
}

export function ShopScene({ className }: SceneProps) {
  return (
    <Stage className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl" style={{ transform: "translateZ(40px)" }}>
        <defs>
          <filter id="windowGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* roof */}
        <path d="M30 90 L100 45 L170 90 Z" fill="#166534" />
        {/* solar strip on roof */}
        <rect x="105" y="65" width="45" height="16" rx="2" fill="#0d3d1f" transform="rotate(-10 127 73)" />
        {/* walls */}
        <rect x="40" y="90" width="120" height="80" fill="#86efac" />
        {/* door */}
        <rect x="88" y="130" width="24" height="40" rx="3" fill="#166534" />
        {/* windows, glowing warm */}
        <rect className="scene-window" x="55" y="105" width="22" height="22" rx="3" fill="#fef3c7" filter="url(#windowGlow)" />
        <rect className="scene-window" x="123" y="105" width="22" height="22" rx="3" fill="#fef3c7" filter="url(#windowGlow)" style={{ animationDelay: "0.3s" }} />
      </svg>
    </Stage>
  );
}
