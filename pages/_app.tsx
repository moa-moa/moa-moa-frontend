import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import {
  Hydrate,
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import Organisms from '@/components/organisms';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
          <Organisms.ToastNavigator />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
