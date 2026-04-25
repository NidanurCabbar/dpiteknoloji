import { useEffect } from "react";

/**
 * Site genelinde içerik koruma katmanı (caydırıcı amaçlı).
 *
 * Tarayıcıya inen içerik teknik olarak %100 korunamaz (DevTools, ekran
 * görüntüsü, network sniff vb. her zaman mümkündür). Bu bileşen yalnızca
 * sıradan kullanıcıların kolayca metin/görsel/video kopyalamasını,
 * kaydetmesini ve sayfa kaynağına ulaşmasını engellemek için tasarlanmıştır.
 *
 * İstisnalar:
 *  - <input>, <textarea>, contentEditable alanları (form girişi serbest)
 *  - data-allow-copy="true" işaretli elementler (gerekirse manuel muafiyet)
 *  - Admin paneli (Root.tsx içinde mount edilirken /admin'de render edilmez)
 */
export function ContentProtection() {
  useEffect(() => {
    const isFormField = (el: EventTarget | null) => {
      const node = el as HTMLElement | null;
      if (!node) return false;
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA" || node.isContentEditable) return true;
      // data-allow-copy ile veya içinde işaretli bir atayla
      if (node.closest && node.closest('[data-allow-copy="true"]')) return true;
      return false;
    };

    const onContextMenu = (e: MouseEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const onCopy = (e: ClipboardEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const onCut = (e: ClipboardEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      // Görsel/video sürükleme yasak
      const node = e.target as HTMLElement | null;
      if (!node) return;
      if (node.tagName === "IMG" || node.tagName === "VIDEO" || node.tagName === "SOURCE") {
        e.preventDefault();
      }
    };

    const onSelectStart = (e: Event) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Form alanlarında engelleme yapma — kullanıcı normal yazabilsin/kopyalayabilsin
      if (isFormField(e.target)) return;

      const k = e.key.toLowerCase();

      // F12 — DevTools
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Ctrl/Cmd kombinasyonları
      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) return;

      // Ctrl+S (kaydet), Ctrl+U (kaynağı göster), Ctrl+P (yazdır)
      if (k === "s" || k === "u" || k === "p") {
        e.preventDefault();
        return;
      }

      // Ctrl+C / Ctrl+X (form dışında)
      if (k === "c" || k === "x") {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+I / J / C — DevTools
      if (e.shiftKey && (k === "i" || k === "j" || k === "c")) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("keydown", onKeyDown);

    // Global CSS: metin seçimini ve görsel sürüklemeyi kapat (form alanları hariç)
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-content-protection", "true");
    styleEl.textContent = `
      html, body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      input, textarea, [contenteditable="true"], [data-allow-copy="true"], [data-allow-copy="true"] * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      img, video {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
        pointer-events: auto;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("keydown", onKeyDown);
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  return null;
}
