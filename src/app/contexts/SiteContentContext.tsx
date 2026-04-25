import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { supabase, isSupabaseReady } from "../lib/supabase";

/* ─── Video imports (kullanılabilir stok videolar) ─── */
import heroDefault from "../../imports/hero_firefly_174060.mp4";

/* ─── Tip tanımları ─── */
export type Bi = { en: string; tr: string };

/**
 * Bi değerinden aktif dil için metin seçer.
 * Aktif dil boşsa Türkçe'ye, o da boşsa İngilizce'ye düşer.
 * Böylece admin sadece TR doldurmuşsa EN sitede de TR metni görünür (boş kalmaz).
 */
export function pickLang(b: Bi | undefined, lang: "en" | "tr"): string {
  if (!b) return "";
  const primary = (b[lang] ?? "").trim();
  if (primary) return b[lang];
  const tr = (b.tr ?? "").trim();
  if (tr) return b.tr;
  return b.en ?? "";
}

export interface ServiceData {
  title: Bi;
  description: Bi;
  features: Bi[];
  image: string;
}

export interface ProjectData {
  client: Bi;
  project: Bi;
  year: string;
  logo?: string;
}

export interface AnasayfaContent {
  heroTitle: Bi;
  heroDescription: Bi;
  heroVideoUrl: string;
}

export interface HizmetlerContent {
  services: ServiceData[];
}

export interface ReferanslarContent {
  projects: ProjectData[];
}

export interface HakkimizdaContent {
  aboutText: Bi;
}

export interface IletisimContent {
  address: Bi;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
}

export interface SocialVisibility {
  facebook: boolean;
  instagram: boolean;
  linkedin: boolean;
  twitter: boolean;
  youtube: boolean;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
}

/** İletişim formundan gelen mesajlar — admin panelinde gösterilir. */
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string; // ISO
  read: boolean;
  emailSent?: boolean;
}

export interface SiteContent {
  anasayfa: AnasayfaContent;
  hizmetler: HizmetlerContent;
  referanslar: ReferanslarContent;
  hakkimizda: HakkimizdaContent;
  iletisim: IletisimContent;
  socialVisibility: SocialVisibility;
  socialLinks: SocialLinks;
}

/* ─── Varsayılan veriler (iki dilli) ─── */
const defaultContent: SiteContent = {
  anasayfa: {
    heroTitle: {
      en: "Technology and Reliability",
      tr: "Teknoloji ve Güvenilirlik",
    },
    heroDescription: {
      en: "DPI TEKNOLOJİ is a leading technology company providing corporate solutions in large-scale LED screens, professional audio and lighting systems.",
      tr: "DPI TEKNOLOJİ, büyük ölçekli LED ekran, profesyonel ses ve ışıklandırma sistemleri konusunda kurumsal çözümler sunan lider teknoloji şirketidir.",
    },
    heroVideoUrl: "",
  },
  hizmetler: {
    services: [
      {
        title: { en: "Professional LED Display Systems", tr: "Profesyonel Led Ekran Sistemleri" },
        description: {
          en: "With the latest LED display technology we bring visual excellence to your events, venues and projects.",
          tr: "En son teknoloji LED ekran sistemleri ile etkinliklerinize, mekanlarınıza ve projelerinize görsel mükemmellik katıyoruz.",
        },
        features: [
          { en: "Indoor and outdoor LED display installation", tr: "İç ve dış mekan LED ekran kurulumu" },
          { en: "Stadium and arena LED systems", tr: "Stadyum ve arena LED sistemleri" },
          { en: "Advertising and information screens", tr: "Reklam ve bilgilendirme ekranları" },
        ],
        image: "https://images.unsplash.com/photo-1575719028439-65ce8662c1cc?w=1080",
      },
      {
        title: { en: "Professional Sound, Lighting and Display Systems", tr: "Profesyonel Ses, Işık Ve Görüntü Sistemi" },
        description: {
          en: "From concerts to conferences, from theatre stages to open-air events, we deliver professional audio solutions tailored to every environment.",
          tr: "Konserlerden konferanslara, tiyatro sahnesinden açık hava etkinliklerine kadar her ortam için özel tasarlanmış profesyonel ses çözümleri sunuyoruz.",
        },
        features: [
          { en: "Concert and event sound systems", tr: "Konser ve etkinlik ses sistemleri" },
          { en: "Conference hall acoustics", tr: "Konferans salonu akustiği" },
          { en: "Line array and point source speaker systems", tr: "Line array ve point source hoparlör sistemleri" },
        ],
        image: "https://images.unsplash.com/photo-1773625545016-d575264483e9?w=1080",
      },
      {
        title: { en: "Low-Current Systems", tr: "Zayıf Akım Sistemleri" },
        description: {
          en: "Our lighting systems transform your venues and add visual depth to your events.",
          tr: "Işıklandırma sistemlerimiz ile mekanlarınızı dönüştürüyor, etkinliklerinize görsel derinlik katıyoruz.",
        },
        features: [
          { en: "Architectural facade lighting", tr: "Mimari cephe aydınlatması" },
          { en: "Stage and event lighting", tr: "Sahne ve etkinlik ışıklandırması" },
          { en: "LED and moving head systems", tr: "LED ve moving head sistemleri" },
        ],
        image: "https://images.unsplash.com/photo-1760210885713-624a29a48633?w=1080",
      },
    ],
  },
  referanslar: {
    projects: [
      { client: { en: "İstanbul Metropolitan Municipality", tr: "İstanbul Büyükşehir Belediyesi" }, project: { en: "Taksim Square LED Display System", tr: "Taksim Meydanı LED Ekran Sistemi" }, year: "2024" },
      { client: { en: "Türk Telekom Arena", tr: "Türk Telekom Arena" }, project: { en: "Stadium Sound and Display System", tr: "Stadyum Ses ve Görüntü Sistemi" }, year: "2023" },
      { client: { en: "Ankara Congress Center", tr: "Ankara Kongre Merkezi" }, project: { en: "Conference Hall Technology Infrastructure", tr: "Konferans Salonu Teknolojik Altyapı" }, year: "2024" },
    ],
  },
  hakkimizda: {
    aboutText: {
      en:
        "DPI Teknoloji is a technology firm that stands out in professional LED displays, sound-light-image systems and low-current solutions thanks to its engineering discipline and innovative approach.\n\n" +
        "We approach every project as a strategic process that creates brand reputation and long-term investment value beyond a mere technical implementation. We provide end-to-end professional service across needs analysis, system design, implementation and after-sales support.\n\n" +
        "With our experience across diverse sectors, strong technical infrastructure and forward-looking vision, we continue producing innovative and sustainable solutions that adapt to future expectations.",
      tr:
        "DPI Teknoloji, profesyonel LED ekranlar, ses-ışık-görüntü sistemleri ve zayıf akım çözümleri alanında faaliyet gösteren, mühendislik disiplini ve yenilikçi yaklaşımıyla öne çıkan bir teknoloji firmasıdır.\n\n" +
        "Her projeyi teknik bir uygulama olmanın ötesinde, marka itibarı ve uzun vadeli yatırım değeri üreten stratejik bir süreç olarak ele alıyoruz. İhtiyaç analizi, sistem tasarımı, uygulama ve satış sonrası destek süreçlerinin tamamında uçtan uca profesyonel hizmet sunuyoruz.\n\n" +
        "Farklı sektörlerdeki deneyimimiz, güçlü teknik altyapımız ve gelişime açık vizyonumuzla, geleceğin beklentilerine uyum sağlayan yenilikçi ve sürdürülebilir çözümler üretmeye devam ediyoruz.",
    },
  },
  iletisim: {
    address: {
      en: "Atatürk Neighborhood, Teknoloji Avenue\nNo: 123, Floor: 4\nÇankaya / ANKARA",
      tr: "Atatürk Mahallesi, Teknoloji Caddesi\nNo: 123, Kat: 4\nÇankaya / ANKARA",
    },
    phone1: "+90 (312) 123 45 67",
    phone2: "+90 (312) 123 45 68",
    email1: "info@dpiteknoloji.com.tr",
    email2: "destek@dpiteknoloji.com.tr",
  },
  socialVisibility: { facebook: false, instagram: true, linkedin: true, twitter: false, youtube: false },
  socialLinks: { facebook: "", instagram: "", linkedin: "", twitter: "", youtube: "" },
};

/* ─── Context ─── */
interface SiteContentContextType {
  content: SiteContent;
  heroVideoSrc: string;
  // update* fonksiyonları başarı durumunu döner
  updateAnasayfa: (data: AnasayfaContent) => Promise<boolean>;
  updateHizmetler: (data: HizmetlerContent) => Promise<boolean>;
  updateReferanslar: (data: ReferanslarContent) => Promise<boolean>;
  updateHakkimizda: (data: HakkimizdaContent) => Promise<boolean>;
  updateIletisim: (data: IletisimContent) => Promise<boolean>;
  updateSocialVisibility: (data: SocialVisibility) => Promise<boolean>;
  updateSocialLinks: (data: SocialLinks) => Promise<boolean>;
  setHeroVideoFile: (file: File) => Promise<void>;
  // İletişim mesajları
  messages: ContactMessage[];
  addMessage: (m: Omit<ContactMessage, "id" | "createdAt" | "read">) => Promise<ContactMessage>;
  markMessageRead: (id: string, read?: boolean) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const STORAGE_KEY = "dpi_site_content";
const VIDEO_STORAGE_KEY = "dpi_hero_video";
const MESSAGES_KEY = "dpi_contact_messages";
const SITE_ROW_ID = 1; // site_content tablosunda singleton satır

/* ─── Migration helpers: eski string şemayı Bi'ye çevir ─── */
function toBi(v: any, fallback: Bi): Bi {
  if (v && typeof v === "object" && typeof v.en === "string" && typeof v.tr === "string") {
    return { en: v.en, tr: v.tr };
  }
  if (typeof v === "string") return { en: v, tr: v };
  return fallback;
}

function migrateService(raw: any, fallback: ServiceData): ServiceData {
  return {
    title: toBi(raw?.title, fallback.title),
    description: toBi(raw?.description, fallback.description),
    features: Array.isArray(raw?.features)
      ? raw.features.map((f: any, i: number) =>
          toBi(f, fallback.features[i] ?? { en: "", tr: "" })
        )
      : fallback.features,
    image: typeof raw?.image === "string" ? raw.image : fallback.image,
  };
}

function migrateProject(raw: any, fallback: ProjectData): ProjectData {
  return {
    client: toBi(raw?.client, fallback.client),
    project: toBi(raw?.project, fallback.project),
    year: typeof raw?.year === "string" ? raw.year : fallback.year,
    logo: typeof raw?.logo === "string" ? raw.logo : fallback.logo,
  };
}

/** JSON içeriği tam/şemaya uygun SiteContent'e normalize et. */
function normalizeContent(p: any): SiteContent {
  const servicesRaw = p?.hizmetler?.services;
  const services: ServiceData[] =
    Array.isArray(servicesRaw) && servicesRaw.length > 0
      ? servicesRaw.map((s: any, i: number) =>
          migrateService(s, defaultContent.hizmetler.services[i] ?? defaultContent.hizmetler.services[0])
        )
      : defaultContent.hizmetler.services;

  const projectsRaw = p?.referanslar?.projects;
  const projects: ProjectData[] =
    Array.isArray(projectsRaw) && projectsRaw.length > 0
      ? projectsRaw.map((pr: any, i: number) =>
          migrateProject(pr, defaultContent.referanslar.projects[i] ?? defaultContent.referanslar.projects[0])
        )
      : defaultContent.referanslar.projects;

  return {
    anasayfa: {
      heroTitle: toBi(p?.anasayfa?.heroTitle, defaultContent.anasayfa.heroTitle),
      heroDescription: toBi(p?.anasayfa?.heroDescription, defaultContent.anasayfa.heroDescription),
      heroVideoUrl:
        typeof p?.anasayfa?.heroVideoUrl === "string"
          ? p.anasayfa.heroVideoUrl
          : defaultContent.anasayfa.heroVideoUrl,
    },
    hizmetler: { services },
    referanslar: { projects },
    hakkimizda: { aboutText: toBi(p?.hakkimizda?.aboutText, defaultContent.hakkimizda.aboutText) },
    iletisim: {
      address: toBi(p?.iletisim?.address, defaultContent.iletisim.address),
      phone1: typeof p?.iletisim?.phone1 === "string" ? p.iletisim.phone1 : defaultContent.iletisim.phone1,
      phone2: typeof p?.iletisim?.phone2 === "string" ? p.iletisim.phone2 : defaultContent.iletisim.phone2,
      email1: typeof p?.iletisim?.email1 === "string" ? p.iletisim.email1 : defaultContent.iletisim.email1,
      email2: typeof p?.iletisim?.email2 === "string" ? p.iletisim.email2 : defaultContent.iletisim.email2,
    },
    socialVisibility: { ...defaultContent.socialVisibility, ...(p?.socialVisibility ?? {}) },
    socialLinks: { ...defaultContent.socialLinks, ...(p?.socialLinks ?? {}) },
  };
}

function loadFromStorage(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultContent;
    return normalizeContent(JSON.parse(stored));
  } catch (e) {
    console.warn("SiteContent localStorage parse hatası:", e);
    return defaultContent;
  }
}

function cacheContent(c: SiteContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch (e) {
    console.warn("SiteContent localStorage cache yazılamadı:", e);
  }
}

/* ─── Provider ─── */
export function SiteContentProvider({ children }: { children: ReactNode }) {
  // İlk render: localStorage cache. Ardından Supabase'den gelen veri override eder.
  const [content, setContent] = useState<SiteContent>(loadFromStorage);
  const [heroVideoSrc, setHeroVideoSrc] = useState<string>(heroDefault);
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const raw = localStorage.getItem(MESSAGES_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Son Supabase'e yazılmış ham JSON string'ini tut; realtime event'leri filtrelemek için
  const lastWrittenRef = useRef<string>("");

  /* ─── Supabase'den ilk yükleme + realtime abonelik ─── */
  useEffect(() => {
    if (!isSupabaseReady() || !supabase) return;

    let cancelled = false;

    // site_content satırını çek
    supabase
      .from("site_content")
      .select("content")
      .eq("id", SITE_ROW_ID)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.warn("site_content fetch hatası:", error.message);
          return;
        }
        if (data?.content) {
          const normalized = normalizeContent(data.content);
          setContent(normalized);
          cacheContent(normalized);
        }
      });

    // Kayıtlı mesajları çek
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          // RLS nedeniyle anon rolü okuyamayabilir — sessiz geç
          return;
        }
        if (Array.isArray(data)) {
          setMessages(data.map(mapDbMessage));
        }
      });

    // Realtime: site_content değişimlerini dinle
    const siteChannel = supabase
      .channel("site_content_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content", filter: `id=eq.${SITE_ROW_ID}` },
        (payload) => {
          const row: any = payload.new;
          if (!row?.content) return;
          const json = JSON.stringify(row.content);
          // Biz yazdıysak tekrar işlemeye gerek yok
          if (json === lastWrittenRef.current) return;
          const normalized = normalizeContent(row.content);
          setContent(normalized);
          cacheContent(normalized);
        }
      )
      .subscribe();

    // Realtime: contact_messages değişimleri
    const msgChannel = supabase
      .channel("contact_messages_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const row = mapDbMessage(payload.new);
            setMessages((prev) => (prev.some((m) => m.id === row.id) ? prev : [row, ...prev]));
          } else if (payload.eventType === "UPDATE") {
            const row = mapDbMessage(payload.new);
            setMessages((prev) => prev.map((m) => (m.id === row.id ? row : m)));
          } else if (payload.eventType === "DELETE") {
            const oldId = (payload.old as any)?.id;
            if (oldId) setMessages((prev) => prev.filter((m) => m.id !== oldId));
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase!.removeChannel(siteChannel);
      supabase!.removeChannel(msgChannel);
    };
  }, []);

  /* ─── IndexedDB'den video (legacy) ─── */
  useEffect(() => {
    // Önce Supabase'deki URL varsa onu kullan
    if (content.anasayfa.heroVideoUrl) {
      setHeroVideoSrc(content.anasayfa.heroVideoUrl);
      return;
    }
    loadVideoFromDB().then((url) => {
      if (url) setHeroVideoSrc(url);
    });
  }, [content.anasayfa.heroVideoUrl]);

  /* ─── Diğer sekmelerle localStorage cache senkronizasyonu (Supabase yoksa bile çalışır) ─── */
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        setContent(loadFromStorage());
      }
      if (e.key === MESSAGES_KEY || e.key === null) {
        try {
          const raw = localStorage.getItem(MESSAGES_KEY);
          setMessages(raw ? JSON.parse(raw) : []);
        } catch {}
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  /* ─── İçerik yazımı: Supabase öncelikli, localStorage cache yedek ─── */
  const persistContent = async (newContent: SiteContent): Promise<boolean> => {
    setContent(newContent);
    cacheContent(newContent);

    if (isSupabaseReady() && supabase) {
      const payload = { id: SITE_ROW_ID, content: newContent, updated_at: new Date().toISOString() };
      lastWrittenRef.current = JSON.stringify(newContent);
      const { error } = await supabase
        .from("site_content")
        .upsert(payload, { onConflict: "id" });
      if (error) {
        console.error("site_content upsert hatası:", error.message);
        return false;
      }
      return true;
    }
    return true; // localStorage'a yazıldı, başarı sayılır
  };

  const updateAnasayfa = (data: AnasayfaContent) => persistContent({ ...content, anasayfa: data });
  const updateHizmetler = (data: HizmetlerContent) => persistContent({ ...content, hizmetler: data });
  const updateReferanslar = (data: ReferanslarContent) => persistContent({ ...content, referanslar: data });
  const updateHakkimizda = (data: HakkimizdaContent) => persistContent({ ...content, hakkimizda: data });
  const updateIletisim = (data: IletisimContent) => persistContent({ ...content, iletisim: data });
  const updateSocialVisibility = (data: SocialVisibility) => persistContent({ ...content, socialVisibility: data });
  const updateSocialLinks = (data: SocialLinks) => persistContent({ ...content, socialLinks: data });

  /* ─── İletişim mesajları ─── */
  const persistMessagesCache = (list: ContactMessage[]) => {
    try {
      // Çok büyük olmasın diye son 200 mesajı cache'le
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(list.slice(0, 200)));
    } catch (e) {
      console.error("Mesajlar cache'e yazılamadı:", e);
    }
  };

  const addMessage = async (
    m: Omit<ContactMessage, "id" | "createdAt" | "read">
  ): Promise<ContactMessage> => {
    if (isSupabaseReady() && supabase) {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert({
          name: m.name,
          email: m.email,
          phone: m.phone,
          subject: m.subject,
          message: m.message,
          email_sent: m.emailSent ?? false,
        })
        .select()
        .single();
      if (!error && data) {
        const row = mapDbMessage(data);
        setMessages((prev) => (prev.some((x) => x.id === row.id) ? prev : [row, ...prev]));
        return row;
      }
      console.warn("contact_messages insert hatası:", error?.message);
    }
    // Fallback: local
    const full: ContactMessage = {
      ...m,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      createdAt: new Date().toISOString(),
      read: false,
    };
    const next = [full, ...messages];
    setMessages(next);
    persistMessagesCache(next);
    return full;
  };

  const markMessageRead = async (id: string, read = true) => {
    const next = messages.map((m) => (m.id === id ? { ...m, read } : m));
    setMessages(next);
    persistMessagesCache(next);
    if (isSupabaseReady() && supabase) {
      const { error } = await supabase.from("contact_messages").update({ read }).eq("id", id);
      if (error) console.warn("markMessageRead hatası:", error.message);
    }
  };

  const deleteMessage = async (id: string) => {
    const next = messages.filter((m) => m.id !== id);
    setMessages(next);
    persistMessagesCache(next);
    if (isSupabaseReady() && supabase) {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) console.warn("deleteMessage hatası:", error.message);
    }
  };

  /* ─── Hero video ─── */
  const setHeroVideoFile = async (file: File) => {
    // Anında önizleme için blob URL kullan
    const blobUrl = URL.createObjectURL(file);
    setHeroVideoSrc(blobUrl);
    // Legacy: IndexedDB'ye kaydet (Supabase yoksa yedek)
    saveVideoToDB(file);

    // Supabase Storage'a yükle
    if (isSupabaseReady() && supabase) {
      try {
        const ext = file.name.split(".").pop() || "mp4";
        const path = `hero/hero-${Date.now()}.${ext}`;
        const { error } = await supabase.storage
          .from("media")
          .upload(path, file, { upsert: true, contentType: file.type });
        if (error) {
          console.error("Hero video upload hatası:", error.message);
          return;
        }
        const { data } = supabase.storage.from("media").getPublicUrl(path);
        const publicUrl = data?.publicUrl ?? "";
        if (publicUrl) {
          setHeroVideoSrc(publicUrl);
          await persistContent({
            ...content,
            anasayfa: { ...content.anasayfa, heroVideoUrl: publicUrl },
          });
        }
      } catch (e) {
        console.error("Hero video Supabase yükleme hatası:", e);
      }
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        heroVideoSrc,
        updateAnasayfa,
        updateHizmetler,
        updateReferanslar,
        updateHakkimizda,
        updateIletisim,
        updateSocialVisibility,
        updateSocialLinks,
        setHeroVideoFile,
        messages,
        addMessage,
        markMessageRead,
        deleteMessage,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
}

/* ─── DB satırı → ContactMessage mapping ─── */
function mapDbMessage(row: any): ContactMessage {
  return {
    id: String(row.id),
    name: row.name ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    subject: row.subject ?? "",
    message: row.message ?? "",
    createdAt: row.created_at ?? new Date().toISOString(),
    read: !!row.read,
    emailSent: !!row.email_sent,
  };
}

/* ─── IndexedDB helpers (Supabase yoksa video için fallback) ─── */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("dpi_teknoloji_db", 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore("media");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveVideoToDB(file: File) {
  try {
    const db = await openDB();
    const tx = db.transaction("media", "readwrite");
    tx.objectStore("media").put(file, VIDEO_STORAGE_KEY);
  } catch (e) {
    console.warn("Video IndexedDB'ye kaydedilemedi:", e);
  }
}

async function loadVideoFromDB(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction("media", "readonly");
      const req = tx.objectStore("media").get(VIDEO_STORAGE_KEY);
      req.onsuccess = () => {
        if (req.result) resolve(URL.createObjectURL(req.result));
        else resolve(null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}
