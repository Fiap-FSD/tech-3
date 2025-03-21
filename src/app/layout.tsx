import Navbar from "./components/Navbar";
import StyledComponentsRegistry from "@/app/register/StyledComponentsRegistry";
import type { Metadata } from "next";
import "./globals.css";
import GlobalStyle from "@/app/componentStyles/globalStyles";


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
        <GlobalStyle />
        <Navbar />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
