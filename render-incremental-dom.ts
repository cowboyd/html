import type { Node, Tag } from "./mod.ts";
import { default as inc } from "npm:incremental-dom";
import { type Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

export function render(html: Tag<string>, element: Element | null): void {
  if (element) {
    let { attrs, children } = html;

    for (let [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, String(value));
    }

    inc.patch(element, () => apply(children));
  }
}

function apply(nodes: Node[]): void {
  for (let node of nodes) {
    if (typeof node === "string") {
      inc.text(node);
    } else {
      let { name, attrs, children } = node;
      inc.elementOpen(name, "", Object.entries(attrs).flat());

      apply(children);

      inc.elementClose(name);
    }
  }
}
