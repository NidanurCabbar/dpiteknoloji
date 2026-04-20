import { FadeIn } from "../components/FadeIn";
import { TechPattern } from "../components/TechPattern";
import { useLanguage } from "../contexts/LanguageContext";

interface Reference {
  client: string;
  project: string;
  logo?: string;
}

export function Referanslar() {
  const { t } = useLanguage();

  const references: Reference[] = [
    { client: t("refs.client.konya"), project: t("refs.project.default") },
    { client: t("refs.client.dsi"), project: t("refs.project.default") },
    { client: t("refs.client.esenyurt"), project: t("refs.project.default") },
    { client: t("refs.client.tcdd"), project: t("refs.project.default") },
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <TechPattern variant="light" />
        <div className="relative max-w-[1200px] mx-auto px-12 text-center">
          <FadeIn>
            <p
              className="text-[14px] font-semibold tracking-[3px] uppercase mb-4"
              style={{ color: "var(--dpi-accent)" }}
            >
              {t("refs.hero.kicker")}
            </p>
            <h1
              className="text-[48px] mb-4"
              style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
            >
              {t("refs.hero.title")}
            </h1>
            <p className="text-gray-600 text-[18px] max-w-[700px] mx-auto">
              {t("refs.hero.subtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <FadeIn>
            <p
              className="text-center text-[14px] font-semibold tracking-[3px] uppercase mb-3"
              style={{ color: "var(--dpi-accent)" }}
            >
              {t("refs.section.kicker")}
            </p>
            <h2
              className="text-[36px] text-center mb-4"
              style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
            >
              {t("refs.section.title")}
            </h2>
            <p className="text-gray-500 text-[16px] text-center mb-16 max-w-[700px] mx-auto">
              {t("refs.section.subtitle")}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {references.map((ref, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div
                  className="group bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
                >
                  <div className="w-full h-20 flex items-center justify-center mb-4">
                    {ref.logo ? (
                      <img
                        src={ref.logo}
                        alt={ref.client}
                        className="max-h-20 max-w-full object-contain"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#12487c" }}
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3
                    className="text-[17px] leading-snug"
                    style={{ fontFamily: "var(--font-family-heading)", color: "var(--dpi-blue)" }}
                  >
                    {ref.client}
                  </h3>
                  <p className="text-gray-500 text-[13px] mt-2">{ref.project}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--dpi-blue) 0%, var(--dpi-blue-dark) 100%)" }}
      >
        <TechPattern variant="dark" />
        <div className="relative max-w-[1200px] mx-auto px-12">
          <FadeIn>
            <p
              className="text-center text-[14px] font-semibold tracking-[3px] uppercase mb-3"
              style={{ color: "var(--dpi-accent-light)" }}
            >
              {t("refs.why.kicker")}
            </p>
            <h2
              className="text-[36px] text-center text-white mb-16"
              style={{ fontFamily: "var(--font-family-heading)" }}
            >
              {t("refs.why.title")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t("refs.why.c1.title"),
                desc: t("refs.why.c1.desc"),
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
              {
                title: t("refs.why.c2.title"),
                desc: t("refs.why.c2.desc"),
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: t("refs.why.c3.title"),
                desc: t("refs.why.c3.desc"),
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="text-[18px] text-white mb-2"
                    style={{ fontFamily: "var(--font-family-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-[14px] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
