import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/authContext";

export const metadata: Metadata = {
  title: "Accidentes UViales",
  description: "Aseguradora para todos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
