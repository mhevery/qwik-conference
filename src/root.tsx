import { App } from "./components/app/app";
import { Counter } from "./counter";
import { Reactivity } from "./reactivity";
import { HackerNews } from "./hackernews/main";
import Router from "url-router";
import { component$, Host } from "@builder.io/qwik";
import { ClockApp } from "./clock";
import { TodoApp } from "./todo/todo";
import { Styling } from "./styles/styling";

export const Index = component$(() => {
  return (
    <Host>
      <ul>
        <li>
          <a href="/hello">Hello World</a>
        </li>
        <li>
          <a href="/counter">Counter</a>
        </li>
        <li>
          <a href="/reactivity">Reactivity</a>
        </li>
        <li>
          <a href="/clock">Clock</a>
        </li>
        <li>
          <a href="/styling">Styling</a>
        </li>
        <li>
          <a href="/hn/">Hacker News</a>
        </li>
        <li>
          <a href="/todo">To do</a>
        </li>
        <li>
          <a href="/architecture">[TODO] Architecture comparison</a>
        </li>
      </ul>
    </Host>
  );
});

export const router = new Router({
  "/(.*)": { Page: Index },
  "/hello": { Page: App },
  "/counter": { Page: Counter },
  "/reactivity": { Page: Reactivity },
  "/clock": { Page: ClockApp },
  "/hn/(.*)": { Page: HackerNews },
  "/todo": { Page: TodoApp },
  "/styling": { Page: Styling },
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
