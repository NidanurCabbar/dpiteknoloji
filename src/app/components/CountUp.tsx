/**
 * Sayı animasyonu — viewport'a girdiğinde 0'dan hedef sayıya animasyonlu sayar.
 * Ana sayfa istatistik bölümünde kullanılır.
 */
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
}

export function CountUp({ end, suffix = "", duration = 2, label, sublabel }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="text-[56px] leading-none mb-2"
        style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
      >
        {count}
        <span style={{ color: "var(--dpi-accent)" }}>{suffix}</span>
      </div>
      <p className="text-gray-700 text-[16px] font-medium">{label}</p>
      {sublabel && <p className="text-gray-400 text-[13px] mt-1">{sublabel}</p>}
    </motion.div>
  );
}
