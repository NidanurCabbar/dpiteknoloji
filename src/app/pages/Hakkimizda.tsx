import { FadeIn } from "../components/FadeIn";
import { TechPattern } from "../components/TechPattern";
import bgImage from "figma:asset/0375b7736794914741acd8ea38b508a023ca321b.png";

export function Hakkimizda() {
  const values = [
    {
      title: "Kalite",
      description: "Her projede yüksek standartlarda malzeme ve işçilik",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Güvenilirlik",
      description: "Kamu ve kurumsal projelerde kanıtlanmış referanslar",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "İnovasyon",
      description: "Sektördeki en güncel teknolojileri projelere entegre etme",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Müşteri Odaklılık",
      description: "Her projeye özel ihtiyaç analizi ve teknik danışmanlık",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/30" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-12 text-center">
          <FadeIn>
            <p
              className="text-[14px] font-semibold tracking-[3px] uppercase mb-4"
              style={{ color: "var(--dpi-accent)" }}
            >
              Biz Kimiz
            </p>
            <h1
              className="text-[48px] mb-4"
              style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
            >
              Hakkımızda
            </h1>
            <p className="text-gray-600 text-[18px] max-w-[700px] mx-auto">
              Teknoloji ve inovasyonun öncüsü, güvenilir çözüm ortağınız
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Company Info — metin özetlenmiş, 2 sütun yapısında */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <p
                  className="text-[14px] font-semibold tracking-[3px] uppercase mb-3"
                  style={{ color: "var(--dpi-accent)" }}
                >
                  Kurumsal
                </p>
                <h2
                  className="text-[36px] mb-6"
                  style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
                >
                  DPI TEKNOLOJİ
                </h2>
                <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                  DPI Teknoloji, profesyonel LED ekranlar, ses-ışık-görüntü sistemleri ve zayıf akım çözümleri alanında faaliyet gösteren, mühendislik disiplini ve yenilikçi yaklaşımıyla öne çıkan bir teknoloji firmasıdır.
                </p>
                <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                  Her projeyi teknik bir uygulama olmanın ötesinde, marka itibarı ve uzun vadeli yatırım değeri üreten stratejik bir süreç olarak ele alıyoruz. İhtiyaç analizi, sistem tasarımı, uygulama ve satış sonrası destek süreçlerinin tamamında uçtan uca profesyonel hizmet sunuyoruz.
                </p>
                <p className="text-gray-700 text-[16px] leading-relaxed">
                  Farklı sektörlerdeki deneyimimiz, güçlü teknik altyapımız ve gelişime açık vizyonumuzla, geleceğin beklentilerine uyum sağlayan yenilikçi ve sürdürülebilir çözümler üretmeye devam ediyoruz.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div className="space-y-6">
                {/* Kısa liste */}
                <div className="rounded-xl border border-gray-100 p-8">
                  <h4
                    className="text-[15px] font-semibold mb-4"
                    style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
                  >
                    Faaliyet Alanlarımız
                  </h4>
                  {["Profesyonel LED Ekran Sistemleri", "Ses, Işık ve Görüntü Çözümleri", "Zayıf Akım Sistemleri"].map((item) => (
                    <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--dpi-accent)" }}
                      />
                      <span className="text-gray-700 text-[14px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-24 bg-gray-50">
        <TechPattern variant="light" />
        <div className="relative max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn direction="up">
              <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 h-full">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--dpi-blue)" }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3
                  className="text-[24px] mb-4"
                  style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
                >
                  Misyonumuz
                </h3>
                <p className="text-gray-700 text-[15px] leading-relaxed">
                  Müşterilerimizin ihtiyaçlarını titizlikle analiz ederek, LED ekran, ses-ışık-görüntü ve zayıf akım sistemlerinde yüksek kaliteli, güvenilir ve sürdürülebilir çözümler sunmak. Teknolojiyi işlevsellik, estetik ve performans ile buluşturarak her projede kalıcı memnuniyet sağlamak.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.15}>
              <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 h-full">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--dpi-blue)" }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3
                  className="text-[24px] mb-4"
                  style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
                >
                  Vizyonumuz
                </h3>
                <p className="text-gray-700 text-[15px] leading-relaxed">
                  Profesyonel teknoloji sistemleri alanında ulusal ve uluslararası ölçekte referans gösterilen öncü markalardan biri olmak. Değişen ihtiyaçlara hızlı uyum sağlayan, yüksek kalite standartlarıyla sektörün gelişimine yön veren güçlü bir marka kimliği inşa etmek.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <p
                className="text-[14px] font-semibold tracking-[3px] uppercase mb-3"
                style={{ color: "var(--dpi-accent)" }}
              >
                İlkelerimiz
              </p>
              <h2
                className="text-[36px]"
                style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
              >
                Değerlerimiz
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center group">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "var(--dpi-blue)" }}
                  >
                    {value.icon}
                  </div>
                  <h4
                    className="text-[16px] mb-2"
                    style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
                  >
                    {value.title}
                  </h4>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
