import { App } from "./components/app/app";
import { Counter } from "./components/logo/counter";
import { Watch } from "./components/logo/watch";
import { HackerNews } from "./hackernews/main";
export const Root = (props: { url: { pathname: string; search: string } }) => {
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
