import { component$, Host, useStore, useStyles$ } from "@builder.io/qwik";
import StylingCSS from "./Styling.css";
import ChildCSS from "./Child.css";
import SiblingCSS from "./Sibling.css";

export const Styling = component$(() => {
  const store = useStore({ open: false, siblings: [] });
  useStyles$(StylingCSS);

  return (
    <Host class="parent">
      <div>Styling</div>
      <button onClick$={() => (store.open = !!store.open)}>toggle</button>
      <button onClick$={() => store.siblings.push()}>addSibling</button>
      {store.open ? <Child /> : null}
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
