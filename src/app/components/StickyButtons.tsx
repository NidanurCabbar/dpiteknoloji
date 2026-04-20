/**
 * Sabit Teklif Al butonu — her sayfada sağ altta görünür.
 */
import { FileText } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function StickyButtons() {
  const { t } = useLanguage();
  const label = t("sticky.getQuote");

  return (
    <a
      href="/iletisim"
      aria-label={label}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 50,
        height: 48,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 24,
        backgroundColor: "var(--dpi-accent, #e8860c)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "#ffffff",
        fontFamily: "var(--font-family-heading)",
        fontWeight: 600,
        fontSize: 15,
        textDecoration: "none",
        boxShadow: "0 4px 16px rgba(232,134,12,0.35)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(232,134,12,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,134,12,0.35)";
      }}
    >
      <FileText size={18} color="#ffffff" />
      {label}
    </a>
  );
}
