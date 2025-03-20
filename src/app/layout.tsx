import Navbar from "./components/Navbar";
import StyledComponentsRegistry from "@/app/StyledComponentsRegistry";
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "tech 3",
  description: "Projeto Tech Challenge 3 do grupo 42",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
