import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Classico Coffee & Bake · Bandung",
 description: "Jelajahi kopi, sarapan, dan hidangan Classico Coffee & Bake. Jl. Sukaresmi No. 19A, Bandung.",
 robots: {index:false,follow:false},
 icons:{icon:"/images/symbol.png"},
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="id"><body>{children}</body></html>;
}
