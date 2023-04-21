import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux";

import enUS from "antd/lib/locale/en_US";
import { ConfigProvider } from "antd";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={enUS}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ConfigProvider>
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
