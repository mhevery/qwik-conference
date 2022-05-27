import { App } from "./components/app/app";
import { Counter } from "./components/logo/counter";
import { Watch } from "./components/logo/watch";

export const Root = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        {/* <App /> */}
        {/* <Counter /> */}
        <Watch />
      </body>
    </html>
  );
};
