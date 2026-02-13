import type { Metadata } from "next";
import "./globals.css";
import { Nanum_Brush_Script, Nanum_Pen_Script } from "next/font/google";

const brush = Nanum_Brush_Script({
  weight: "400",
  subsets: ["latin"],
});

const pen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForeverMatch 💘",
  description: "Find Your Forever Partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      {/* ⭐ MOBILE VIEWPORT LOCK (VERY IMPORTANT) */}
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>

      {/* ⭐ Dynamic height + font */}
      <body className={`${pen.className} min-h-[100dvh]`}>
        {children}
      </body>

    </html>
  );
}
