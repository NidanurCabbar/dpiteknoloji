import { useState } from "react";
import { motion } from "motion/react";

interface ServiceCardProps {
  title: string;
  description: string;
  videoThumbnail: string;
}

export function ServiceCard({ title, description, videoThumbnail }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-[320px] cursor-pointer perspective-1000"
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
          className="absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-[32px] tracking-wide" style={{ color: "#12487c" }}>
            {title}
          </h3>
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
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <h3 className="text-[28px] text-white mb-6 tracking-wide">{title}</h3>
              <p className="text-white/90 text-[16px] leading-relaxed max-w-[800px]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
