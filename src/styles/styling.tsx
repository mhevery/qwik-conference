import { component$, Host, useScopedStyles$, useStore } from "@builder.io/qwik";
import StylingCSS from "./Styling.css";
import ChildCSS from "./Child.css?inline";
import SiblingCSS from "./Sibling.css?inline";

export const Styling = component$(() => {
  useScopedStyles$(StylingCSS);
  const store = useStore({ open: false, siblings: [0] });

  return (
    <Host class="parent">
      <button onClick$={() => (store.open = !store.open)}>toggle</button>
      <button onClick$={() => store.siblings.push(0)}>addSibling</button>
      {JSON.stringify(store)}
      {store.open ? <Child key="child" /> : null}
      {store.siblings.map(() => (
        <Sibling />
      ))}
    </Host>
  );
});

export const Child = component$(
  () => {
    useScopedStyles$(ChildCSS);
    return (
      <Host class="child">
        <div>Child</div>
      </Host>
    );
  },
  { tagName: "child" }
);

export const Sibling = component$(
  () => {
    useScopedStyles$(SiblingCSS);

    return (
      <Host class="sibling">
        <div>Sibling</div>
      </Host>
    );
  },
  { tagName: "sibling" }
);
