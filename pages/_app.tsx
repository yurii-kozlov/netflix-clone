import type { AppProps } from 'next/app'
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import 'styles/base/globals.scss'

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
