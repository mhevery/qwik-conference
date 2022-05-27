/**
 * @license
 * Copyright Builder.io, Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */

import { Stories, Story, User } from "./components";
import { getStories, getStory, getUser } from "./api";
import Router from "url-router";
import { component$ } from "@builder.io/qwik";

export const router = new Router({
  "/stories/:id": {
    Page: Story,
    getData(url: URL, params: { id: string }) {
      return getStory(Number(params.id));
    },
  },
  "/users/:id": {
    Page: User,
    getData(url: URL, params: { id: string }) {
      return getUser(Number(params.id));
    },
  },
  "(.*)": {
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

export interface HackerNewsProps {
  url: string;
}

export const HackerNews = component$(async (props: HackerNewsProps) => {
  const {
    handler: { Page, getData },
    params,
  } = router.find(props.url)!;
  const data = await getData(new URL(props.url), params as { id: string });
  return <Page params={params} data={data} />;
});
