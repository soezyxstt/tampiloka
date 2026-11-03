import { pathToFileURL } from 'node:url';
export { purgeForm } from '../lib/storage/purge-form-retention.mjs';

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { runMaintenance } = await import('../lib/storage/maintenance.mjs');
  await runMaintenance({ apply: process.argv.includes('--apply'), cleanup: false });
  console.log('Retention maintenance complete');
}
