import Image from "next/image";
import Link from "next/link";

export function BrandCredit({ dark = false }: { dark?: boolean }) {
  const theme = dark ? "dark" : "light";
  return <Link href="/" className="mx-auto mt-8 block w-fit" aria-label="Temura — Digital Invitations by Tampiloka"><Image src={`/brand/logos/${theme}/temura-horizontal-endorsed-${theme}.svg`} alt="Temura — Digital Invitations by Tampiloka" width={224} height={84} /></Link>;
}
