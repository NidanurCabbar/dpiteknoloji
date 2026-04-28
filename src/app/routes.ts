import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Anasayfa } from "./pages/Anasayfa";

/**
 * Route-bazlı code splitting:
 * Anasayfa ilk yüklemede hemen geldiği için doğrudan import edilir.
 * Diğer sayfalar (Hakkımızda, Hizmetler, Referanslar, İletişim, Admin)
 * sadece o route ziyaret edildiğinde dinamik olarak yüklenir.
 *
 * Bu sayede ilk paint için indirilen JS bundle'ı küçülür ve büyük
 * arka plan görselleri sadece ilgili sayfaya gidildiğinde fetch edilir.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Anasayfa },
      {
        path: "hakkimizda",
        lazy: async () => {
          const m = await import("./pages/Hakkimizda");
          return { Component: m.Hakkimizda };
        },
      },
      {
        path: "hizmetler",
        lazy: async () => {
          const m = await import("./pages/Hizmetler");
          return { Component: m.Hizmetler };
        },
      },
      {
        path: "referanslar",
        lazy: async () => {
          const m = await import("./pages/Referanslar");
          return { Component: m.Referanslar };
        },
      },
      {
        path: "iletisim",
        lazy: async () => {
          const m = await import("./pages/Iletisim");
          return { Component: m.Iletisim };
        },
      },
      {
        path: "admin",
        lazy: async () => {
          const m = await import("./pages/Admin");
          return { Component: m.Admin };
        },
      },
    ],
  },
]);
