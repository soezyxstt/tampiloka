import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const options = [
  { id: "dinner", title: "Makan malam di rooftop", description: "Hubungi tim Historia untuk pengaturan meja, pilihan hidangan dan ketersediaan rooftop." },
  { id: "celebration", title: "Perayaan bersama", description: "Ulang tahun, pencapaian kecil, atau waktu bersama orang terdekat. Tanyakan pilihan tempat dan pengaturan meja." },
  { id: "meeting", title: "Pertemuan & gathering", description: "Ruang untuk bertukar ide dan berkumpul bersama. Hubungi kami untuk pilihan pengaturan dan ketersediaan tempat." },
];

export function EventOptions() {
  return <Accordion className="event-details" multiple={false} defaultValue={["dinner"]}>{options.map(option => <AccordionItem key={option.id} value={option.id}><AccordionTrigger>{option.title}</AccordionTrigger><AccordionContent><p>{option.description}</p></AccordionContent></AccordionItem>)}</Accordion>;
}
