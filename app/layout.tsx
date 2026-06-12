import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import "./globals.css";

const vietnam = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vịt Quay Bắc Kinh | Tinh hoa ẩm thực Trung Hoa",
  description:
    "Vịt quay Bắc Kinh da giòn, thịt mềm, chuẩn vị truyền thống hơn 700 năm.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${vietnam.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
