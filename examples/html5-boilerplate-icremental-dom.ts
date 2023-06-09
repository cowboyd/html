import { body, head, html, link, meta, p, script, title } from "../mod.ts";

import { render } from "../render-incremental-dom.ts";
import { Document } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

export const h5bp =
  /* https://github.com/h5bp/html5-boilerplate-template/blob/main/index.html */
  html(
    { class: "no-js", lang: "en-US" },
    head(
      meta({ charset: "utf-8" }),
      title("HTML5 Boilerplate"),
      meta({ name: "description", content: "" }),
      meta({
        name: "viewport",
        content: "width=deviced-width",
        "initial-scale": 1,
      }),
      meta({ name: "og:title", content: "" }),
      meta({ property: "og:type", content: "" }),
      meta({ property: "og:url", content: "" }),
      meta({ property: "og:image", content: "" }),
      link({ rel: "icon", href: "/favicon.io", sizes: "any" }),
      link({ rel: "icon", herf: "/icon.svg", type: "image/svg+xml" }),
      link({ rel: "apple-touch-icon", href: "icon.png" }),
      link({ rel: "stylesheet", href: "css/normalize.css" }),
      link({ rel: "stylesheet", href: "css/style.css" }),
      link({ rel: "manifest", href: "site.webmanifest" }),
      meta({ name: "theme-color", content: "#fafafa" }),
    ),
    body(
      /* Add your site or application content here */
      p("Hello World! This is HTML5 Boilerplate"),
      script({ src: "js/vendor/modernizr-3.12.0.min.js" }),
      script({ src: "js/app.js" }),
    ),
  );

// take the html5 boilerplate and actually render it to a document.
// because the tag is just a data structure representing a document,
// this is straightforward

const doc = new Document().implementation.createHTMLDocument();

render(h5bp, doc.documentElement!);

console.log(doc.documentElement!.outerHTML);
