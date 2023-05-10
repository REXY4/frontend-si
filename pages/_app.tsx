/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
// pages/_app.tsx

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  appPersistor,
  appStoreImplementation,
} from '@/src/data/store-implementation/app-store-implementation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '@/components/layout';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const tempComponent = <Component {...pageProps} />;

  let templateLayout = <>{tempComponent}</>;
  if (!pageProps.noLayout) {
    templateLayout = <Layout>{tempComponent}</Layout>;
  }

  return getLayout(
    <Provider store={appStoreImplementation}>
      <PersistGate persistor={appPersistor}>{templateLayout}</PersistGate>
    </Provider>,
  );
}
