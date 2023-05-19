import { render } from "../render-incremental-dom.ts";
import { Document } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const links = [
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", href: "/incon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "icon.png" },
  { rel: "stylesheet", href: "css/normalize.css" },
  { rel: "stylesheet", href: "css/style.css" },
  { rel: "manifest", href: "site.webmanifest" }
];

const metas = (
  <>
    <meta charset="utf-8" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=deviced-width" initial-scale="1" />
    <meta name="og:title" content="" />
    <meta property="og:type" content="" />
    <meta property="og:url" content="" />
    <meta property="og:image" content="" />
  </>
);

export const h5bp = (
  <html class="no-js" lang="en-US">
    <head>
      <title>HTML5 Boilerplate</title>
      {metas}
      {links.map(link => (<link {...link} />))}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" herf="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="icon.png" />
      <link rel="stylesheet" href="css/normalize.css" />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="manifest" href="site.webmanifest" />
      <meta name="theme-color" content="#fafafa" />
    </head>
    <body>
      <p>Hello World! This is HTML5 Boilerplate</p>
      <script src="js/vendor/modernizr-3.12.0.min.js" />
      <script src="js/app.js" />
    </body>
  </html>
);

// take the html5 boilerplate and actually render it to a document.
// because the tag is just a data structure representing a document,
// this is straightforward

const doc = new Document().implementation.createHTMLDocument();

render(h5bp, doc.documentElement!);

console.log(doc.documentElement!.outerHTML);
