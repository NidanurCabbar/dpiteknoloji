import { ServiceCard } from "../components/ServiceCard";
import { useRef, useEffect } from "react";
import bgVideo from "../../imports/led_ekran_aydınlatma.mp4";

export function Anasayfa() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

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
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            src={bgVideo}
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }}
          />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-12 text-center">
          <h1 className="text-[56px] mb-6 tracking-tight" style={{ color: "#12487c" }}>
            Teknoloji ve Güvenilirlik
          </h1>
          <p className="text-[20px] text-gray-600 max-w-[800px] mx-auto leading-relaxed">
            DPI TEKNOLOJİ, büyük ölçekli LED ekran, profesyonel ses ve ışıklandırma sistemleri
            konusunda kurumsal çözümler sunan lider teknoloji şirketidir.
          </p>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="text-center mb-16">
            <h2 className="text-[42px] mb-4" style={{ color: "#12487c" }}>
              Hizmetlerimiz
            </h2>
            <p className="text-gray-600 text-[18px]">
              Kartlara tıklayarak detaylı bilgi alabilirsiniz
            </p>
          </div>

          <div className="space-y-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-[48px] mb-2" style={{ color: "#12487c" }}>
                500+
              </div>
              <p className="text-gray-600 text-[16px]">Tamamlanan Proje</p>
            </div>
            <div className="text-center">
              <div className="text-[48px] mb-2" style={{ color: "#12487c" }}>
                15+
              </div>
              <p className="text-gray-600 text-[16px]">Yıllık Deneyim</p>
            </div>
            <div className="text-center">
              <div className="text-[48px] mb-2" style={{ color: "#12487c" }}>
                200+
              </div>
              <p className="text-gray-600 text-[16px]">Kurumsal Müşteri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10" style={{ backgroundColor: "#e8f1f8" }}>
        <div className="max-w-[1200px] mx-auto px-12">
          <h2 className="text-[36px] text-center mb-8" style={{ color: "#12487c" }}>
            İletişim Bilgileri
          </h2>
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-[18px] mb-3" style={{ color: "#12487c" }}>
                Adres
              </h3>
              <p className="text-gray-700 text-[14px] leading-relaxed">
                Atatürk Mahallesi,<br />
                Teknoloji Caddesi<br />
                No: 123, Kat: 4<br />
                Çankaya / ANKARA
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-[18px] mb-3" style={{ color: "#12487c" }}>
                Telefon
              </h3>
              <p className="text-gray-700 text-[14px]">+90 (312) 123 45 67</p>
              <p className="text-gray-700 text-[14px]">+90 (312) 123 45 68</p>
            </div>

            <div className="text-center">
              <h3 className="text-[18px] mb-3" style={{ color: "#12487c" }}>
                E-posta
              </h3>
              <p className="text-gray-700 text-[14px]">info@dpiteknoloji.com.tr</p>
              <p className="text-gray-700 text-[14px]">destek@dpiteknoloji.com.tr</p>
            </div>

            <div className="text-center">
              <h3 className="text-[18px] mb-3" style={{ color: "#12487c" }}>
                Çalışma Saatleri
              </h3>
              <p className="text-gray-700 text-[14px]">Pazartesi - Cuma:</p>
              <p className="text-gray-700 text-[14px]">09:00 - 18:00</p>
              <p className="text-gray-700 text-[14px] mt-1">Cumartesi: 10:00 - 15:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
