import { AuthProvider } from "@/app/context/authContext";
import { AppProps } from "next/app";
import "../app/globals.css";
import Navbar from "@/app/components/Navbar";

function Pages({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default Pages;
