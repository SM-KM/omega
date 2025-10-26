// app.config.ts
import { type ExpoConfig } from '@expo/config';
import { execSync } from 'node:child_process';

function get(cmd: string) {
  try { return execSync(cmd).toString().trim(); } catch { return 'unknown'; }
}

const GIT_BRANCH = get('git rev-parse --abbrev-ref HEAD');
const GIT_SHA = get('git rev-parse HEAD');
const ENV = process.env.APP_ENV ?? 'dev'; // cámbialo con APP_ENV=staging|prod si quieres

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  name: config.name ?? 'Omega',
  slug: config.slug ?? 'omega',
  extra: {
    ...config.extra,
    GIT_BRANCH,
    GIT_SHA,
    ENV,
  },
});
