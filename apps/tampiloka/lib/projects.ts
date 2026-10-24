import { TEMURA_DEMO_URL } from "@/lib/temura-url";

export const PROJECTS = [
  {
    id: "pagi-roti",
    name: "Pagi & Roti",
    category: "Kuliner",
    url: "https://demo-cafe-1.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#cerita", "#nuansa", "#menu", "#suasana", "#lokasi"],
  },
  {
    id: "syahril-mc",
    name: "Syahril MC",
    category: "Portofolio",
    url: "https://syahril.tampiloka.site/",
    scrollStops: ["", "#about", "#karakter", "#portfolio", "#faq"],
  },
  {
    id: "zyx-academy",
    name: "Zyx Academy",
    category: "Edukasi",
    url: "https://www.zyxacademy.com/",
    scrollStops: ["", "#pricing"],
  },
  {
    id: "tepi-sagara",
    name: "Tepi Sagara",
    category: "Kuliner",
    url: "https://demo-fnb-2.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#suasana", "#menu", "#galeri", "#tentang", "#lokasi", "#kabar"],
  },
  {
    id: "sela-rasa",
    name: "Sela Rasa",
    category: "Kuliner",
    url: "https://demo-fnb-1.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#menu", "#pilihan", "#acara", "#ruang-kumpul", "#tentang", "#lokasi"],
  },
  {
    id: "rona-forma",
    name: "Rona Forma",
    category: "Katalog",
    url: "https://demo-katalog-1.tampiloka.adihnursyam.com/",
    scrollStops: ["", "#editor-picks", "#everyday-edit", "#10003", "#10001", "#10005", "#top"],
  },
  {
    id: "ginalist",
    name: "Ginalist",
    category: "Portofolio",
    url: "https://ginalist.tampiloka.site/",
    scrollStops: ["", "#work", "#runway", "#about", "#journal", "#contact"],
  },
  {
    id: "iam-itb",
    name: "IAM ITB",
    category: "Organisasi",
    url: "https://iamitb.org/",
    scrollStops: [""],
  },
  {
    id: "pamoka",
    name: "PAMOKA",
    category: "Organisasi",
    url: "https://www.pamokagarut.com/",
    scrollStops: ["", "#filosofi-tema", "#rangkaian-kegiatan", "#partisipasi"],
  },
  {
    id: "temura-nara-aruna",
    name: "Nara & Aruna",
    category: "Undangan digital",
    url: TEMURA_DEMO_URL,
    scrollStops: [""],
  },
] as const;

export type Project = (typeof PROJECTS)[number];
