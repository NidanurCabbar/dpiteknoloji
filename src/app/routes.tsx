import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Anasayfa } from "./pages/Anasayfa";
import { Hakkimizda } from "./pages/Hakkimizda";
import { Hizmetler } from "./pages/Hizmetler";
import { Referanslar } from "./pages/Referanslar";
import { Iletisim } from "./pages/Iletisim";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Anasayfa },
      { path: "hakkimizda", Component: Hakkimizda },
      { path: "hizmetler", Component: Hizmetler },
      { path: "referanslar", Component: Referanslar },
      { path: "iletisim", Component: Iletisim },
    ],
  },
]);
