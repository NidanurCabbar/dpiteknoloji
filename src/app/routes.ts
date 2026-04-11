import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Anasayfa } from "./pages/Anasayfa";
import { Hakkimizda } from "./pages/Hakkimizda";
import { Hizmetler } from "./pages/Hizmetler";
import { Referanslar } from "./pages/Referanslar";
import { Iletisim } from "./pages/Iletisim";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Anasayfa },
      { path: "hakkimizda", Component: Hakkimizda },
      { path: "hizmetler", Component: Hizmetler },
      { path: "referanslar", Component: Referanslar },
      { path: "iletisim", Component: Iletisim },
      { path: "admin", Component: Admin },
    ],
  },
]);
