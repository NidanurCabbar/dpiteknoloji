import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main className="pt-[40px]">
        <Outlet />
      </main>
    </div>
  );
}
