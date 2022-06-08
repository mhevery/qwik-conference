import { component$ } from "@builder.io/qwik";
import { ArchExamples, Cmp } from "./architecture";
/* eslint no-console: ["off"] */

export const monolith = createApp();
export const lazy = createApp();
export const islands = createApp();
export const resumables = createApp();

export const ArchApp = component$(() => {
  return (
    <ArchExamples
      monolith={monolith}
      lazy={lazy}
      islands={islands}
      resumables={resumables}
    />
  );
});

function createApp(): Cmp {
  const product = { class: "product" } as Cmp;
  const cart = {} as Cmp;
  return {
    class: "root",
    children: [
      {
        class: "header",
        isLazy: true,
        children: [
          {
            children: [{}, {}, {}],
          },
          {},
          {},
          {},
          {},
          { children: [{}, {}] },
          {},
          cart,
        ],
      },
      {
        class: "middle",
        children: [
          {
            isLazy: true,
            class: "left",
            children: [{}, {}, {}, {}],
          },
          {
            class: "main",
            isLazy: true,
            children: [
              {
                class: "product-main",
                children: [
                  product,
                  {
                    class: "product-details",
                    children: [
                      { related: product },
                      { related: product },
                      { related: product },
                      { related: product },
                      { related: product },
                      { related: product },
                    ],
                  },
                ],
              },
              {
                class: "product-side",
                children: [
                  { related: cart },
                  { related: cart },
                  { related: cart },
                  { related: cart },
                  { related: cart },
                  { related: cart },
                ],
              },
            ],
          },
        ],
      },
      {
        class: "footer",
        isLazy: true,
        children: [
          {
            children: [{}, {}, {}],
          },
          {},
          {},
        ],
      },
    ],
  };
}
