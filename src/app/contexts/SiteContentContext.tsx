import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/* ─── Video imports (kullanılabilir stok videolar) ─── */
import heroDefault from "../../imports/hero_firefly_174060.mp4";

/* ─── Tip tanımları ─── */
export type Bi = { en: string; tr: string };

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
}

export interface AnasayfaContent {
  heroTitle: Bi;
  heroDescription: Bi;
  heroVideoUrl: string; // blob URL veya varsayılan import
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

export interface SiteContent {
  anasayfa: AnasayfaContent;
  hizmetler: HizmetlerContent;
  referanslar: ReferanslarContent;
  hakkimizda: HakkimizdaContent;
  iletisim: IletisimContent;
  socialVisibility: SocialVisibility;
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
        title: {
          en: "Professional LED Display Systems",
          tr: "Profesyonel Led Ekran Sistemleri",
        },
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
        title: {
          en: "Professional Sound, Lighting and Display Systems",
          tr: "Profesyonel Ses, Işık Ve Görüntü Sistemi",
        },
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
        title: {
          en: "Low-Current Systems",
          tr: "Zayıf Akım Sistemleri",
        },
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
      {
        client: { en: "İstanbul Metropolitan Municipality", tr: "İstanbul Büyükşehir Belediyesi" },
        project: { en: "Taksim Square LED Display System", tr: "Taksim Meydanı LED Ekran Sistemi" },
        year: "2024",
      },
      {
        client: { en: "Türk Telekom Arena", tr: "Türk Telekom Arena" },
        project: { en: "Stadium Sound and Display System", tr: "Stadyum Ses ve Görüntü Sistemi" },
        year: "2023",
      },
      {
        client: { en: "Ankara Congress Center", tr: "Ankara Kongre Merkezi" },
        project: { en: "Conference Hall Technology Infrastructure", tr: "Konferans Salonu Teknolojik Altyapı" },
        year: "2024",
      },
    ],
  },
  hakkimizda: {
    aboutText: {
      en: "Founded in 2010, DPI TEKNOLOJİ is one of Turkey's leading companies in visual and audio technologies.",
      tr: "2010 yılında kurulan DPI TEKNOLOJİ, görsel ve işitsel teknolojiler alanında Türkiye'nin önde gelen şirketlerinden biridir.",
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
  socialVisibility: {
    facebook: false,
    instagram: true,
    linkedin: true,
    twitter: false,
    youtube: false,
  },
};

/* ─── Context ─── */
interface SiteContentContextType {
  content: SiteContent;
  heroVideoSrc: string;
  updateAnasayfa: (data: AnasayfaContent) => void;
  updateHizmetler: (data: HizmetlerContent) => void;
  updateReferanslar: (data: ReferanslarContent) => void;
  updateHakkimizda: (data: HakkimizdaContent) => void;
  updateIletisim: (data: IletisimContent) => void;
  updateSocialVisibility: (data: SocialVisibility) => void;
  setHeroVideoFile: (file: File) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const STORAGE_KEY = "dpi_site_content";
const VIDEO_STORAGE_KEY = "dpi_hero_video";

/* ─── Migration helpers: eski string şemayı Bi'ye çevir ─── */
function toBi(v: any, fallback: Bi): Bi {
  if (v && typeof v === "object" && typeof v.en === "string" && typeof v.tr === "string") {
    return { en: v.en, tr: v.tr };
  }
  if (typeof v === "string") {
    return { en: v, tr: v };
  }
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
  };
}

/* ─── Helper: localStorage'dan oku (şema göçü dahil) ─── */
function loadFromStorage(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultContent;
    const p = JSON.parse(stored);

    const servicesRaw = p?.hizmetler?.services;
    const services: ServiceData[] =
      Array.isArray(servicesRaw) && servicesRaw.length > 0
        ? servicesRaw.map((s: any, i: number) =>
            migrateService(
              s,
              defaultContent.hizmetler.services[i] ?? defaultContent.hizmetler.services[0]
            )
          )
        : defaultContent.hizmetler.services;

    const projectsRaw = p?.referanslar?.projects;
    const projects: ProjectData[] =
      Array.isArray(projectsRaw) && projectsRaw.length > 0
        ? projectsRaw.map((pr: any, i: number) =>
            migrateProject(
              pr,
              defaultContent.referanslar.projects[i] ?? defaultContent.referanslar.projects[0]
            )
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
      hakkimizda: {
        aboutText: toBi(p?.hakkimizda?.aboutText, defaultContent.hakkimizda.aboutText),
      },
      iletisim: {
        address: toBi(p?.iletisim?.address, defaultContent.iletisim.address),
        phone1:
          typeof p?.iletisim?.phone1 === "string"
            ? p.iletisim.phone1
            : defaultContent.iletisim.phone1,
        phone2:
          typeof p?.iletisim?.phone2 === "string"
            ? p.iletisim.phone2
            : defaultContent.iletisim.phone2,
        email1:
          typeof p?.iletisim?.email1 === "string"
            ? p.iletisim.email1
            : defaultContent.iletisim.email1,
        email2:
          typeof p?.iletisim?.email2 === "string"
            ? p.iletisim.email2
            : defaultContent.iletisim.email2,
      },
      socialVisibility: { ...defaultContent.socialVisibility, ...(p?.socialVisibility ?? {}) },
    };
  } catch (e) {
    console.warn("SiteContent localStorage parse hatası:", e);
    return defaultContent;
  }
}

/* ─── Provider ─── */
export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadFromStorage);
  const [heroVideoSrc, setHeroVideoSrc] = useState<string>(heroDefault);

  // Başlangıçta indexedDB'den video yükle
  useEffect(() => {
    loadVideoFromDB().then((url) => {
      if (url) setHeroVideoSrc(url);
    });
  }, []);

  const saveToStorage = (newContent: SiteContent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  };

  const updateAnasayfa = (data: AnasayfaContent) => {
    const updated = { ...content, anasayfa: data };
    setContent(updated);
    saveToStorage(updated);
  };

  const updateHizmetler = (data: HizmetlerContent) => {
    const updated = { ...content, hizmetler: data };
    setContent(updated);
    saveToStorage(updated);
  };

  const updateReferanslar = (data: ReferanslarContent) => {
    const updated = { ...content, referanslar: data };
    setContent(updated);
    saveToStorage(updated);
  };

  const updateHakkimizda = (data: HakkimizdaContent) => {
    const updated = { ...content, hakkimizda: data };
    setContent(updated);
    saveToStorage(updated);
  };

  const updateIletisim = (data: IletisimContent) => {
    const updated = { ...content, iletisim: data };
    setContent(updated);
    saveToStorage(updated);
  };

  const updateSocialVisibility = (data: SocialVisibility) => {
    const updated = { ...content, socialVisibility: data };
    setContent(updated);
    saveToStorage(updated);
  };

  const setHeroVideoFile = (file: File) => {
    const blobUrl = URL.createObjectURL(file);
    setHeroVideoSrc(blobUrl);
    saveVideoToDB(file);
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
        setHeroVideoFile,
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

/* ─── IndexedDB helpers (video dosyası büyük, localStorage'a sığmaz) ─── */
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
        if (req.result) {
          resolve(URL.createObjectURL(req.result));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}
