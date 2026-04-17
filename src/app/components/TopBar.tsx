import { Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useSiteContent } from "../contexts/SiteContentContext";

const brandColors: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  twitter: "#000000",
  youtube: "#FF0000",
};

export function TopBar() {
  const { content } = useSiteContent();
  const vis = content.socialVisibility;

  const allSocials = [
    { Icon: Facebook, href: "#", label: "Facebook", key: "facebook" as const },
    { Icon: Instagram, href: "#", label: "Instagram", key: "instagram" as const },
    { Icon: Linkedin, href: "#", label: "LinkedIn", key: "linkedin" as const },
    { Icon: Twitter, href: "#", label: "Twitter", key: "twitter" as const },
    { Icon: Youtube, href: "#", label: "YouTube", key: "youtube" as const },
  ];

  const visibleSocials = allSocials.filter((s) => vis[s.key]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        backgroundColor: "#000000",
        color: "#ffffff",
        fontSize: 14,
        zIndex: 60,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingLeft: 24,
          paddingRight: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Sol: iletişim bilgileri */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, color: "#ffffff" }}>
          <a
            href="tel:+903121234567"
            style={{ display: "flex", alignItems: "center", gap: 8, color: "#ffffff", textDecoration: "none" }}
          >
            <Phone size={16} color="#ffffff" />
            <span>+90 (312) 123 45 67</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#ffffff" }}>
            <MapPin size={16} color="#ffffff" />
            <span>Atatürk Mah. Teknoloji Cad. No:123, Çankaya / ANKARA</span>
          </div>
        </div>

        {/* Sağ: sosyal medya ikonları */}
        {visibleSocials.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {visibleSocials.map(({ Icon, href, label, key }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  backgroundColor: "transparent",
                  transition: "background-color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = brandColors[key];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
