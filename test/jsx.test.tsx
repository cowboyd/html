import { describe, it } from "https://deno.land/std@0.188.0/testing/bdd.ts";
import { expect } from "https://deno.land/x/expect@v0.3.0/mod.ts";

describe("JSX runtime", () => {
  it("generates simple tags", () => {
    expect(<p>Hello</p>).toEqual({
      name: "p",
      attrs: {},
      children: ["Hello"],
    });
  });
  it("can generate simple fragments", () => {
    expect(<>Hello</>).toEqual({
      children: ["Hello"],
    });
  });
  it("can generate fragments with multiple elements", () => {
    expect(
      <>
        Hello, <em>World</em>
      </>,
    ).toEqual({
      children: [
        "Hello, ",
        { name: "em", attrs: {}, children: ["World"] },
      ],
    });
  });

  it("flattens fragments within mixed elements and fragments", () => {
    expect(
      <>
        Hello<>
          World<b>!</b>
        </>
      </>,
    ).toEqual({
      children: [
        "Hello",
        "World",
        { name: "b", attrs: {}, children: ["!"] },
      ],
    });
  });

  it("flattens fragments within fragments even if that is all there is", () => {
    expect(
      <>
        Hello<>World</>
      </>,
    ).toEqual({
      children: ["Hello", "World"],
    });
  });

  it("deeply flattens fragments within fragments", () => {
    expect(
      <>
        Hello
        <>
          to <em>the</em>
          <>
            world <>!</>
          </>
        </>
      </>,
    ).toEqual({
      children: [
        "Hello",
        "to ",
        { name: "em", attrs: {}, children: ["the"] },
        "world ",
        "!",
      ],
    });
  });

  it("can embed numeric expressions inside", () => {
    expect(<title>A tale of {1 + 1} cities</title>).toEqual({
      name: "title",
      attrs: {},
      children: ["A tale of ", "2", " cities"],
    });
  });

  it("can embed numeric expressions inside a fragment", () => {
    expect(<>A tale of {1 + 1} cities</>).toEqual({
      children: ["A tale of ", "2", " cities"],
    });
  });

  it("can embed boolean expressions inside", () => {
    expect(<title>{false} witness</title>).toEqual({
      name: "title",
      attrs: {},
      children: ["false", " witness"],
    });
  });

  it("allows embedded exmpressions that return elements", () => {
    expect(<ul>{[1, 2, 3].map((i) => <li>{i}</li>)}</ul>).toEqual({
      name: "ul",
      attrs: {},
      children: [
        { name: "li", attrs: {}, children: ["1"] },
        { name: "li", attrs: {}, children: ["2"] },
        { name: "li", attrs: {}, children: ["3"] },
      ],
    });
  });

  it("allows embedded fragments", () => {
    const numbers = (
      <>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </>
    );
    expect(<ul>{numbers}</ul>).toEqual({
      name: "ul",
      attrs: {},
      children: [
        { name: "li", attrs: {}, children: ["1"] },
        { name: "li", attrs: {}, children: ["2"] },
        { name: "li", attrs: {}, children: ["3"] },
      ],
    });
  });

  it("allows spreading of embedded arrays", () => {
    expect(<ul>{...[1, 2, 3].map((i) => <li>{i}</li>)}</ul>).toEqual({
      name: "ul",
      attrs: {},
      children: [
        { name: "li", attrs: {}, children: ["1"] },
        { name: "li", attrs: {}, children: ["2"] },
        { name: "li", attrs: {}, children: ["3"] },
      ],
    });
  });
});
