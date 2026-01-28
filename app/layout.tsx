import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uniquely - Build Your Vision",
  description: "AI-powered website builder for creators. Build uniquely, not templated.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
