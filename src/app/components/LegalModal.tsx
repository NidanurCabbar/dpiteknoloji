import { useEffect, ReactNode } from "react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * Hukuki belgeler için büyük popup modal
 * (KVKK Aydınlatma Metni, Gizlilik Politikası, Çerez Politikası).
 *
 * - ESC tuşu ile kapanır
 * - Backdrop tıklamasıyla kapanır
 * - İçerik scroll edilebilir
 * - Modal açıkken arka plan scroll'u kilitlenir
 */
export function LegalModal({ isOpen, onClose, title, children }: LegalModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Body scroll'u kilitle
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-allow-copy="true"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#12487c",
            color: "#ffffff",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Kapat"
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            padding: "28px 32px",
            overflowY: "auto",
            flex: 1,
            color: "#1a1a1a",
            fontSize: 14,
            lineHeight: 1.7,
          }}
          className="legal-modal-body"
        >
          {children}
        </div>
      </div>

      <style>{`
        .legal-modal-body h3 {
          font-family: var(--font-family-heading);
          font-size: 17px;
          font-weight: 700;
          color: #12487c;
          margin: 24px 0 10px;
        }
        .legal-modal-body h3:first-child { margin-top: 0; }
        .legal-modal-body p { margin: 0 0 12px; text-align: justify; }
        .legal-modal-body ul { margin: 0 0 14px 22px; padding: 0; }
        .legal-modal-body li { margin-bottom: 6px; }
        .legal-modal-body table { width: 100%; border-collapse: collapse; margin: 12px 0 18px; font-size: 13px; }
        .legal-modal-body th { background-color: #12487c; color: #fff; padding: 10px; text-align: left; }
        .legal-modal-body td { border-bottom: 1px solid #e5e7eb; padding: 10px; vertical-align: top; }
        .legal-modal-body tr:nth-child(even) td { background-color: #f9fafb; }
        .legal-modal-body .legal-meta { text-align: center; color: #6b7280; font-size: 12px; margin-bottom: 24px; }
        .legal-modal-body .legal-footer { text-align: right; color: #6b7280; font-size: 12px; margin-top: 24px; padding-top: 12px; border-top: 1px solid #e5e7eb; }
      `}</style>
    </div>
  );
}
