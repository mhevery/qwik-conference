import { component$, Host, Slot, useStore } from "@builder.io/qwik";
import type { IStory, IComment, IUser } from "./types";

/* eslint no-console: ["off"] */
export const pluralize = (n: number) => n + (n === 1 ? " reply" : " replies");

export const Nav = component$(
  () => {
    return (
      <header class="header">
        <nav class="inner">
          <a href="/hn/">
            <strong>HN</strong>
          </a>
          <a href="/hn/?type=new">
            <strong>New</strong>
          </a>
          <a href="/hn/?type=show">
            <strong>Show</strong>
          </a>
          <a href="/hn/?type=ask">
            <strong>Ask</strong>
          </a>
          <a href="/hn/?type=job">
            <strong>Jobs</strong>
          </a>
          <a
            class="github"
            href="http://github.com/builderio/qwikdev"
            target="_blank"
            rel="noreferrer"
          >
            Built with Qwik
          </a>
        </nav>
      </header>
    );
  },
  { tagName: "nav" }
);

export const StoryPreview = component$(
  (props: { story: IStory }) => {
    return (
      <li class="news-item">
        <span class="score">{props.story.points}</span>
        <span class="title">
          {props.story.url && !props.story.url.startsWith("item?id=") ? (
            <>
              <a
                href={"/hn" + props.story.url}
                target="_blank"
                rel="noreferrer"
              >
                {props.story.title}
              </a>
              <span class="host"> ({props.story.domain})</span>
            </>
          ) : (
            <a href={`/hn/item/${props.story.id}`}>{props.story.title}</a>
          )}
        </span>
        <br />
        <span class="meta">
          {props.story.type !== "job" ? (
            <>
              by{" "}
              <a href={`/hn/users/${props.story.user}`}>{props.story.user}</a>{" "}
              {props.story.time_ago} |{" "}
              <a href={`/hn/stories/${props.story.id}`}>
                {props.story.comments_count
                  ? `${props.story.comments_count} comments`
                  : "discuss"}
              </a>
            </>
          ) : (
            <a href={`/hn/stories/${props.story.id}`}>{props.story.time_ago}</a>
          )}
        </span>
        {props.story.type !== "link" && (
          <>
            {" "}
            <span class="label">{props.story.type}</span>
          </>
        )}
      </li>
    );
  },
  { tagName: "story-preview" }
);

export const Collapsible = component$(
  () => {
    const state = useStore({ open: true });
    return (
      <Host class={state.open ? "toggle open" : "toggle"}>
        <a onClick$={() => (state.open = !state.open)}>
          {state.open ? (
            "[-]"
          ) : (
            <>
              [+] <Slot name="count" />
            </>
          )}
        </a>
        {state.open ? <Slot /> : undefined}
      </Host>
    );
  },
  { tagName: "collapsible" }
);

export const Comment = component$(
  (props: { comment: IComment }) => {
    return (
      <li class="comment">
        <div class="by">
          <a href={`/hn/users/${props.comment.user}`}>{props.comment.user}</a>{" "}
          {props.comment.time_ago} ago
        </div>
        <div class="text" innerHTML={props.comment.content}></div>
        {props.comment.comments.length && (
          <>
            <Collapsible>
              <span q:slot="count">
                {pluralize(props.comment.comments.length) + " "}
                collapsed
              </span>
              <ul class="comment-children">
                {props.comment.comments.map((comment) => (
                  <Comment comment={comment} key={comment.id} />
                ))}
              </ul>
            </Collapsible>
          </>
        )}
      </li>
    );
  },
  { tagName: "comment" }
);

export const Stories = component$(
  (props: { path: string; params: any; data: any }) => {
    const { stories, page, type } = props.data;
    return (
      <div class="news-view">
        <div class="news-list-nav">
          {page > 1 ? (
            <a
              class="page-link"
              href={`/hn/?type=${type}&page=${page - 1}`}
              aria-label="Previous Page"
            >
              {"<"} prev
            </a>
          ) : (
            <span class="page-link disabled" aria-disabled="true">
              {"<"} prev
            </span>
          )}
          <span>page {page}</span>
          {stories && stories.length >= 29 ? (
            <a
              class="page-link"
              href={`/hn/?type=${type}&page=${page + 1}`}
              aria-label="Next Page"
            >
              more {">"}
            </a>
          ) : (
            <span class="page-link disabled" aria-disabled="true">
              more {">"}
            </span>
          )}
        </div>
        <main class="news-list">
          {stories && (
            <ul>
              {stories.map((story: IStory) => (
                <StoryPreview story={story} />
              ))}
            </ul>
          )}
        </main>
      </div>
    );
  },
  { tagName: "stories" }
);

export const Story = component$(
  (props: { path: string; params: any; data: any }) => {
    const story: IStory = props.data;
    return (
      story && (
        <div class="item-view">
          <div class="item-view-header">
            <a href={"/hn" + story.url} target="_blank">
              <h1>{story.title}</h1>
            </a>
            {story.domain && <span class="host">({story.domain})</span>}
            <p class="meta">
              {story.points} points | by{" "}
              <a href={`/hn/users/${story.user}`}>{story.user}</a>{" "}
              {story.time_ago} ago
            </p>
          </div>
          <div class="item-view-comments">
            <p class="item-view-comments-header">
              {story.comments_count
                ? story.comments_count + " comments"
                : "No comments yet."}
            </p>
            <ul class="comment-children">
              {story.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </ul>
          </div>
        </div>
      )
    );
  },
  { tagName: "story" }
);

export const User = component$(
  (props: { path: string; params: any; data: any }) => {
    const user: IUser = props.data;
    return (
      <div class="user-view">
        {user && user.error ? (
          <h1>User not found.</h1>
        ) : (
          <>
            <h1>User : {user.id}</h1>
            <ul class="meta">
              <li>
                <span class="label">Created:</span> {user.created}
              </li>
              <li>
                <span class="label">Karma:</span> {user.karma}
              </li>
              {user.about && <li class="about">{user.about}</li>}
            </ul>
            <p class="links">
              <a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>
                submissions
              </a>{" "}
              |{" "}
              <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>
                comments
              </a>
            </p>
          </>
        )}
      </div>
    );
  },
  { tagName: "user" }
);
