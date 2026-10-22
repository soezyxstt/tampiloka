import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const body = localFont({src:'../public/fonts/dm-sans.ttf',variable:'--font-body',display:'swap'});
export const metadata: Metadata = {title:'Bumi Upi — Rumah Tamah, Garut',description:'Sarapan, makan, dan bertukar cerita di Bumi Upi. Jelajahi menu dan temukan kami di Jalan Cimanuk 312, Garut.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="id"><body className={body.variable}>{children}</body></html> }
