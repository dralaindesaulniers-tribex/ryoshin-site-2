import type { OpenNextConfig } from '@opennextjs/cloudflare';

const config = {
  default: {
    override: {
      wrapper: 'cloudflare-node-compat',
      converter: 'cloudflare',
      incrementalISRAndSWR: 'true',
    },
  },
  dangerous: {
    useNodeJsRuntimes: true,
  },
} satisfies OpenNextConfig;

export default config;
