import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { StickyButtons } from "./StickyButtons";
import { LoginModal } from "./LoginModal";
import { ContentProtection } from "./ContentProtection";
import { useState, useEffect, useLayoutEffect } from "react";

export function Root() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  // Route değişiminde sayfayı en üste kaydır
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  // Admin giriş kısayolu: Shift+S → ardından D (1.5 sn içinde).
  // Sıralı kombo, tek tuşla rastlantısal tetiklemeyi engeller ve
  // klavye dilinden bağımsızdır (sadece üreteceği harfe bakar).
  useEffect(() => {
    let armed = false;
    let timer: number | null = null;

    const disarm = () => {
      armed = false;
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Form alanlarında çalışma (input/textarea içindeyken kısayol tetiklenmesin)
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      if (!armed) {
        // 1. adım: Shift+S
        if (e.shiftKey && (e.key === "S" || e.key === "s")) {
          e.preventDefault();
          armed = true;
          timer = window.setTimeout(disarm, 1500);
        }
        return;
      }

      // 2. adım: D (Shift olmadan veya olabilir, fark etmez)
      if (e.key === "D" || e.key === "d") {
        e.preventDefault();
        disarm();
        setShowLoginModal(true);
      } else {
        // Yanlış tuşa basıldıysa diziyi sıfırla
        disarm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {!isAdminPage && <ContentProtection />}
      {!isAdminPage && <TopBar />}
      {!isAdminPage && <Navbar />}
      <div style={{ paddingTop: isAdminPage ? 0 : 48 }}>
        <Outlet />
      </div>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <StickyButtons />}

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
