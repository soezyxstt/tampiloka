import { runMaintenance } from '../lib/storage/maintenance.mjs';
await runMaintenance({ apply: process.argv.includes('--apply'), retention: false });
console.log('Upload maintenance complete');
