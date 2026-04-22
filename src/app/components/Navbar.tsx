import { Link, useLocation } from "react-router";
import logo from "figma:asset/ebfd5b8d0e238183642c1f03544a20072e4c3aa3.png";
import { useLanguage } from "../contexts/LanguageContext";

export function Navbar() {
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const menuItems = [
    { path: "/", labelKey: "nav.home" },
    { path: "/hakkimizda", labelKey: "nav.about" },
    { path: "/hizmetler", labelKey: "nav.services" },
    { path: "/referanslar", labelKey: "nav.references" },
    { path: "/iletisim", labelKey: "nav.contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const langBtnStyle = (active: boolean): React.CSSProperties => ({
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.5,
    borderRadius: 4,
    border: `1px solid ${active ? "#12487c" : "#d1d5db"}`,
    backgroundColor: active ? "#12487c" : "transparent",
    color: active ? "#ffffff" : "#4b5563",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "var(--font-family-heading)",
  });

  return (
    <nav className="fixed top-[48px] left-0 right-0 bg-white/50 backdrop-blur-md shadow-sm z-50">
      <div className="w-full pl-6 pr-8 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="flex items-center gap-3">
            <img src={logo} alt="DPI TEKNOLOJİ Logo" className="h-[56px]" />
          </span>
        </Link>

        <div className="flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative overflow-hidden h-[24px] flex items-center group"
            >
              <div className="relative transition-transform duration-300 ease-out group-hover:-translate-y-full">
                {/* Orijinal yazı (siyah) - yukarı kayar */}
                <span
                  className="text-[15px] tracking-wide font-medium block"
                  style={{
                    color: isActive(item.path) ? "#12487c" : "#333333",
                  }}
                >
                  {t(item.labelKey)}
                </span>

                {/* Mavi yazı - alttan gelir */}
                <span
                  className="text-[15px] tracking-wide font-medium block absolute top-full left-0"
                  style={{ color: "#12487c" }}
                >
                  {t(item.labelKey)}
                </span>
              </div>

              {/* Alt çizgi - sadece aktif sayfa için */}
              {isActive(item.path) && (
                <div
                  className="absolute -bottom-[22px] left-0 right-0 h-[2px]"
                  style={{ backgroundColor: "#12487c" }}
                />
              )}
            </Link>
          ))}

          {/* Dil seçici — yan yana iki küçük kare buton */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-label={t("nav.lang.en.aria")}
              aria-pressed={lang === "en"}
              style={langBtnStyle(lang === "en")}
              onMouseEnter={(e) => {
                if (lang !== "en") {
                  e.currentTarget.style.borderColor = "#12487c";
                  e.currentTarget.style.color = "#12487c";
                }
              }}
              onMouseLeave={(e) => {
                if (lang !== "en") {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.color = "#4b5563";
                }
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("tr")}
              aria-label={t("nav.lang.tr.aria")}
              aria-pressed={lang === "tr"}
              style={langBtnStyle(lang === "tr")}
              onMouseEnter={(e) => {
                if (lang !== "tr") {
                  e.currentTarget.style.borderColor = "#12487c";
                  e.currentTarget.style.color = "#12487c";
                }
              }}
              onMouseLeave={(e) => {
                if (lang !== "tr") {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.color = "#4b5563";
                }
              }}
            >
              TR
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
