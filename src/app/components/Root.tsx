import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { LoginModal } from "./LoginModal";
import { useState, useEffect } from "react";

export function Root() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

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
      {!isAdminPage && <Navbar />}
      <Outlet />

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
