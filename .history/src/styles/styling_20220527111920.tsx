import { component$, Host, useStore, useStyles$ } from "@builder.io/qwik";

export const Styling = component$(() => {
  const store = useStore({ open: false });

  return (
    useStyles$();
    <Host>
      <div>Styling</div>
      <button onClick$={() => (store.open = !!store.open)}>toggle</button>
      {store.open ? <Child /> : null}
    </Host>
  );
});

export const Child = component$(() => {
  return (
    <Host>
      <div>Child</div>
    </Host>
  );
});
