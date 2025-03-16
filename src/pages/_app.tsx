import { AppProps } from 'next/app';
import '../app/globals.css';
import Navbar from '@/app/components/Navbar';

function Pages({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default Pages;