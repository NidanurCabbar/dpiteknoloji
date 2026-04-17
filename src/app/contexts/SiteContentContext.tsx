import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/* ─── Video imports (kullanılabilir stok videolar) ─── */
import heroDefault from "../../imports/hero_firefly_174060.mp4";

/* ─── Tip tanımları ─── */
export interface ServiceData {
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface ProjectData {
  client: string;
  project: string;
  year: string;
}

export interface AnasayfaContent {
  heroTitle: string;
  heroDescription: string;
  heroVideoUrl: string; // blob URL veya varsayılan import
}

export interface HizmetlerContent {
  services: ServiceData[];
}

export interface ReferanslarContent {
  projects: ProjectData[];
}

export interface HakkimizdaContent {
  aboutText: string;
}

export interface IletisimContent {
  address: string;
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

/* ─── Varsayılan veriler ─── */
const defaultContent: SiteContent = {
  anasayfa: {
    heroTitle: "Teknoloji ve Güvenilirlik",
    heroDescription:
      "DPI TEKNOLOJİ, büyük ölçekli LED ekran, profesyonel ses ve ışıklandırma sistemleri konusunda kurumsal çözümler sunan lider teknoloji şirketidir.",
    heroVideoUrl: "", // boş = varsayılan import kullanılır
  },
  hizmetler: {
    services: [
      {
        title: "Profesyonel Led Ekran Sistemleri",
        description:
          "En son teknoloji LED ekran sistemleri ile etkinliklerinize, mekanlarınıza ve projelerinize görsel mükemmellik katıyoruz.",
        features: [
          "İç ve dış mekan LED ekran kurulumu",
          "Stadyum ve arena LED sistemleri",
          "Reklam ve bilgilendirme ekranları",
        ],
        image: "https://images.unsplash.com/photo-1575719028439-65ce8662c1cc?w=1080",
      },
      {
        title: "Profesyonel Ses, Işık Ve Görüntü Sistemi",
        description:
          "Konserlerden konferanslara, tiyatro sahnesinden açık hava etkinliklerine kadar her ortam için özel tasarlanmış profesyonel ses çözümleri sunuyoruz.",
        features: [
          "Konser ve etkinlik ses sistemleri",
          "Konferans salonu akustiği",
          "Line array ve point source hoparlör sistemleri",
        ],
        image: "https://images.unsplash.com/photo-1773625545016-d575264483e9?w=1080",
      },
      {
        title: "Zayıf Akım Sistemleri",
        description:
          "Işıklandırma sistemlerimiz ile mekanlarınızı dönüştürüyor, etkinliklerinize görsel derinlik katıyoruz.",
        features: [
          "Mimari cephe aydınlatması",
          "Sahne ve etkinlik ışıklandırması",
          "LED ve moving head sistemleri",
        ],
        image: "https://images.unsplash.com/photo-1760210885713-624a29a48633?w=1080",
      },
    ],
  },
  referanslar: {
    projects: [
      { client: "İstanbul Büyükşehir Belediyesi", project: "Taksim Meydanı LED Ekran Sistemi", year: "2024" },
      { client: "Türk Telekom Arena", project: "Stadyum Ses ve Görüntü Sistemi", year: "2023" },
      { client: "Ankara Kongre Merkezi", project: "Konferans Salonu Teknolojik Altyapı", year: "2024" },
    ],
  },
  hakkimizda: {
    aboutText:
      "2010 yılında kurulan DPI TEKNOLOJİ, görsel ve işitsel teknolojiler alanında Türkiye'nin önde gelen şirketlerinden biridir.",
  },
  iletisim: {
    address: "Atatürk Mahallesi, Teknoloji Caddesi\nNo: 123, Kat: 4\nÇankaya / ANKARA",
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
  heroVideoSrc: string; // hazır kullanılacak video src
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

/* ─── Helper: localStorage'dan oku ─── */
function loadFromStorage(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle any missing fields
      return {
        anasayfa: { ...defaultContent.anasayfa, ...parsed.anasayfa },
        hizmetler: parsed.hizmetler?.services ? parsed.hizmetler : defaultContent.hizmetler,
        referanslar: parsed.referanslar?.projects ? parsed.referanslar : defaultContent.referanslar,
        hakkimizda: { ...defaultContent.hakkimizda, ...parsed.hakkimizda },
        iletisim: { ...defaultContent.iletisim, ...parsed.iletisim },
        socialVisibility: { ...defaultContent.socialVisibility, ...parsed.socialVisibility },
      };
    }
  } catch (e) {
    console.warn("SiteContent localStorage parse hatası:", e);
  }
  return defaultContent;
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
    // Blob URL oluştur ve state'e kaydet
    const blobUrl = URL.createObjectURL(file);
    setHeroVideoSrc(blobUrl);

    // IndexedDB'ye kalıcı olarak kaydet
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
