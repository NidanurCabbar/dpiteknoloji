import { useState } from "react";
import { motion } from "motion/react";

// Yazısız DPI logo işareti - inline SVG (stilize edilmiş "d" formu)
function LogoMark({ className = "", color = "#ffffff" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      aria-hidden="true"
    >
      {/* Sol üst küçük blok */}
      <rect x="0" y="0" width="22" height="48" />
      {/* Sol alt küçük blok */}
      <rect x="0" y="60" width="22" height="60" />
      {/* Sağ büyük trapez blok */}
      <polygon points="34,0 100,12 100,120 34,120" />
    </svg>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  videoThumbnail: string;
}

export function ServiceCard({ title, description, videoThumbnail }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group w-full h-[260px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 rounded-lg shadow-lg overflow-hidden bg-white border border-gray-100 transition-shadow duration-500 ease-out group-hover:shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Mavi logo - hover'da sağdan kayarak gelir, yarısı dışarı taşar */}
          <LogoMark
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 h-[280px] w-auto translate-x-full opacity-0 transition-all duration-500 ease-out group-hover:translate-x-[28%] group-hover:opacity-100"
            color="#12487c"
          />

          {/* Başlık - sol tarafa hizalı, her zaman mavi ve net okunur */}
          <div className="relative z-10 h-full w-full flex items-center">
            <h3
              className="text-[18px] tracking-wide pl-8 pr-4 max-w-[70%] leading-snug"
              style={{ color: "#12487c" }}
            >
              {title}
            </h3>
          </div>

          {/* Sol kenar dekoratif çizgi - hover'da açılır */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-[#12487c] transition-all duration-500 ease-out group-hover:h-16" />
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#12487c] to-[#0a2f52] rounded-lg shadow-lg overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={videoThumbnail}
              alt={title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
              <h3 className="text-[16px] text-white mb-3 tracking-wide">{title}</h3>
              <p className="text-white/90 text-[12px] leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
