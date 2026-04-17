import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main className="pt-[40px]">
        <Outlet />
      </main>
    </div>
  );
}
