import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Route değişiminde sayfayı en üste kaydırır.
 * Iletisim sayfasındaki "konu" parametresiyle form'a scroll eden
 * davranışı bozmamak için: önce en üste çıkar, ilgili sayfa kendi
 * useEffect'inde (gecikmeli scrollIntoView) gerekliyse tekrar konumlandırır.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
