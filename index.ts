/**
 * @loony_nodejs
 */
import { App, getAppConfig } from 'loony-deno';

(async () => {
  const config = getAppConfig();
  await App(config)
})();
