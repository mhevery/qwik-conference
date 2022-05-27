import { App } from "./components/app/app";
import { Counter } from "./components/counter";
import { Watch } from "./components/watch";
import { HackerNews } from "./hackernews/main";

export const router = new Router({
  "/hello": { Page: App },
  "/counter": { Page: Counter },
  "/clock": { Page: Clock },
  "/hn/(.*)": { Page: HackerNews },
});

export const Root = (props: { url: string }) => {
  const {
    handler: { Page, getData },
    params,
  } = router.find(new URL(props.url).pathname)!;
  const data = await getData(new URL(props.url), params as { id: string });

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        {/* <App /> */}
        {/* <Counter /> */}
        {/* <Watch /> */}
        <HackerNews url={props.url} />
      </body>
    </html>
  );
};
