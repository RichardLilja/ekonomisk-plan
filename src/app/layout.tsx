import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const slabSerifBold = localFont({
  src: "./fonts/handelsbanken-slab-serif-bold.woff2",
  variable: "--font-handelsbanken-slab-serif",
  weight: "700",
});
const slabSerifLight = localFont({
  src: "./fonts/handelsbanken-slab-serif-light.woff2",
  variable: "--font-handelsbanken-slab-serif-light",
  weight: "700",
});
const robotoRegular = localFont({
  src: "./fonts/roboto-regular.woff2",
  variable: "--font-roboto-regular",
  weight: "400",
});
const robotoBold = localFont({
  src: "./fonts/roboto-bold.woff2",
  variable: "--font-roboto-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Mock - Handelsbanken",
  description: "Mock - Handelsbanken",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${slabSerifBold.variable} ${slabSerifLight.variable} ${robotoRegular.variable} ${robotoBold.variable} antialiased min-h-dvh`}
      >
        {children}
      </body>
    </html>
  );
}
