import bgImage1 from "figma:asset/d232b19c71af91649f5efc3cab00edb595b0ac97.png";
import bgImage2 from "figma:asset/dbccd831f72105a11b60c4651bcb363c51261a83.png";
import bgImage3 from "figma:asset/b71c5f29786c8500e02ad3c397f7c4d0c404eb16.png";
import bgImage4 from "figma:asset/6889dc6ba9f2c3f5c40b2c63aa751ed5e5c4732a.png";
import { FadeIn } from "../components/FadeIn";
import { TechPattern } from "../components/TechPattern";

export function Hizmetler() {
  const services = [
    {
      title: "Profesyonel Led Ekran Sistemleri",
      image: "https://images.unsplash.com/photo-1575719028439-65ce8662c1cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsYXJnZSUyMExFRCUyMHNjcmVlbiUyMGRpc3BsYXklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3NTU2NjkzOHww&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "İç ve dış mekan LED ekran kurulumu",
        "Stadyum ve arena LED sistemleri",
        "Reklam ve bilgilendirme ekranları",
        "Yüksek çözünürlüklü video wall sistemleri",
        "Mobil LED ekran çözümleri",
        "7/24 teknik destek ve bakım hizmeti",
      ],
      description:
        "En son teknoloji LED ekran sistemleri ile etkinliklerinize, mekanlarınıza ve projelerinize görsel mükemmellik katıyoruz. Yüksek parlaklık değerleri, geniş görüş açıları ve uzun ömürlü yapısıyla profesyonel LED çözümlerimiz, her türlü ihtiyaca cevap verir.",
    },
    {
      title: "Profesyonel Ses, Işık Ve Görüntü Sistemi",
      image: "https://images.unsplash.com/photo-1773625545016-d575264483e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdWRpbyUyMHNvdW5kJTIwc3lzdGVtJTIwY29uY2VydHxlbnwxfHx8fDE3NzU1NjY5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "Konser ve etkinlik ses sistemleri",
        "Konferans salonu akustiği",
        "Line array ve point source hoparlör sistemleri",
        "Dijital mikser ve ses işleme teknolojileri",
        "Kablosuz mikrofon sistemleri",
        "Akustik analiz ve optimizasyon",
      ],
      description:
        "Konserlerden konferanslara, tiyatro sahnesinden açık hava etkinliklerine kadar her ortam için özel tasarlanmış profesyonel ses çözümleri sunuyoruz. Kristal netliğinde ses kalitesi ve mükemmel akustik performans için son teknoloji ekipmanlar kullanıyoruz.",
    },
    {
      title: "Zayıf Akım Sistemleri",
      image: "https://images.unsplash.com/photo-1760210885713-624a29a48633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhcmNoaXRlY3R1cmFsJTIwbGlnaHRpbmclMjBkZXNpZ24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzU1NjY5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "Mimari cephe aydınlatması",
        "Sahne ve etkinlik ışıklandırması",
        "LED ve moving head sistemleri",
        "DMX kontrol ve programlama",
        "Dekoratif ve ambient aydınlatma",
        "Enerji verimli ışık çözümleri",
      ],
      description:
        "Işıklandırma sistemlerimiz ile mekanlarınızı dönüştürüyor, etkinliklerinize görsel derinlik katıyoruz. Mimari projelerden sahne performanslarına kadar geniş yelpazede ışık tasarımı ve uygulama hizmeti veriyoruz.",
    },
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/4 h-full bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${bgImage1})` }} />
          <div className="w-1/4 h-full bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${bgImage2})` }} />
          <div className="w-1/4 h-full bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${bgImage3})` }} />
          <div className="w-1/4 h-full bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${bgImage4})` }} />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-12 text-center">
          <FadeIn>
            <p
              className="text-[14px] font-semibold tracking-[3px] uppercase mb-4"
              style={{ color: "var(--dpi-accent)" }}
            >
              Uzmanlık Alanlarımız
            </p>
            <h1
              className="text-[48px] mb-4"
              style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
            >
              Hizmetlerimiz
            </h1>
            <p className="text-gray-600 text-[18px] max-w-[700px] mx-auto">
              Büyük ölçekli projeler için profesyonel teknoloji çözümleri
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section
          key={index}
          className={`relative py-24 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          <div className="max-w-[1200px] mx-auto px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "direction-rtl" : ""}`}>
              <FadeIn direction={index % 2 === 0 ? "left" : "right"}>
                <div className={index % 2 === 1 ? "order-2" : ""}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[500px] object-cover rounded-xl shadow-lg"
                  />
                </div>
              </FadeIn>
              <FadeIn direction={index % 2 === 0 ? "right" : "left"} delay={0.15}>
                <div className={index % 2 === 1 ? "order-1" : ""}>
                  <h2
                    className="text-[36px] mb-6"
                    style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-gray-700 text-[16px] leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: "var(--dpi-accent)" }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-[15px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
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
