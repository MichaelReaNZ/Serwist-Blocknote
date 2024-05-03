import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
	}
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: defaultCache,
	// importScripts: ["custom-sw.js"],

	fallbacks: {
		entries: [
			{
				url: "/offline-fallback", //Fallback to home page (this should already be cached)
				matcher: ({ request }) => request.destination === "document",
			},
			// 		// {
			// 		// 	url: "/note-offline-fallback",
			// 		// 	matcher: ({ request }) =>
			// 		// 		request.destination === "document" && new URL(request.url).pathname.startsWith("/Note/"),
			// 		// },
		],
	},
});

serwist.addEventListeners();
