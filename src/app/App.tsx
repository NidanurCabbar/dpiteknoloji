import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { SiteContentProvider } from "./contexts/SiteContentContext";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SiteContentProvider>
          <RouterProvider router={router} />
        </SiteContentProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}