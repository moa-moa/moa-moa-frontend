import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import { useEffect } from 'react';

let flag = true;

async function runAutoLogin() {
  try {
    const response = await axios.get('/moamoa/auth/auto-login');
    console.log(response);
  } catch (error: any) {
    console.log(error);
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (flag) {
      runAutoLogin();
      flag = false;
    }
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
