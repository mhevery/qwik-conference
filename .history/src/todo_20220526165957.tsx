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
