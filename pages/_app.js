import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';

import '../styles/index.scss';
import createStore from '../redux/createStore';

const isDev = process.env.NODE_ENV === 'development';

class MyApp extends App {
  store = createStore();

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        {!isDev && (
          <Head>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-163659147-2"
            />

            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'UA-163659147-2');
            `,
              }}
            />
          </Head>
        )}

        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default MyApp;
