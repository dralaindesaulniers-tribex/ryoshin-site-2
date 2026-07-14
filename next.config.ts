import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Cloudflare bindings in `next dev`. Skippable because the local workerd
// runtime cannot start in some sandboxed dev environments; the site itself
// uses no bindings, so dev behavior is identical either way.
if (!process.env.SKIP_CF_DEV) {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
