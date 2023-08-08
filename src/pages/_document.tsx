import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { JSX } from "react";

export default class MyDocument extends Document {
    
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    {/* {CssBaseline.flush()} */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async(ctx) => {
    const initialProps = await Document.getInitialProps(ctx);
    //resetServerContext();
    return {
        ...initialProps,
        styles: React.Children.toArray([initialProps.styles]),
    };
}