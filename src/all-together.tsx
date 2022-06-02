import { component$, Host } from "@builder.io/qwik";
import { Clock } from "./clock";
import { Counter } from "./counter";
import { HelloWorld } from "./hello-world";
import { Reactivity } from "./reactivity";
import { TodoApp } from "./todo/todo";

export const AllTogether = component$(() => {
  return (
    <Host>
      <HelloWorld />
      <hr />
      <Counter />
      <hr />
      <Reactivity />
      <hr />
      <TodoApp />
      <hr />
      <Clock />
      <hr />
    </Host>
  );
});
