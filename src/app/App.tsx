import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { SiteContentProvider } from "./contexts/SiteContentContext";

export default function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
        <RouterProvider router={router} />
      </SiteContentProvider>
    </AuthProvider>
  );
}