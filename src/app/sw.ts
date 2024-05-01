import { defaultCache } from "@serwist/next/browser";
import type { PrecacheEntry } from "@serwist/precaching";
import { fallbacks, installSerwist } from "@serwist/sw";

declare const self: ServiceWorkerGlobalScope & {
  // Change this attribute's name to your `injectionPoint`.
  // `injectionPoint` is an InjectManifest option.
  // See https://serwist.pages.dev/docs/build/inject-manifest/configuring
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

const revision = crypto.randomUUID();

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  runtimeCaching: [
    ...defaultCache,
    ...fallbacks({
      runtimeCaching: defaultCache,
      entries: [
        // {
        //   url: "/offline",
        //   revision,
        //   matcher({ request }) {
        //     return request.destination === "document";
        //   },
        // },
        {
          url: "/page-a/offline",
          revision,
          matcher({ request }) {
            return (
              request.destination === "document" &&
              new URL(request.url).pathname === "/page-a"
            );
          },
        },
        {
          url: "/page-b/offline",
          revision,
          matcher({ request }) {
            return (
              request.destination === "document" &&
              new URL(request.url).pathname === "/page-b"
            );
          },
        },
      ],
    }),
  ],
  importScripts: ["custom-sw.js"],
});
