import type {Metadata} from 'next';
import {Inter,Manrope,Cormorant_Garamond} from 'next/font/google';
import './globals.css';
const inter=Inter({variable:'--font-inter',subsets:['latin'],weight:['400','600']});
const manrope=Manrope({variable:'--font-manrope',subsets:['latin'],weight:['600','700']});
const cormorant=Cormorant_Garamond({variable:'--font-invitation-serif',subsets:['latin'],weight:['300','400','500','600','700']});
export const metadata:Metadata={title:'Nara & Aruna — Temura',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="id" className={`${inter.variable} ${manrope.variable} ${cormorant.variable}`}><body>{children}</body></html>;}
