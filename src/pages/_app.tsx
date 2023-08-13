import '../styles/globals.scss';
import '../styles/quill.bubble.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from "next/head";


export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

 export  default  function Asarkia({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
      <>
          <Head>
              <meta name="keywords" content="Абхазия, сюжеты, репортажи, пресса, новости, видео, независимые СМИ, НПО, блог, Надежда Венедиктова, Розита Герман"/>
              <meta name="description" content={`Общественная телестудия "Асаркьа": сюжеты, репортажи, новости, интервью из Абхазии. А так же блог Надежды Венедиктовой.`}/>
          </Head>
          <Component {...pageProps} />
      </>
  )
}