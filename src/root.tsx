import { HelloWorld } from "./hello-world";
import { Counter } from "./counter";
import { Reactivity } from "./reactivity";
import { HackerNews } from "./hackernews/main";
import Router from "url-router";
import { component$, Host } from "@builder.io/qwik";
import { ClockApp } from "./clock";
import { TodoApp } from "./todo/todo";
import { Styling } from "./styles/styling";
import { ArchApp } from "./arch/my-app";

export const Index = component$(() => {
  return (
    <Host>
      <ul>
        <li>
          <a href="/hello">Hello World</a> - Understanding basic app.
        </li>
        <li>
          <a href="/counter">Counter</a> - Understanding lazy loading and
          closure serialization.
        </li>
        <li>
          <a href="/reactivity">Reactivity</a> - Understanding reactivity
          created on server and transferred to client.
        </li>
        <li>
          <a href="/clock">Clock</a> - Understanding visible intersections.
        </li>
        <li>
          <a href="/hn/">Hacker News</a> - Understanding data-shaking.
        </li>
        <li>
          <a href="/todo">To do</a> - Understanding resumability.
        </li>
        <li>
          <a href="/architecture">Architecture comparison</a> Understanding how
          the mental model is different.
        </li>
        <li>
          <a href="/styling">Styling</a>
        </li>
      </ul>
    </Host>
  );
});

export const router = new Router({
  "/(.*)": { Page: Index },
  "/hello": { Page: HelloWorld },
  "/counter": { Page: Counter },
  "/reactivity": { Page: Reactivity },
  "/clock": { Page: ClockApp },
  "/hn/(.*)": { Page: HackerNews },
  "/todo": { Page: TodoApp },
  "/styling": { Page: Styling },
  "/architecture": { Page: ArchApp },
});

export const Root = (props: { url: string }) => {
  const {
    handler: { Page },
  } = router.find(new URL(props.url).pathname)!;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Page url={props.url} />
      </body>
    </html>
  );
};
