/**
 * Represents HTML Element attributes
 */
export type Attrs = Record<string, string | number | boolean>;

/**
 * An HTML Tag like <a href="http://github.com">A link to GitHub</a>
 * It contains the name of the tag, the attributes of the tag followed
 * by the tag content.
 */

export interface Tag<T extends string> {
  name: T;
  attrs: Attrs;
  children: Node[];
}

export interface Fragment {
  children: Node[];
}

/**
 * Represents the children of an element. They can either be other
 * tags, or strings which represent text nodes.
 */
export type Node = Tag<string> | string;

/**
 * TagConstructors provide a fluent way of creating HTML tags in pure
 * JavaScript. The accept a list of attributes, strings, or tags in any order
 * and return a tag representing it. using thead
 *
 * ```
 * import { html, head, body, title, div } from "html";
 *
 * export default
 *   html({ lang: "en-US"},
 *     head(
 *       title("Title of the document")
 *     ),
 *     body(
 *       h1("Greeting"),
 *       p("Hello World!")
 *
 *       h1("Request"),
 *       p("Take me to your leader")
 *     )
 *   )
 * ```
 */
export interface TagConstructor<T extends string> {
  (...content: Array<Node | Attrs>): Tag<T>;
}

export const a = tag("a");
export const abbr = tag("abbr");
export const address = tag("address");
export const area = tag("area");
export const article = tag("article");
export const aside = tag("aside");
export const audio = tag("audio");
export const b = tag("b");
export const base = tag("base");
export const bdi = tag("bdi");
export const bdo = tag("bdo");
export const blockquote = tag("blockquote");
export const body = tag("body");
export const br = tag("br");
export const button = tag("button");
export const canvas = tag("canvas");
export const caption = tag("caption");
export const cite = tag("cite");
export const code = tag("code");
export const col = tag("col");
export const colgroup = tag("colgroup");
export const data = tag("data");
export const datalist = tag("datalist");
export const dd = tag("dd");
export const del = tag("del");
export const details = tag("details");
export const dfn = tag("dfn");
export const dialog = tag("dialog");
export const dir = tag("dir");
export const div = tag("div");
export const dl = tag("dl");
export const dt = tag("dt");
export const em = tag("em");
export const embed = tag("embed");
export const fieldset = tag("fieldset");
export const figcaption = tag("figcaption");
export const figure = tag("figure");
export const footer = tag("footer");
export const form = tag("form");
export const h1 = tag("h1");
export const head = tag("head");
export const header = tag("header");
export const hgroup = tag("hgroup");
export const hr = tag("hr");
export const html = tag("html");
export const i = tag("i");
export const iframe = tag("iframe");
export const img = tag("img");
export const input = tag("input");
export const ins = tag("ins");
export const kbd = tag("kbd");
export const label = tag("label");
export const legend = tag("legend");
export const li = tag("li");
export const link = tag("link");
export const main = tag("main");
export const map = tag("map");
export const mark = tag("mark");
export const menu = tag("menu");
export const meta = tag("meta");
export const meter = tag("meter");
export const nav = tag("nav");
export const noscript = tag("noscript");
export const object = tag("object");
export const ol = tag("ol");
export const optgroup = tag("optgroup");
export const option = tag("option");
export const output = tag("output");
export const p = tag("p");
export const plaintext = tag("plaintext");
export const portal = tag("portal");
export const pre = tag("pre");
export const progress = tag("progress");
export const q = tag("q");
export const rp = tag("rp");
export const rt = tag("rt");
export const ruby = tag("ruby");
export const s = tag("s");
export const samp = tag("samp");
export const script = tag("script");
export const section = tag("section");
export const select = tag("select");
export const slot = tag("slot");
export const small = tag("small");
export const source = tag("source");
export const span = tag("span");
export const strong = tag("strong");
export const style = tag("style");
export const sub = tag("sub");
export const summary = tag("summary");
export const sup = tag("sup");
export const table = tag("table");
export const tbody = tag("tbody");
export const td = tag("td");
export const template = tag("template");
export const textarea = tag("textarea");
export const tfoot = tag("tfoot");
export const th = tag("th");
export const thead = tag("thead");
export const time = tag("time");
export const title = tag("title");
export const tr = tag("tr");
export const track = tag("track");
export const u = tag("u");
export const ul = tag("ul");
export const video = tag("video");
export const wbr = tag("wbr");

export function tag<T extends string>(name: T): TagConstructor<T> {
  return (...content) => {
    let children: Node[] = [];
    let attrlist: Attrs[] = [];

    for (let item of content) {
      if (isNode(item)) {
        children.push(item);
      } else {
        attrlist.push(item);
      }
    }
    let attrs = {};
    for (let chunk of attrlist) {
      Object.assign(attrs, chunk);
    }
    return { name, attrs, children };
  };
}

export function isNode(value: unknown): value is Node {
  return typeof value === "string" || isFragment(value) || isTag(value);
}

export function isTag<T extends string>(value: unknown): value is Tag<T> {
  let record = value as Record<string, unknown>;
  return isFragment(value) && !!record.attrs &&
    typeof record.attrs === "object" && typeof record.name === "string";
}

export function isFragment(value: unknown): value is Fragment {
  return !!(value && typeof value === "object" &&
    Array.isArray((value as Record<string, unknown>).children));
}
