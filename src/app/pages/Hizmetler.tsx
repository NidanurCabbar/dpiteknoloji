import bgImage1 from "figma:asset/d232b19c71af91649f5efc3cab00edb595b0ac97.png";
import bgImage2 from "figma:asset/dbccd831f72105a11b60c4651bcb363c51261a83.png";
import bgImage3 from "figma:asset/b71c5f29786c8500e02ad3c397f7c4d0c404eb16.png";
import bgImage4 from "figma:asset/6889dc6ba9f2c3f5c40b2c63aa751ed5e5c4732a.png";
import { FadeIn } from "../components/FadeIn";
import { TechPattern } from "../components/TechPattern";
import { Link } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useSiteContent, pickLang } from "../contexts/SiteContentContext";

export function Hizmetler() {
  const { t, lang } = useLanguage();
  const { content } = useSiteContent();

  const services = content.hizmetler.services.map((s) => ({
    title: pickLang(s.title, lang),
    image: s.image,
    features: s.features.map((f) => pickLang(f, lang)),
    description: pickLang(s.description, lang),
  }));

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
              {t("services.hero.kicker")}
            </p>
            <h1
              className="text-[48px] mb-4"
              style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
            >
              {t("services.hero.title")}
            </h1>
            <p className="text-gray-600 text-[18px] max-w-[700px] mx-auto">
              {t("services.hero.subtitle")}
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
                  <div className="space-y-3 mb-8">
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

                  <a
                    href={`/iletisim?konu=${encodeURIComponent(service.title)}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "var(--dpi-accent)",
                      color: "#ffffff",
                      fontFamily: "var(--font-family-heading)",
                      fontWeight: 600,
                      fontSize: 15,
                      padding: "12px 28px",
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {t("services.cta.getQuote")}
                  </a>
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
              {t("home.cta.titleBefore")}
              <span style={{ color: "var(--dpi-accent-light)" }}>{t("home.cta.titleAccent")}</span>
              {t("home.cta.titleAfter")}
            </h2>
            <p className="text-white/80 text-[18px] mb-10 max-w-[700px] mx-auto">
              {t("home.cta.description")}
            </p>
            <Link
              to="/iletisim"
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
              {t("home.cta.button")}
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
