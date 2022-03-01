import Document, { Html,Head, Main, NextScript, DocumentContext } from "next/document";
import React from "react";
import { flushChunks, ExtendedHead, revalidate } from "@module-federation/nextjs-ssr/flushChunks";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
      revalidate();
      const remotes = await flushChunks(process.env.REMOTES);
      const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      remoteChunks: remotes
    };
  }

  render() {

    return (
      <Html>
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          {/* @ts-ignore*/}
          {Object.values(this.props.remoteChunks)}
        </ExtendedHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
