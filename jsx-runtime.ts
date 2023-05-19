import type { Attrs, Fragment, Node, Tag } from "./mod.ts";
import { isFragment, isTag } from "./mod.ts";

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
  children?: JSXChild | JSXChild[];
}

export type JSXChild = number | boolean | Node | Fragment;

export function jsx(
  tagOrFn: string | NodeFn,
  props: JSXProps = {},
): Node {
  let { children: childOrChildren, ...attrs } = props;
  let children = childOrChildren == null
    ? []
    : Array.isArray(childOrChildren)
    ? childOrChildren
    : [childOrChildren];
  let childNodes = children.reduce((nodes, child) => {
    if (isFragment(child) && !isTag(child)) {
      return nodes.concat(child.children);
    } else {
      return nodes.concat(child);
    }
  }, [] as JSXChild[]).map(normalize) as Node[];

  if (typeof tagOrFn === "string") {
    return {
      name: tagOrFn,
      attrs: attrs as Attrs,
      children: childNodes,
    };
  } else {
    return tagOrFn({
      ...props,
      children: childNodes,
    });
  }
}

export const jsxs = jsx;

export function Fragment(props: JSXProps): Fragment {
  let { children = [] } = props;
  let nodes = Array.isArray(children) ? children : [children];
  return {
    children: nodes.map(normalize) as Node[],
  };
}

function normalize(child: JSXChild): Node | Fragment {
  switch (typeof child) {
    case "number":
    case "boolean":
      return String(child);
    default:
      return child;
  }
}
