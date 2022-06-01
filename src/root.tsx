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
      <table>
        <tr>
          <th></th>
          <th>Demo</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>🔩</td>
          <td>
            <a href="/hello">Hello World</a>
          </td>
          <td>Understanding basic static app.</td>
        </tr>
        <tr>
          <td>🔢</td>
          <td>
            <a href="/counter">Counter</a>
          </td>
          <td>Understanding lazy loading and closure serialization.</td>
        </tr>
        <tr>
          <td>⚡️</td>
          <td>
            <a href="/reactivity">Reactivity</a>
          </td>
          <td>
            Understanding reactivity created on server and transferred to
            client.
          </td>
        </tr>
        <tr>
          <td>⏰</td>
          <td>
            <a href="/clock">Clock</a>
          </td>
          <td>Understanding visible intersections.</td>
        </tr>
        <tr>
          <td>📰</td>
          <td>
            <a href="/hn/">Hacker News</a>
          </td>
          <td>Understanding data-shaking.</td>
        </tr>
        <tr>
          <td>✅</td>
          <td>
            <a href="/todo">To do</a>
          </td>
          <td>Understanding resumability.</td>
        </tr>
        <tr>
          <td>🏛</td>
          <td>
            <a href="/architecture">Architecture comparison</a>
          </td>
          <td>Understanding how the mental model is different</td>
        </tr>
        <tr>
          <td>🌅</td>
          <td>
            <a href="/styling">Styling</a>
          </td>
          <td>Understanding styling lazy loading.</td>
        </tr>
      </table>
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
