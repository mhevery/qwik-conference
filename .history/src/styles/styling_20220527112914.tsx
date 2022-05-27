import { component$, Host, useStore, useStyles$ } from "@builder.io/qwik";
import StylingCSS from "./Styling.css";
import ChildCSS from "./Child.css";
import SiblingCSS from "./Sibling.css";

export const Styling = component$(() => {
  const store = useStore({ open: false, siblings: [0] });
  useStyles$(StylingCSS);

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

export const Child = component$(() => {
  useStyles$(ChildCSS);
  return (
    <Host class="child">
      <div>Child</div>
    </Host>
  );
});

export const Sibling = component$(() => {
  useStyles$(SiblingCSS);

  return (
    <Host class="sibling">
      <div>Sibling</div>
    </Host>
  );
});
