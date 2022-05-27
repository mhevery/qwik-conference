import { App } from "./components/app/app";
import { Counter } from "./components/logo/counter";
import { Watch } from "./components/logo/watch";
import { HackerNews } from "./hackernews/main";

export const router = new Router({
  "/hello": {
    Page: Story,
    getData(url: URL, params: { id: string }) {
      return getStory(Number(params.id));
    },
  },
  "/counter": {
    Page: User,
    getData(url: URL, params: { id: string }) {
      return getUser(Number(params.id));
    },
  },
  "/hn/(.*)": {
    Page: Stories,
    async getData(url: URL) {
      const { searchParams } = url;
      const type = searchParams.get("type") || "top";
      const page = parseInt(searchParams.get("page") as string, 10) || 1;
      const stories = await getStories(type as any, page);
      return { type, page, stories };
    },
  },
});

export const Root = (props: { url: string }) => {
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
