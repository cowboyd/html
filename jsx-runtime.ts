import type { Attrs, Node, Tag, Fragment } from "./mod.ts";
import { isNode } from "./mod.ts";

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

export interface JSXProps extends Record<string, unknown> {
  children?: string | Node;
}

export interface JSXSProps extends Record<string, unknown> {
  children?: (string | Node | Fragment)[];
}


export function jsx(
  tagOrFn: string | NodeFn,
  props: JSXProps = {}
): Node {
  let { children, ...attrs } = props;
  if (typeof tagOrFn === "string") {
    return {
      name: tagOrFn,
      attrs: attrs as Attrs,
      children: children != null ? [children] : [],
    }
  } else {
    return tagOrFn(props);
  }
}

export function jsxs(
  tagOrFn: string | NodeFn,
  props: JSXSProps = {}
): Node {
  let { children = [], ...attrs } = props;
  if (typeof tagOrFn === "string") {
    return {
      name: tagOrFn,
      attrs: attrs as Attrs,
      children: children.flat().reduce((children, child) => {
        if (isNode(child)) {
          return children.concat(child)
        } else {
          return children.concat(child.children);
        }
      },[] as Node[]),
    };
  } else {
    return tagOrFn(props);
  }
}

export function Fragment(fragment: Fragment): Fragment {
  return fragment;
}
