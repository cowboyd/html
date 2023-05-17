## HTML

HTML that is _actually_ Just JavaScript™

Lot's of hay is made about things being "Just Javascript", however in most cases
it is not true. This allows you to represent an HTML tag in a fluent as a simple
data structure and then how you serialize that into a DOM, or into a string, is
up to you.

For example, here is how you would represent the [current HTML5 Boilerplate][1]
using JS

```ts
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
```

To see this example in action:

```shellsession
$ deno task h5bp
```

[1]: https://github.com/h5bp/html5-boilerplate-template/blob/main/index.html
