/** @type {import('next').NextConfig} */

import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
	// additionalPrecacheEntries: [{ url: "/offline-fallback", revision }],
});

const nextConfig = {};
export default withSerwist(nextConfig);
