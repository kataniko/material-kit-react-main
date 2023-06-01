/**

    @module CustomDocument
    @desc This module exports a React Component that extends the Next.js Document component and provides additional functionality to the HTML and Head of the document.
    @requires react
    @requires next/document
    @requires @emotion/server/create-instance
    @requires src/utils/create-emotion-cache
    @requires react
*/

import { Children } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import { Suspense } from 'react';


/**
  @function Favicon
  @desc This is a React Component that renders a Favicon with different image formats and sizes.
  @returns {JSX.Element} - The React Component that renders the favicon links.
*/

const Favicon = () => (
  <>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />
    <link
      rel="icon"
      href="/favicon.ico"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />
  </>
);

/**
  @function Fonts
  @desc This is a React Component that renders link tags to Google Fonts.
  @returns {JSX.Element} - The React Component that renders the link tags to Google Fonts.
*/

const Fonts = () => (
  <>
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"
    />
  </>
);

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
          <Fonts />
        </Head>
        <body className='fundo'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/**
  @classdesc This is a React Component that extends the Next.js Document component and provides additional functionality to the HTML and Head of the document.
  @class
  @extends Document
  @property {function} getInitialProps - This method returns the initial props of the component.
*/

CustomDocument.getInitialProps = async (ctx) => {
  /*
    @desc This method returns the initial props of the component, including emotion styles and cache.
    @function getInitialProps
    @async
    @param {Object} ctx - The Next.js context object.
    @param {Object} ctx.renderPage - The render page object from Next.js context object.
    @returns {Object} - The initial props object with styles and emotion styles.
  */
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => (
      <App
        emotionCache={cache}
        {...props}
      />
    )
  });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  };
};

export default CustomDocument;
