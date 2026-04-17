import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";
import { StickyButtons } from "./StickyButtons";
import { LoginModal } from "./LoginModal";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "S") {
        e.preventDefault();
        setShowLoginModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
