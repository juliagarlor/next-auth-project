import Document, { Html, Head, Main, NextScript } from "next/document";
import React from 'react';

export default class MyDocument extends Document {

  render() {
  return (
    <Html lang="en">
      <Head>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );}
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: React.Children.toArray([initialProps.styles]),
  };
}
