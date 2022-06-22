import { component$, useStore } from "@builder.io/qwik";

export const Counter = component$(() => {
  const store = useStore({ count: 0 });

  return (
    <div>
      <p>Count: {store.count}</p>
      <p>
        <button onClick$={() => store.count++}>Click</button>
        <button onClick$={() => console.log("ABC")}>Hello</button>
      </p>
    </div>
  );
});

////////////////////////////////////////////////////////////////////////////////

// export const Counter_onClick = () => store.count++;

// import { useLexicalScope } from "@builder.io/qwik";
// export const Counter_onClick = () => {
//   const [store] = useLexicalScope();
//   store.count++;
// };
