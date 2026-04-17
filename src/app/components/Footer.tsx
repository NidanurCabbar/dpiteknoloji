import { Link } from "react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useSiteContent } from "../contexts/SiteContentContext";

const brandColors: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  twitter: "#000000",
  youtube: "#FF0000",
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();
  const vis = content.socialVisibility;

  const quickLinks = [
    { label: "Anasayfa", path: "/" },
    { label: "Hakkımızda", path: "/hakkimizda" },
    { label: "Hizmetler", path: "/hizmetler" },
    { label: "Referanslar", path: "/referanslar" },
    { label: "İletişim", path: "/iletisim" },
  ];

  const services = [
    "Profesyonel LED Ekran Sistemleri",
    "Ses, Işık ve Görüntü Sistemleri",
    "Zayıf Akım Sistemleri",
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
            Büyük ölçekli LED ekran, profesyonel ses, ışık ve zayıf akım sistemleri alanında
            kurumsal çözümler sunan güvenilir teknoloji şirketiniz.
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
            Hızlı Linkler
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
                  {link.label}
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
            Hizmetler
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
            İletişim
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <MapPin size={18} color="var(--dpi-accent)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>
                Atatürk Mah. Teknoloji Cad.<br />No:123, Çankaya / ANKARA
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Phone size={18} color="var(--dpi-accent)" style={{ flexShrink: 0 }} />
              <a href="tel:+903121234567" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>
                +90 (312) 123 45 67
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Mail size={18} color="var(--dpi-accent)" style={{ flexShrink: 0 }} />
              <a href="mailto:info@dpiteknoloji.com.tr" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>
                info@dpiteknoloji.com.tr
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
          &copy; {currentYear} DPI Teknoloji. Tüm hakları saklıdır.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
            KVKK Aydınlatma Metni
          </a>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
            Gizlilik Politikası
          </a>
          <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
            Çerez Politikası
          </a>
        </div>
      </div>
    </footer>
  );
}
