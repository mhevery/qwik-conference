export const App = component$(() => {
  useStyles$(styles);

  const todos = useStore<Todos>({
    filter: "all",
    items: [
      { completed: false, title: "Read Qwik docs" },
      { completed: false, title: "Build HelloWorld" },
      { completed: false, title: "Profit" },
    ],
  });
  useContextProvider(TODOS, todos);

  return (
    <section class="todoapp">
      <Header />
      <Body />
      <Footer />
    </section>
  );
});

import { component$, Host, useContext } from "@builder.io/qwik";
import { FILTERS, TODOS } from "../../state/state";
import { Item } from "../item/item";

export const Body = component$(() => {
  const todos = useContext(TODOS);
  return (
    <Host class="main">
      <ul class="todo-list">
        {todos.items.filter(FILTERS[todos.filter]).map((key) => (
          <Item item={key} />
        ))}
      </ul>
    </Host>
  );
});
