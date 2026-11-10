import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const sans = localFont({src:[{path:'../public/fonts/dm-sans-regular.ttf',weight:'400',style:'normal'},{path:'../public/fonts/dm-sans-bold.ttf',weight:'700',style:'normal'}],variable:'--font-sans',display:'swap'});
export const metadata: Metadata = {title:'Talkie Space | Coffee & Roastery, Garut',description:'Kopi, sarapan, dan ruang untuk bertemu di Jl. Suherman 52, Garut.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="id" className={sans.variable}><body>{children}</body></html>}
