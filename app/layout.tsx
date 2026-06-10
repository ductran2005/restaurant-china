import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiên Tửu · Xiang Yang - Ẩm Thực Trung Hoa Đỉnh Cao",
  description: "Tinh hoa vịt quay Bắc Kinh được tái hiện bằng nghệ thuật hiện đại, mang đến hành trình vị giác đậm chất đế vương.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
