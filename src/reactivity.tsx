import { component$, useWatch$, useStore } from "@builder.io/qwik";

interface State {
  count: number;
  debouncedCount: number;
}

export const Reactivity = component$(
  () => {
    const store = useStore<State>({
      count: 0,
      debouncedCount: 0,
    });

    useWatch$((track) => {
      // track changes in store.count
      track(store, "count");
      console.log("count changed");

      const timer = setTimeout(() => {
        store.debouncedCount = store.count;
      }, 2000);
      return () => clearTimeout(timer);
    });

    console.log("<Reactivity> renders");
    return (
      <div>
        <Child state={store} />
        <button id="add" onClick$={() => store.count++}>
          +
        </button>
      </div>
    );
  },
  { tagName: "reactivity" }
);

export const Child = component$(
  (props: { state: State }) => {
    console.log("<Child> render");
    return (
      <div>
        <div id="child">{props.state.count}</div>
        <GrandChild state={props.state} />
      </div>
    );
  },
  { tagName: "child" }
);

export const GrandChild = component$(
  (props: { state: State }) => {
    console.log("<GrandChild> render");
    return <div id="debounced">Debounced: {props.state.debouncedCount}</div>;
  },
  { tagName: "grandchild" }
);
