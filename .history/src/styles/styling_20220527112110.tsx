import { component$, Host, useStore, useStyles$ } from "@builder.io/qwik";
import StylingCSS from "./Styling.css";
import ChildCSS from "./Child.css";

export const Styling = component$(() => {
  const store = useStore({ open: false });
  useStyles$(StylingCSS);

  return (
    <Host class="parent">
      <div>Styling</div>
      <button onClick$={() => (store.open = !!store.open)}>toggle</button>
      {store.open ? <Child /> : null}
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
