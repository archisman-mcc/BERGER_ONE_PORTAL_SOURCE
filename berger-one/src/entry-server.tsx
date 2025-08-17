import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

export function render(url: string) {
  try {
    const html = ReactDOMServer.renderToString(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>
    );

    return {
      html,
      head: `
        <meta name="description" content="Berger One Portal - Business Management System" />
        <meta name="keywords" content="Berger, Portal, Business, Management" />
        <meta property="og:title" content="Berger One Portal" />
        <meta property="og:description" content="Comprehensive business management system for Berger India" />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      `,
      initialState: {} // You can serialize initial state here
    };
  } catch (error) {
    console.error('SSR Error:', error);
    return {
      html: `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1>Error occurred during server-side rendering</h1>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      `,
      head: '<title>Error - Berger One Portal</title>',
      initialState: {}
    };
  }
}