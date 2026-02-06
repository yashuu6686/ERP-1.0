import { Manrope } from "next/font/google";
import "../../styles/globals.css";
import Sidebar from "@/components/layout/Sidebar";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "ERP Dashboard",
  description: "Enterprise SaaS Dashboard",
};

import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { RouteGuard } from "@/components/auth/RouteGuard";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans`}>
        <NotificationProvider>
          <AuthProvider>
            <RouteGuard>
              <Sidebar>{children}</Sidebar>
            </RouteGuard>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
