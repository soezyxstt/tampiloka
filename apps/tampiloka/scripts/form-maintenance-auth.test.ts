import { test, expect } from 'bun:test';
import { GET } from '../app/api/cron/form-maintenance/route';

test('cron denies missing, short and incorrect credentials before accessing maintenance', async () => {
  const previous = process.env.CRON_SECRET;
  try {
    delete process.env.CRON_SECRET;
    expect((await GET(new Request('http://localhost'))).status).toBe(401);
    process.env.CRON_SECRET = 'short';
    expect((await GET(new Request('http://localhost', {headers:{authorization:'Bearer short'}}))).status).toBe(401);
    process.env.CRON_SECRET = 'x'.repeat(43);
    expect((await GET(new Request('http://localhost', {headers:{authorization:'Bearer ' + 'y'.repeat(43)}}))).status).toBe(401);
  } finally { if (previous === undefined) delete process.env.CRON_SECRET; else process.env.CRON_SECRET = previous; }
});
