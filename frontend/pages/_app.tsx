import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar';
import store from 'store/store';
import 'styles/base/globals.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css/animate.min.css';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: 'normal'
});

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Provider store={store}>
        <main className={roboto.className}>
          <NextNProgress color='#d30b15' height={4} showOnShallow/>
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}
