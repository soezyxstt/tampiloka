import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('out');
const port=Number(process.env.PORT||3036);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2','.ico':'image/x-icon'};
createServer(async(req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
  if(!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  const info=await stat(file);if(!info.isFile())throw new Error('missing');
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'});
  if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Halaman tidak ditemukan.');}
}).listen(port,'127.0.0.1',()=>console.log(`Classico demo: http://localhost:${port}`));
