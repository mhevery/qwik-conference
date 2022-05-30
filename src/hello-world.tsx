import { component$, Host } from "@builder.io/qwik";
import { Logo } from "./logo";

import "./global.css";

export const HelloWorld = component$(() => {
  return (
    <Host class="my-app p-20">
      <Logo class="mb-10" />

      <h1 class="text-3xl mb-2">Congratulations Qwik is working!</h1>
      <hr class="mt-10" />
      <p class="text-center text-sm mt-2">
        Made with ❤️ by{" "}
        <a target="_blank" href="https://www.builder.io/">
          Builder.io
        </a>
      </p>
    </Host>
  );
});
