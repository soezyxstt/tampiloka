"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, Check, Copy, Download, Heart, LayoutDashboard, Mail, MessageSquare, Palette, Plus, Settings2, Users } from "lucide-react";
import { useDashboardDemo, type DashboardData, type Guest } from "./demo-store";

const tabs = [
  { id: "overview", label: "Ringkasan", icon: LayoutDashboard },
  { id: "details", label: "Data undangan", icon: Mail },
  { id: "guests", label: "Daftar tamu", icon: Users },
  { id: "responses", label: "RSVP & ucapan", icon: MessageSquare },
  { id: "settings", label: "Isi & pengaturan", icon: Settings2 },
] as const;
type Tab = typeof tabs[number]["id"];
const labels = { pending: "Belum menjawab", attending: "Hadir", declined: "Tidak hadir" };
function csvCell(value: string) {
  const safe = /^[=+@\-\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}
function validUrl(value: string) {
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}

export function CustomerDashboard() {
  const [data, update] = useDashboardDemo();
  const [tab, setTab] = useState<Tab>("overview");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestGroup, setGuestGroup] = useState("Keluarga");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const attending = data.guests.filter((guest) => guest.attendance === "attending").length;
  const answered = data.guests.filter((guest) => guest.attendance !== "pending").length;
  const wishes = data.guests.filter((guest) => guest.wish.trim());
  const activeTab = tabs.find((item) => item.id === tab)!;
  function save(next: DashboardData, message = "Tersimpan di browser ini.") {
    try { update(next); setNotice(message); return true; }
    catch { setNotice("Browser tidak dapat menyimpan data. Izinkan penyimpanan lokal lalu coba lagi."); return false; }
  }
  function setField<K extends keyof DashboardData>(key: K, value: DashboardData[K]) { save({ ...data, [key]: value }); }
  function saveForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const next = { ...data };
    for (const key of ["couple", "date", "venue", "address", "maps", "welcome", "song", "giftMessage"] as const) {
      if (values.has(key)) next[key] = String(values.get(key) ?? "").trim();
    }
    if ((next.maps && !validUrl(next.maps)) || (next.song && !validUrl(next.song))) {
      setNotice("Gunakan tautan lengkap dengan https:// untuk Maps atau musik."); return false;
    }
    return save(next);
  }
  async function copyLink(name = "Tamu Temura") {
    const url = new URL("/preview/adat-sunda", window.location.origin);
    url.searchParams.set("to", name);
    try { await navigator.clipboard.writeText(url.toString()); setNotice(`Tautan demo untuk ${name} disalin.`); }
    catch { setNotice(`Salin tautan demo: ${url.toString()}`); }
  }
  function addGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!guestName.trim()) return;
    const guest: Guest = { id: crypto.randomUUID(), name: guestName.trim(), group: guestGroup, attendance: "pending", wish: "" };
    if (save({ ...data, guests: [...data.guests, guest] }, "Tamu ditambahkan ke demo lokal.")) setGuestName("");
  }
  function updateGuest(id: string, patch: Partial<Guest>) {
    save({ ...data, guests: data.guests.map((guest) => guest.id === id ? { ...guest, ...patch } : guest) });
  }
  function exportGuests() {
    const rows = [["Nama", "Kelompok", "RSVP", "Ucapan"], ...data.guests.map((guest) => [guest.name, guest.group, labels[guest.attendance], guest.wish])];
    const url = URL.createObjectURL(new Blob(["\uFEFF", rows.map((row) => row.map(csvCell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "temura-tamu-demo.csv"; anchor.click(); URL.revokeObjectURL(url);
    setNotice("Daftar tamu demo diekspor.");
  }
  return <div className="customer-dashboard type-body">
    <aside className="cd-sidebar">
      <Link href="/" aria-label="Kembali ke beranda Temura"><Image src="/brand/logos/light/temura-horizontal-light.svg" alt="Temura" width={168} height={48} priority /></Link>
      <div className="cd-workspace"><span className="cd-avatar"><Heart size={20} /></span><div><strong className="type-label">Ruang undangan</strong><p className="type-caption">{data.couple}</p></div></div>
      <nav aria-label="Dashboard pelanggan">{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-current={tab === id ? "page" : undefined} className={`type-label ${tab === id ? "is-active" : ""}`} onClick={() => { setTab(id); setNotice(""); }}><Icon size={18} />{label}</button>)}<Link href="/studio" className="type-label"><Palette size={18} />Buka Studio<ArrowUpRight size={14} /></Link></nav>
      <div className="cd-sidebar-note"><Link href="/" className="type-label">Kembali ke website ↗</Link></div>
    </aside>
    <main className="cd-main">
      <header className="cd-topbar"><span className="type-label">Dashboard / {activeTab.label}</span></header>
      <div className="cd-content">
        <div className="cd-page-heading"><div><h1 className="type-heading-2">{tab === "overview" ? "Ringkasan" : activeTab.label}</h1></div><button className="cd-button type-label" onClick={() => copyLink()}><Copy size={16} />Salin tautan demo</button></div>
        <p className="cd-demo-notice type-body-sm">Demo lokal. Perubahan tersimpan di browser ini.</p>
        <div className="cd-status type-body-sm" role="status" aria-live="polite">{notice}</div>
        {tab === "overview" && <>
          <section className="cd-invitation-banner"><div><h2 className="type-heading-2">{data.couple}</h2><p>{data.date ? new Date(`${data.date}T00:00:00`).toLocaleDateString("id-ID", { dateStyle: "long" }) : "Tanggal acara belum diisi"}{data.venue ? ` · ${data.venue}` : ""}</p><div className="cd-actions"><button className="cd-button cd-primary type-label" onClick={() => setTab("details")}>Lengkapi data<ArrowUpRight size={16} /></button><Link href="/studio" className="cd-button type-label">Buka Studio</Link></div></div></section>
          <section className="cd-metrics" aria-label="Ringkasan data demo">{[["Tamu di daftar", data.guests.length, Users], ["Konfirmasi hadir", attending, Check], ["Belum menjawab", data.guests.length - answered, Mail], ["Ucapan masuk", wishes.length, Heart]].map(([label, value, Icon]) => { const MetricIcon = Icon as typeof Users; return <div className="cd-metric" key={String(label)}><MetricIcon size={19} /><strong className="type-heading-2">{String(value)}</strong><span className="type-body-sm">{String(label)}</span></div>; })}</section>
          <div className="cd-two-columns"><section className="cd-panel"><h2 className="type-heading-5">Langkah berikutnya</h2><div className="cd-checklist">{[{ title: "Isi tanggal & lokasi", done: !!data.date && !!data.venue, target: "details" }, { title: "Tambahkan daftar tamu", done: data.guests.length > 0, target: "guests" }, { title: "Personalisasi kata sambutan", done: data.welcome !== "Dengan bahagia, kami mengundang Bapak/Ibu/Saudara/i untuk merayakan hari pernikahan kami.", target: "settings" }].map((step) => <button key={step.title} className="type-body" onClick={() => setTab(step.target as Tab)}><span className={step.done ? "cd-check complete" : "cd-check"}>{step.done ? <Check size={14} /> : <span />}</span>{step.title}<ArrowUpRight size={15} /></button>)}</div></section><section className="cd-panel cd-soft-panel"><CalendarDays size={24} /><h2 className="type-heading-5">Bagikan undangan</h2><p>Tambahkan tamu untuk membuat tautan personal.</p><button className="cd-inline-action type-label" onClick={() => setTab("guests")}>Kelola tamu<ArrowUpRight size={16} /></button></section></div>
        </>}
        {tab === "details" && <form className="cd-panel cd-form" onSubmit={saveForm} key={tab}><h2 className="type-heading-5">Detail acara</h2><div className="cd-fields"><label>Nama pasangan<input name="couple" defaultValue={data.couple} required maxLength={100} /></label><label>Tanggal acara<input type="date" name="date" defaultValue={data.date} /></label><label>Nama tempat<input name="venue" defaultValue={data.venue} placeholder="Nama gedung atau lokasi" maxLength={200} /></label><label>Tautan Google Maps<input type="url" name="maps" defaultValue={data.maps} placeholder="https://maps.google.com/..." /></label><label className="cd-full">Alamat lengkap<textarea name="address" defaultValue={data.address} rows={3} maxLength={500} /></label></div><div className="cd-actions"><button className="cd-button cd-primary type-label" type="submit">Simpan detail</button>{validUrl(data.maps) && <a className="cd-button type-label" href={data.maps} target="_blank" rel="noopener noreferrer">Buka lokasi<ArrowUpRight size={16} /></a>}</div></form>}
        {tab === "guests" && <section className="cd-panel"><div className="cd-section-heading"><div><h2 className="type-heading-5">Daftar tamu</h2><p className="type-body-sm">Tautan membuka undangan contoh.</p></div><button className="cd-button type-label" disabled={!data.guests.length} onClick={exportGuests}><Download size={16} />Ekspor CSV</button></div><form className="cd-guest-form" onSubmit={addGuest}><label className="cd-grow">Nama tamu<input value={guestName} onChange={(event) => setGuestName(event.target.value)} placeholder="Nama contoh tamu" required maxLength={100} /></label><label>Kelompok<select value={guestGroup} onChange={(event) => setGuestGroup(event.target.value)}><option>Keluarga</option><option>Teman</option><option>Rekan kerja</option><option>Lainnya</option></select></label><button className="cd-button cd-primary type-label" type="submit"><Plus size={16} />Tambah tamu</button></form><label className="cd-search">Cari tamu<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau kelompok" /></label>{data.guests.length ? <div className="cd-table-wrap"><table><thead><tr><th>Nama & kelompok</th><th>RSVP demo</th><th>Tautan</th><th>Aksi</th></tr></thead><tbody>{data.guests.filter((guest) => `${guest.name} ${guest.group}`.toLowerCase().includes(query.toLowerCase())).map((guest) => <tr key={guest.id}><td><strong className="type-label">{guest.name}</strong><span className="type-body-sm">{guest.group}</span></td><td><span className={`cd-attendance ${guest.attendance} type-label-sm`}>{labels[guest.attendance]}</span></td><td><button className="cd-inline-action type-label" onClick={() => copyLink(guest.name)} aria-label={`Salin tautan untuk ${guest.name}`}><Copy size={15} />Salin</button></td><td><button className="cd-inline-action type-label" onClick={() => save({ ...data, guests: data.guests.filter((item) => item.id !== guest.id) }, "Tamu dihapus dari demo lokal.")}>Hapus</button></td></tr>)}</tbody></table>{!data.guests.some((guest) => `${guest.name} ${guest.group}`.toLowerCase().includes(query.toLowerCase())) && <p className="cd-empty">Tidak ada tamu yang cocok.</p>}</div> : <div className="cd-empty"><Users size={28} /><h3 className="type-heading-5">Daftar tamu masih kosong.</h3><p>Tambahkan nama contoh untuk mencoba tautan personal dan ekspor.</p></div>}</section>}
        {tab === "responses" && <section className="cd-panel"><h2 className="type-heading-5">RSVP & ucapan</h2><p className="type-body-sm">Simulasi RSVP untuk tamu yang ditambahkan.</p>{!data.guests.length ? <div className="cd-empty"><MessageSquare size={28} /><p>Tambahkan tamu untuk mencoba RSVP dan ucapan.</p><button className="cd-button type-label" onClick={() => setTab("guests")}>Tambah tamu</button></div> : <div className="cd-response-list">{data.guests.map((guest) => <article key={guest.id} className="cd-response"><h3 className="type-heading-5">{guest.name}</h3><label>Status kehadiran demo<select value={guest.attendance} onChange={(event) => updateGuest(guest.id, { attendance: event.target.value as Guest["attendance"] })}>{Object.entries(labels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label>Ucapan contoh<textarea value={guest.wish} onChange={(event) => updateGuest(guest.id, { wish: event.target.value })} placeholder="Tulis ucapan contoh" maxLength={1000} rows={2} /></label></article>)}</div>}</section>}
        {tab === "settings" && <div className="cd-settings-stack"><section className="cd-panel"><h2 className="type-heading-5">Kata sambutan</h2><p className="cd-welcome-text">{data.welcome || "Belum ada kata sambutan."}</p><button className="cd-button type-label" onClick={() => setWelcomeOpen(true)}>Edit kata sambutan</button></section><form className="cd-panel cd-form" onSubmit={saveForm}><h2 className="type-heading-5">Musik & galeri</h2><label>Tautan musik<input type="url" name="song" defaultValue={data.song} placeholder="https://.../musik.mp3" /></label><p className="type-body-sm">Gunakan musik yang boleh kalian gunakan. Demo menyimpan tautan; belum mengunggah atau memutar audio.</p><button className="cd-button type-label" type="submit">Simpan musik</button><div className="cd-gallery-input"><label className="cd-grow">Tautan foto<input type="url" value={galleryUrl} onChange={(event) => setGalleryUrl(event.target.value)} placeholder="https://.../foto.jpg" /></label><button className="cd-button type-label" type="button" onClick={() => { if (!validUrl(galleryUrl)) { setNotice("Masukkan URL foto yang valid dengan https://."); return; } setField("gallery", [...data.gallery, galleryUrl.trim()]); setGalleryUrl(""); }}>Tambah foto</button></div><ul className="cd-gallery-list">{data.gallery.map((url, index) => <li key={`${url}-${index}`}><span className="type-body-sm">{url}</span><button type="button" className="cd-inline-action type-label" aria-label={`Hapus foto ${index + 1}`} onClick={() => setField("gallery", data.gallery.filter((_, itemIndex) => itemIndex !== index))}>Hapus</button></li>)}</ul>{!data.gallery.length && <p className="type-body-sm">Belum ada foto yang ditambahkan.</p>}</form><section className="cd-panel"><h2 className="type-heading-5">Hadiah & ucapan terima kasih</h2><label>Metode hadiah contoh<select value={data.gift} onChange={(event) => setField("gift", event.target.value as DashboardData["gift"])}><option value="off">Tidak ditampilkan</option><option value="transfer">Transfer bank</option><option value="qris">QRIS</option></select></label>{data.gift !== "off" && <div className="cd-gift-demo"><strong className="type-label">{data.gift === "transfer" ? "Contoh tampilan rekening" : "Contoh area QRIS"}</strong><p className="type-body-sm">{data.gift === "transfer" ? "Bank contoh · 0000 0000 · Nara & Aruna" : "Gambar QRIS akan ditambahkan saat undangan aktif."}</p><p className="type-caption">Pengaturan contoh; pembayaran belum aktif.</p></div>}<form className="cd-form" onSubmit={saveForm}><label>Ucapan terima kasih<textarea name="giftMessage" defaultValue={data.giftMessage} rows={3} maxLength={500} /></label><button className="cd-button type-label" type="submit">Simpan ucapan</button></form></section></div>}
      </div>
    </main>
    {welcomeOpen && <div className="cd-dialog-backdrop"><dialog ref={(node) => { if (node && !node.open) node.showModal(); }} onClose={() => setWelcomeOpen(false)} className="cd-dialog" aria-labelledby="welcome-title" onCancel={() => setWelcomeOpen(false)}><h2 id="welcome-title" className="type-heading-4">Kata sambutan kalian</h2><form onSubmit={(event) => { if (saveForm(event)) setWelcomeOpen(false); }}><label>Teks pembuka<textarea name="welcome" defaultValue={data.welcome} rows={6} maxLength={2000} autoFocus /></label><div className="cd-actions"><button type="submit" className="cd-button cd-primary type-label">Simpan sambutan</button><button type="button" className="cd-button type-label" onClick={() => setWelcomeOpen(false)}>Batal</button></div></form></dialog></div>}
  </div>;
}



