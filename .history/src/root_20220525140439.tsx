import { App } from "./components/app/app";
import { Counter } from "./components/logo/counter";

export const Root = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        {/* <App /> */}
        <Counter />
      </body>
    </html>
  );
};
