import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useSiteContent, pickLang } from "../contexts/SiteContentContext";
import { useLanguage } from "../contexts/LanguageContext";

const brandColors: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  twitter: "#000000",
  youtube: "#FF0000",
};

// Telefon numarasını href için temizler
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();
  const vis = content.socialVisibility;
  const { t, lang } = useLanguage();
  const { address, phone1, email1 } = content.iletisim;
  const addressText = pickLang(address, lang);

  const quickLinks = [
    { labelKey: "nav.home", path: "/" },
    { labelKey: "nav.about", path: "/hakkimizda" },
    { labelKey: "nav.services", path: "/hizmetler" },
    { labelKey: "nav.references", path: "/referanslar" },
    { labelKey: "nav.contact", path: "/iletisim" },
  ];

  const services = [
    t("footer.service1"),
    t("footer.service2"),
    t("footer.service3"),
  ];

  const allSocials = [
    { Icon: Facebook, href: "#", label: "Facebook", key: "facebook" as const },
    { Icon: Instagram, href: "#", label: "Instagram", key: "instagram" as const },
    { Icon: Linkedin, href: "#", label: "LinkedIn", key: "linkedin" as const },
    { Icon: Twitter, href: "#", label: "Twitter", key: "twitter" as const },
    { Icon: Youtube, href: "#", label: "YouTube", key: "youtube" as const },
  ];

  const socials = allSocials.filter((s) => vis[s.key]);

  return (
    <footer style={{ backgroundColor: "#0a1e33" }}>
      {/* Ana footer */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 48px 48px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: 48,
        }}
      >
        {/* Sütun 1: Şirket bilgisi */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 16,
            }}
          >
            <span style={{ color: "var(--dpi-accent)" }}>DPI</span> TEKNOLOJİ
          </h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
            {t("footer.intro")}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {socials.map(({ Icon, href, label, key }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 6,
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.6)",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = brandColors[key];
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Sütun 2: Hızlı Linkler */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: 16,
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {t("footer.quickLinks")}
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {quickLinks.map((link) => (
              <li key={link.path} style={{ marginBottom: 12 }}>
                <Link
                  to={link.path}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--dpi-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sütun 3: Hizmetler */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: 16,
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {t("footer.services")}
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {services.map((service) => (
              <li key={service} style={{ marginBottom: 12 }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sütun 4: İletişim */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: 16,
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {t("footer.contact")}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <MapPin size={18} color="var(--dpi-accent)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {addressText}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Phone size={18} color="var(--dpi-accent)" style={{ flexShrink: 0 }} />
              <a href={telHref(phone1)} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>
                {phone1}
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Mail size={18} color="var(--dpi-accent)" style={{ flexShrink: 0 }} />
              <a href={`mailto:${email1}`} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>
                {email1}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
          &copy; {currentYear} DPI Teknoloji. {t("footer.copyright")}
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
            {t("footer.kvkk")}
          </a>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
            {t("footer.privacy")}
          </a>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
            {t("footer.cookies")}
          </a>
        </div>
      </div>
    </footer>
  );
}
