import { Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useSiteContent, pickLang } from "../contexts/SiteContentContext";
import { useLanguage } from "../contexts/LanguageContext";

const brandColors: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
  twitter: "#000000",
  youtube: "#FF0000",
};

// Telefon numarasını href için temizler (boşluk, parantez, tire kaldırır)
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export function TopBar() {
  const { content } = useSiteContent();
  const vis = content.socialVisibility;
  const links = content.socialLinks;
  const { lang } = useLanguage();
  const { phone1, address } = content.iletisim;
  const addressText = pickLang(address, lang);

  const allSocials = [
    { Icon: Facebook, label: "Facebook", key: "facebook" as const },
    { Icon: Instagram, label: "Instagram", key: "instagram" as const },
    { Icon: Linkedin, label: "LinkedIn", key: "linkedin" as const },
    { Icon: Twitter, label: "Twitter", key: "twitter" as const },
    { Icon: Youtube, label: "YouTube", key: "youtube" as const },
  ];

  // Görünür + URL girilmiş olanlar
  const visibleSocials = allSocials
    .filter((s) => vis[s.key] && links[s.key]?.trim())
    .map((s) => ({ ...s, href: links[s.key] }));

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
            href={telHref(phone1)}
            style={{ display: "flex", alignItems: "center", gap: 8, color: "#ffffff", textDecoration: "none" }}
          >
            <Phone size={16} color="#ffffff" />
            <span>{phone1}</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#ffffff" }}>
            <MapPin size={16} color="#ffffff" />
            <span>{addressText}</span>
          </div>
        </div>

        {/* Sağ: sosyal medya ikonları */}
        {visibleSocials.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {visibleSocials.map(({ Icon, href, label, key }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
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
