import { App } from "./components/app/app";
import { Counter } from "./counter";
import { Clock } from "./clock";
import { HackerNews } from "./hackernews/main";
import Router from "url-router";
import { component$ } from "@builder.io/qwik";

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
          <a href="/clock">Clock</a>
        </li>
        <li>
          <a href="/hn/">Hacker News</a>
        </li>
      </ul>
    </Host>
  );
});

export const router = new Router({
  "/(.*)": { Page: Index },
  "/hello": { Page: App },
  "/counter": { Page: Counter },
  "/clock": { Page: Clock },
  "/hn/(.*)": { Page: HackerNews },
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