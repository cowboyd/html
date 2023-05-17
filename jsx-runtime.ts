import type { Attrs, Node, Tag } from "./mod.ts";

declare global {
  namespace JSX {
    type Element = Tag<string>;
    interface IntrinsicElements {
      [eleName: string]: unknown;
    }
  }
}

export interface NodeFn {
  (props: Record<string, unknown>): Node;
}

export function jsx(
  tagname: string,
  props: null | Attrs,
  ...children: Node[]
): Node;

export function jsx(
  fn: NodeFn,
  props: null | Record<string, unknown>,
  ...children: Node[]
): Node;

export function jsx(
  tagOrFn: string | NodeFn,
  props: null | Record<string, unknown>,
  ...children: Node[]
): Node {
  let attrs = props ?? {};
  if (typeof tagOrFn === "string") {
    return [tagOrFn, attrs as Attrs, children];
  } else {
    let args = children.length > 0
      ? Object.assign({}, attrs, { children })
      : attrs;
    return tagOrFn(args);
  }
}

export const jsxs = jsx;
