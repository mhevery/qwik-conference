import { App } from "./components/app/app";
import { Counter } from "./counter";
import { Clock } from "./clock";
import { HackerNews } from "./hackernews/main";
import Router from "url-router";

export const router = new Router({
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
