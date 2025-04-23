import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { UserProfileProvider } from "@/lib/user-profile-settings-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowerWork",
  description: "Hire workforce effortlessly and streamline workflows",
  icons: {
    icon: "/favicon.ico", // Standard favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <UserProfileProvider>
        <body className={inter.className}>{children}</body>
        </UserProfileProvider>
      </AuthProvider>
    </html>
  );
}