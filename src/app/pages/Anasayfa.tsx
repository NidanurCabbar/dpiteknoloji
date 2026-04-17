import { ServiceCard } from "../components/ServiceCard";
import { CountUp } from "../components/CountUp";
import { FadeIn } from "../components/FadeIn";
import { TechPattern } from "../components/TechPattern";
import { useRef, useEffect } from "react";
import { useSiteContent } from "../contexts/SiteContentContext";

export function Anasayfa() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { content, heroVideoSrc } = useSiteContent();
  const { heroTitle, heroDescription } = content.anasayfa;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [heroVideoSrc]);

  const services = [
    {
      title: "PROFESYONEL LED EKRAN SİSTEMLERİ",
      description:
        "DPI TEKNOLOJİ olarak, stadyumlardan açık hava etkinliklerine, ticari mekânlardan konser alanlarına kadar her ölçekte LED ekran kurulumu gerçekleştiriyoruz. Yüksek çözünürlük, dayanıklılık ve etkileyici görüntü kalitesi ile projelerinize değer katıyoruz.",
      videoThumbnail: "https://images.unsplash.com/photo-1767582008091-e688acfeace9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMExFRCUyMHNjcmVlbiUyMGRpc3BsYXklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3NTU2NjkzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "PROFESYONEL SES, IŞIK VE GÖRÜNTÜ SİSTEMİ",
      description:
        "Konserler, konferanslar, toplantılar ve etkinlikler için profesyonel düzeyde ses sistemleri kuruyoruz. Akustik analiz, ses tasarımı ve teknik destek ile mükemmel ses deneyimi sunuyoruz. Her mekan için özel çözümler üretiyoruz.",
      videoThumbnail: "https://images.unsplash.com/photo-1763420952993-23a57c37c2ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBhdWRpbyUyMHNvdW5kJTIwc3lzdGVtJTIwY29uY2VydHxlbnwxfHx8fDE3NzU1NjY5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "ZAYIF AKIM SİSTEMLERİ",
      description:
        "Mimari aydınlatma, sahne ışıklandırması ve etkinlik ışık sistemleri konusunda uzman ekibimizle hizmet veriyoruz. Estetik ve fonksiyonel ışık tasarımları ile mekanlarınızı dönüştürüyor, etkinliklerinize görsel zenginlik katıyoruz.",
      videoThumbnail: "https://images.unsplash.com/photo-1758939563815-208625d3e7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwbGlnaHRpbmclMjBkZXNpZ24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzU1NjY5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative w-full aspect-video min-h-[500px] flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src={heroVideoSrc}
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }}
          />
          {/* Alt gradient — video ile alt section arasında yumuşak geçiş */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[160px]"
            style={{ background: "linear-gradient(to top, #f9fafb, transparent)" }}
          />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-12 pt-12 text-center">
          <FadeIn direction="up" delay={0.2}>
            <h1
              className="text-[56px] mb-6 tracking-tight text-white"
              style={{
                fontFamily: "var(--font-family-heading)",
                textShadow: "0 2px 16px rgba(0,0,0,0.55)",
              }}
            >
              {heroTitle.includes("Güvenilirlik")
                ? <>
                    {heroTitle.split("Güvenilirlik")[0]}
                    <span style={{ color: "var(--dpi-accent-light)" }}>Güvenilirlik</span>
                    {heroTitle.split("Güvenilirlik")[1]}
                  </>
                : heroTitle
              }
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <p
              className="text-[20px] text-white max-w-[800px] mx-auto leading-relaxed"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              {heroDescription}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="relative py-24 bg-gray-50">
        <TechPattern variant="light" />
        <div className="relative max-w-[1200px] mx-auto px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <p
                className="text-[14px] font-semibold tracking-[3px] uppercase mb-3"
                style={{ color: "var(--dpi-accent)" }}
              >
                Neler Yapıyoruz
              </p>
              <h2
                className="text-[42px] mb-4"
                style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
              >
                Hizmetlerimiz
              </h2>
              <p className="text-gray-500 text-[17px]">
                Kartlara tıklayarak detaylı bilgi alabilirsiniz
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "var(--dpi-blue)" }}>
        <TechPattern variant="dark" />
        <div className="relative max-w-[1200px] mx-auto px-12">
          <FadeIn>
            <p
              className="text-center text-[14px] font-semibold tracking-[3px] uppercase mb-3"
              style={{ color: "var(--dpi-accent-light)" }}
            >
              Rakamlarla DPI
            </p>
            <h2
              className="text-[36px] text-center text-white mb-16"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              Güvenin Somut Kanıtları
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <CountUp end={500} suffix="+" label="Tamamlanan Proje" />
            <CountUp end={15} suffix="+" label="Yıllık Deneyim" />
            <CountUp end={200} suffix="+" label="Kurumsal Müşteri" />
          </div>
        </div>
      </section>

      {/* CTA Section — Teknik Danışmanlık */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--dpi-blue) 0%, var(--dpi-blue-dark) 100%)" }}
      >
        <TechPattern variant="dark" />
        <div className="relative max-w-[1200px] mx-auto px-12 text-center">
          <FadeIn>
            <h2
              className="text-[42px] text-white mb-6"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              Projeniz için <span style={{ color: "var(--dpi-accent-light)" }}>Teknik Danışmanlık</span>
            </h2>
            <p className="text-white/80 text-[18px] mb-10 max-w-[700px] mx-auto">
              Deneyimli ekibimiz, projenizin ihtiyaçlarını analiz ederek size özel çözümler sunar
            </p>
            <a
              href="/iletisim"
              style={{
                display: "inline-block",
                backgroundColor: "var(--dpi-accent)",
                color: "#ffffff",
                fontFamily: "var(--font-family-heading)",
                fontWeight: 600,
                fontSize: 16,
                padding: "14px 36px",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(232,134,12,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,134,12,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,134,12,0.3)";
              }}
            >
              İletişime Geçin
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
