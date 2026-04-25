import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSiteContent, ServiceData, ProjectData, SocialVisibility, SocialLinks, Bi } from "../contexts/SiteContentContext";
import { Navigate, useNavigate } from "react-router";
import { isAllowedLink } from "../lib/safeUrl";
import { uploadDataUrl } from "../lib/uploadMedia";

// Görsel: 10 MB, Video: 150 MB üst sınır (self-DoS'a karşı)
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 150 * 1024 * 1024;

// Yeni bir öğe eklerken placeholder olarak her iki dili aynı başlangıç metniyle doldur
const bi = (v: string): Bi => ({ en: v, tr: v });

// Bir Bi objesinde sadece belirli bir dili güncellemek için yardımcı
const setBi = (current: Bi, sub: "en" | "tr", value: string): Bi => ({
  ...current,
  [sub]: value,
});

/**
 * Görseli canvas üzerinde küçültüp JPEG olarak sıkıştırır.
 * localStorage kota aşımını önler (maks ~5-10 MB).
 * @param file Kullanıcının seçtiği görsel
 * @param maxSize En uzun kenar piksel sınırı
 * @param quality JPEG kalite (0-1)
 */
async function fileToCompressedDataUrl(
  file: File,
  maxSize = 1600,
  quality = 0.85,
  format: "image/jpeg" | "image/png" = "image/jpeg"
): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("Görsel yüklenemedi"));
    });
    const scale = Math.min(
      1,
      maxSize / Math.max(img.naturalWidth, img.naturalHeight)
    );
    const cw = Math.round(img.naturalWidth * scale);
    const ch = Math.round(img.naturalHeight * scale);
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context alınamadı");
    ctx.drawImage(img, 0, 0, cw, ch);
    // PNG şeffaflığı korur ama daha büyük olur; JPEG şeffafsızı küçük tutar
    return canvas.toDataURL(format, quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function Admin() {
  const { logout, isAdmin, changePassword } = useAuth();
  const { content, updateAnasayfa, updateHizmetler, updateReferanslar, updateHakkimizda, updateIletisim, updateSocialVisibility, updateSocialLinks, setHeroVideoFile, messages, markMessageRead, deleteMessage } = useSiteContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"anasayfa" | "hizmetler" | "referanslar" | "hakkimizda" | "iletisim" | "sosyal" | "mesajlar" | "hesap">("anasayfa");
  const unreadCount = messages.filter((m) => !m.read).length;

  /* ─── Toast bildirimi ─── */
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  /* ─── Anasayfa state ─── */
  const [heroTitle, setHeroTitle] = useState<Bi>(content.anasayfa.heroTitle);
  const [heroDescription, setHeroDescription] = useState<Bi>(content.anasayfa.heroDescription);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pendingVideoRef = useRef<File | null>(null);

  /* ─── Hizmetler state ─── */
  const [services, setServices] = useState<ServiceData[]>(content.hizmetler.services);
  const serviceImageRefs = useRef<(HTMLInputElement | null)[]>([]);
  const projectLogoRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ─── Referanslar state ─── */
  const [projects, setProjects] = useState<ProjectData[]>(content.referanslar.projects);

  /* ─── Hakkımızda state ─── */
  const [aboutContent, setAboutContent] = useState<Bi>(content.hakkimizda.aboutText);

  /* ─── İletişim state ─── */
  const [contactAddress, setContactAddress] = useState<Bi>(content.iletisim.address);
  const [contactPhone1, setContactPhone1] = useState(content.iletisim.phone1);
  const [contactPhone2, setContactPhone2] = useState(content.iletisim.phone2);
  const [contactEmail1, setContactEmail1] = useState(content.iletisim.email1);
  const [contactEmail2, setContactEmail2] = useState(content.iletisim.email2);

  /* ─── Sosyal Medya state ─── */
  const [socialVis, setSocialVis] = useState<SocialVisibility>(content.socialVisibility);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(content.socialLinks);

  /* ─── Hesap state ─── */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /* ─── Toast timer temizliği (memory leak önlemi) ─── */
  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  /* ─── Content dış kaynaklardan güncellenince (başka sekme / başka cihaz
       storage event) Admin'deki local düzenleme state'ini de senkronize et.
       Yoksa eski değerlerle çalışan admin, kaydet'e basınca dış güncellemeleri
       ezer. Effect, sadece ilgili content alanı değişirse tetiklenir. ─── */
  useEffect(() => {
    setHeroTitle(content.anasayfa.heroTitle);
    setHeroDescription(content.anasayfa.heroDescription);
  }, [content.anasayfa.heroTitle, content.anasayfa.heroDescription]);

  useEffect(() => {
    setServices(content.hizmetler.services);
  }, [content.hizmetler.services]);

  useEffect(() => {
    setProjects(content.referanslar.projects);
  }, [content.referanslar.projects]);

  useEffect(() => {
    setAboutContent(content.hakkimizda.aboutText);
  }, [content.hakkimizda.aboutText]);

  useEffect(() => {
    setContactAddress(content.iletisim.address);
    setContactPhone1(content.iletisim.phone1);
    setContactPhone2(content.iletisim.phone2);
    setContactEmail1(content.iletisim.email1);
    setContactEmail2(content.iletisim.email2);
  }, [
    content.iletisim.address,
    content.iletisim.phone1,
    content.iletisim.phone2,
    content.iletisim.email1,
    content.iletisim.email2,
  ]);

  useEffect(() => {
    setSocialVis(content.socialVisibility);
  }, [content.socialVisibility]);

  useEffect(() => {
    setSocialLinks(content.socialLinks);
  }, [content.socialLinks]);

  // Render-time yönlendirme yerine Navigate bileşeni (Strict Mode uyumlu)
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ═══════ KAYDET HANDLERLERİ ═══════ */

  const handleSaveAnasayfa = async () => {
    // Video dosyası seçildiyse kaydet
    if (pendingVideoRef.current) {
      setHeroVideoFile(pendingVideoRef.current);
      pendingVideoRef.current = null;
    }
    // Metin içeriklerini kaydet
    const ok = await updateAnasayfa({
      heroTitle,
      heroDescription,
      heroVideoUrl: content.anasayfa.heroVideoUrl,
    });
    showToast(
      ok
        ? "✓ Ana sayfa içerikleri kaydedildi!"
        : "⚠ Kaydetme başarısız — ağ/sunucu hatası olabilir"
    );
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      showToast("⚠ Lütfen bir video dosyası seçin");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_VIDEO_BYTES) {
      showToast("⚠ Video 150 MB'tan büyük olamaz");
      e.target.value = "";
      return;
    }
    pendingVideoRef.current = file;
    setVideoFileName(file.name);
  };

  const handleSaveHizmetler = async () => {
    const ok = await updateHizmetler({ services });
    showToast(
      ok
        ? "✓ Hizmetler kaydedildi!"
        : "⚠ Kaydetme başarısız — görseller çok büyük olabilir"
    );
  };

  const handleSaveReferanslar = async () => {
    const ok = await updateReferanslar({ projects });
    showToast(
      ok ? "✓ Referanslar kaydedildi!" : "⚠ Kaydetme başarısız"
    );
  };

  const handleSaveHakkimizda = async () => {
    const ok = await updateHakkimizda({ aboutText: aboutContent });
    showToast(
      ok ? "✓ Hakkımızda içerikleri kaydedildi!" : "⚠ Kaydetme başarısız"
    );
  };

  const handleSaveIletisim = async () => {
    const ok = await updateIletisim({
      address: contactAddress,
      phone1: contactPhone1,
      phone2: contactPhone2,
      email1: contactEmail1,
      email2: contactEmail2,
    });
    showToast(
      ok ? "✓ İletişim bilgileri kaydedildi!" : "⚠ Kaydetme başarısız"
    );
  };

  const handleSaveSocial = async () => {
    // Güvenlik: sadece http/https (+ mailto/tel) linkleri kabul et.
    // javascript:, data:, file: gibi şemalar saklı XSS'e yol açar.
    const invalid = (Object.entries(socialLinks) as [keyof SocialLinks, string][])
      .filter(([, url]) => !isAllowedLink(url))
      .map(([k]) => k);
    if (invalid.length) {
      showToast(`⚠ Geçersiz URL: ${invalid.join(", ")} — sadece https:// ile başlayan adres girin`);
      return;
    }
    const ok1 = await updateSocialVisibility(socialVis);
    const ok2 = await updateSocialLinks(socialLinks);
    showToast(
      ok1 && ok2
        ? "✓ Sosyal medya ayarları kaydedildi!"
        : "⚠ Kaydetme başarısız"
    );
  };

  /* ═══════ HİZMET YARDIMCILARI ═══════ */

  const handleAddService = () => {
    setServices([
      ...services,
      {
        title: bi("Yeni Hizmet"),
        description: bi("Hizmet açıklaması"),
        features: [bi("Özellik 1"), bi("Özellik 2"), bi("Özellik 3")],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1080",
      },
    ]);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Bi alanları (title/description) - aktif dilin değerini günceller
  const handleServiceBiChange = (
    index: number,
    field: "title" | "description",
    sub: "en" | "tr",
    value: string
  ) => {
    const newServices = [...services];
    newServices[index] = {
      ...newServices[index],
      [field]: setBi(newServices[index][field], sub, value),
    };
    setServices(newServices);
  };

  // Image alanı (tek string - artık local dosyadan data URL olarak alınıyor)
  const handleServiceImageChange = (index: number, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], image: value };
    setServices(newServices);
  };

  // Local dosyadan görsel yükle: canvas ile küçült → JPEG data URL
  const handleServiceImageFile = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    // aynı dosyayı tekrar seçebilmek için input'u hemen sıfırla
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("⚠ Lütfen bir görsel dosyası seçin");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      showToast("⚠ Görsel 10 MB'tan büyük olamaz");
      return;
    }
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      // Supabase Storage'a yükle; başarısız olursa data URL fallback.
      const finalUrl = await uploadDataUrl(dataUrl, "services");
      handleServiceImageChange(index, finalUrl);
      showToast("✓ Görsel yüklendi (kaydetmeyi unutmayın)");
    } catch (err) {
      console.error("Görsel işleme hatası:", err);
      showToast("⚠ Görsel işlenemedi, lütfen başka bir dosya deneyin");
    }
  };

  const handleServiceFeatureChange = (
    serviceIndex: number,
    featureIndex: number,
    sub: "en" | "tr",
    value: string
  ) => {
    const newServices = [...services];
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      features: newServices[serviceIndex].features.map((f, i) =>
        i === featureIndex ? setBi(f, sub, value) : f
      ),
    };
    setServices(newServices);
  };

  const handleAddServiceFeature = (serviceIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      features: [...newServices[serviceIndex].features, bi("Yeni özellik")],
    };
    setServices(newServices);
  };

  const handleRemoveServiceFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      features: newServices[serviceIndex].features.filter((_, i) => i !== featureIndex),
    };
    setServices(newServices);
  };

  /* ═══════ REFERANS YARDIMCILARI ═══════ */

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        client: bi("Yeni Müşteri"),
        project: bi("Yeni Proje"),
        year: "2024",
        // Eklenme zamanı: yeni referanslar en üstte/solda görünsün diye kullanılır.
        // Sayfada görüntülenmez, yalnızca sıralama amaçlıdır.
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Bi alanları (client/project) - aktif dilin değerini günceller
  const handleProjectBiChange = (
    index: number,
    field: "client" | "project",
    sub: "en" | "tr",
    value: string
  ) => {
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: setBi(newProjects[index][field], sub, value),
    };
    setProjects(newProjects);
  };

  // Year (tek string)
  const handleProjectYearChange = (index: number, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], year: value };
    setProjects(newProjects);
  };

  // Logo değiştir (string olarak, kaldırmak için boş string)
  const handleProjectLogoChange = (index: number, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], logo: value };
    setProjects(newProjects);
  };

  // Referans logosunu yerel dosyadan yükle: canvas ile küçült → PNG (şeffaflık için)
  const handleProjectLogoFile = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("⚠ Lütfen bir görsel dosyası seçin");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      showToast("⚠ Logo 10 MB'tan büyük olamaz");
      return;
    }
    try {
      // Logo daha küçük ama şeffaflığı korumalı → PNG formatında çıktı
      const dataUrl = await fileToCompressedDataUrl(file, 800, 1, "image/png");
      const finalUrl = await uploadDataUrl(dataUrl, "logos");
      handleProjectLogoChange(index, finalUrl);
      showToast("✓ Logo yüklendi (kaydetmeyi unutmayın)");
    } catch (err) {
      console.error("Logo işleme hatası:", err);
      showToast("⚠ Logo işlenemedi, lütfen başka bir dosya deneyin");
    }
  };

  /* ═══════ ŞİFRE DEĞİŞTİRME ═══════ */

  const handleChangePassword = async () => {
    setPasswordError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Tüm alanları doldurun");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Yeni şifreler eşleşmiyor");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Yeni şifre en az 6 karakter olmalıdır");
      return;
    }
    const success = await changePassword(currentPassword, newPassword);
    if (success) {
      showToast("✓ Şifre başarıyla değiştirildi!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordError("Mevcut şifre hatalı");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      {/* Toast Bildirimi */}
      {toast && (
        <div
          className="fixed top-6 right-6 z-[9999] px-6 py-4 rounded-xl shadow-2xl text-white text-[15px] font-medium animate-fade-in"
          style={{
            backgroundColor: "#12487c",
            animation: "fadeInDown 0.3s ease-out",
          }}
        >
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-[1400px] mx-auto px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              <h1 className="text-[32px]" style={{ color: "#12487c" }}>
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 border text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                style={{ borderColor: "#12487c" }}
              >
                Ana Sayfaya Dön
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="flex gap-1">
            {[
              { key: "anasayfa", label: "Ana Sayfa" },
              { key: "hizmetler", label: "Hizmetler" },
              { key: "referanslar", label: "Referanslar" },
              { key: "hakkimizda", label: "Hakkımızda" },
              { key: "iletisim", label: "İletişim" },
              { key: "sosyal", label: "Sosyal Medya" },
              { key: "mesajlar", label: unreadCount > 0 ? `Mesajlar (${unreadCount})` : "Mesajlar" },
              { key: "hesap", label: "Hesap Ayarları" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-8 py-4 transition-colors text-[15px] border-b-2 ${
                  activeTab === tab.key
                    ? "text-white"
                    : "bg-transparent text-gray-600 hover:bg-gray-50 border-transparent"
                }`}
                style={
                  activeTab === tab.key
                    ? { backgroundColor: "#12487c", borderColor: "#12487c" }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-12 py-12">
        {/* ═══ Ana Sayfa ═══ */}
        {activeTab === "anasayfa" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              Ana Sayfa İçerikleri
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Hero Başlık</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-gray-500">🇹🇷 Türkçe</span>
                    <input
                      type="text"
                      value={heroTitle.tr}
                      onChange={(e) => setHeroTitle(setBi(heroTitle, "tr", e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">🇬🇧 English</span>
                    <input
                      type="text"
                      value={heroTitle.en}
                      onChange={(e) => setHeroTitle(setBi(heroTitle, "en", e.target.value))}
                      placeholder="Boş bırakılırsa Türkçe kullanılır"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Hero Açıklama</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-gray-500">🇹🇷 Türkçe</span>
                    <textarea
                      value={heroDescription.tr}
                      onChange={(e) => setHeroDescription(setBi(heroDescription, "tr", e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      rows={4}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">🇬🇧 English</span>
                    <textarea
                      value={heroDescription.en}
                      onChange={(e) => setHeroDescription(setBi(heroDescription, "en", e.target.value))}
                      placeholder="Boş bırakılırsa Türkçe kullanılır"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Arka Plan Videosu</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#12487c] transition-colors"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                  <svg className="w-10 h-10 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {videoFileName ? (
                    <p className="text-[15px] text-green-600 font-medium">
                      ✓ Seçilen dosya: {videoFileName}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-[15px]">
                      Video dosyası seçmek için tıklayın veya sürükleyin
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Desteklenen formatlar: MP4, WebM, MOV • Maks. boyut: tarayıcı limiti
                </p>
              </div>

              <button
                onClick={handleSaveAnasayfa}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#12487c" }}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ═══ Hizmetler ═══ */}
        {activeTab === "hizmetler" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px]" style={{ color: "#12487c" }}>
                Hizmetler Yönetimi
              </h2>
              <button
                onClick={handleAddService}
                className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: "#12487c" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni Hizmet Ekle
              </button>
            </div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[18px]" style={{ color: "#12487c" }}>
                      Hizmet {index + 1}
                    </h3>
                    <button
                      onClick={() => handleRemoveService(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Sil
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm mb-2">Başlık</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs text-gray-500">🇹🇷 TR</span>
                          <input
                            type="text"
                            value={service.title.tr}
                            onChange={(e) => handleServiceBiChange(index, "title", "tr", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">🇬🇧 EN</span>
                          <input
                            type="text"
                            value={service.title.en}
                            onChange={(e) => handleServiceBiChange(index, "title", "en", e.target.value)}
                            placeholder="Boş bırakılırsa TR kullanılır"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">Açıklama</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs text-gray-500">🇹🇷 TR</span>
                          <textarea
                            value={service.description.tr}
                            onChange={(e) =>
                              handleServiceBiChange(index, "description", "tr", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                            rows={3}
                          />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">🇬🇧 EN</span>
                          <textarea
                            value={service.description.en}
                            onChange={(e) =>
                              handleServiceBiChange(index, "description", "en", e.target.value)
                            }
                            placeholder="Boş bırakılırsa TR kullanılır"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">Görsel</label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#12487c] transition-colors"
                        onClick={() => serviceImageRefs.current[index]?.click()}
                      >
                        <input
                          ref={(el) => {
                            serviceImageRefs.current[index] = el;
                          }}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleServiceImageFile(index, e)}
                          className="hidden"
                        />
                        {service.image ? (
                          <div className="flex items-center gap-4">
                            <img
                              src={service.image}
                              alt="Önizleme"
                              className="w-24 h-24 object-cover rounded-md border border-gray-200 flex-shrink-0"
                            />
                            <div className="flex-1 text-left">
                              <p className="text-[14px] text-green-600 font-medium mb-1">
                                ✓ Görsel yüklendi
                              </p>
                              <p className="text-[13px] text-gray-500">
                                Değiştirmek için tıklayın veya yeni bir dosya sürükleyin
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleServiceImageChange(index, "");
                              }}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
                            >
                              Kaldır
                            </button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <svg
                              className="w-9 h-9 mx-auto mb-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-gray-500 text-[14px]">
                              Görsel seçmek için tıklayın
                            </p>
                            <p className="text-gray-400 text-[12px] mt-1">
                              PNG, JPG, WEBP • bilgisayarınızdan dosya yükleyin
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-700 text-sm">Özellikler</label>
                        <button
                          onClick={() => handleAddServiceFeature(index)}
                          className="px-3 py-1 text-sm rounded-lg text-white"
                          style={{ backgroundColor: "#12487c" }}
                        >
                          + Özellik Ekle
                        </button>
                      </div>
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
                          >
                            <input
                              type="text"
                              value={feature.tr}
                              placeholder="🇹🇷 TR"
                              onChange={(e) =>
                                handleServiceFeatureChange(index, featureIndex, "tr", e.target.value)
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                            />
                            <input
                              type="text"
                              value={feature.en}
                              placeholder="🇬🇧 EN (boşsa TR kullanılır)"
                              onChange={(e) =>
                                handleServiceFeatureChange(index, featureIndex, "en", e.target.value)
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                            />
                            <button
                              onClick={() => handleRemoveServiceFeature(index, featureIndex)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                            >
                              Sil
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleSaveHizmetler}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#12487c" }}
              >
                Tüm Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ═══ Referanslar ═══ */}
        {activeTab === "referanslar" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px]" style={{ color: "#12487c" }}>
                Referanslar Yönetimi
              </h2>
              <button
                onClick={handleAddProject}
                className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                style={{ backgroundColor: "#12487c" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni Referans Ekle
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[16px]" style={{ color: "#12487c" }}>
                      Referans {index + 1}
                    </h3>
                    <button
                      onClick={() => handleRemoveProject(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Sil
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">Müşteri 🇹🇷 TR</label>
                        <input
                          type="text"
                          value={project.client.tr}
                          onChange={(e) => handleProjectBiChange(index, "client", "tr", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">Müşteri 🇬🇧 EN</label>
                        <input
                          type="text"
                          value={project.client.en}
                          placeholder="Boşsa TR kullanılır"
                          onChange={(e) => handleProjectBiChange(index, "client", "en", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">Proje 🇹🇷 TR</label>
                        <input
                          type="text"
                          value={project.project.tr}
                          onChange={(e) => handleProjectBiChange(index, "project", "tr", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-1">Proje 🇬🇧 EN</label>
                        <input
                          type="text"
                          value={project.project.en}
                          placeholder="Boşsa TR kullanılır"
                          onChange={(e) => handleProjectBiChange(index, "project", "en", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Yıl</label>
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => handleProjectYearChange(index, e.target.value)}
                        className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Logo</label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#12487c] transition-colors"
                        onClick={() => projectLogoRefs.current[index]?.click()}
                      >
                        <input
                          ref={(el) => {
                            projectLogoRefs.current[index] = el;
                          }}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProjectLogoFile(index, e)}
                          className="hidden"
                        />
                        {project.logo ? (
                          <div className="flex items-center gap-4">
                            <img
                              src={project.logo}
                              alt="Logo önizleme"
                              className="w-20 h-20 object-contain rounded-md border border-gray-200 bg-white flex-shrink-0"
                            />
                            <div className="flex-1 text-left">
                              <p className="text-[13px] text-green-600 font-medium mb-1">
                                ✓ Logo yüklendi
                              </p>
                              <p className="text-[12px] text-gray-500">
                                Değiştirmek için tıklayın
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProjectLogoChange(index, "");
                              }}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
                            >
                              Kaldır
                            </button>
                          </div>
                        ) : (
                          <div className="py-3">
                            <svg
                              className="w-8 h-8 mx-auto mb-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-gray-500 text-[13px]">
                              Logo görseli seçmek için tıklayın
                            </p>
                            <p className="text-gray-400 text-[12px] mt-1">
                              PNG, JPG, SVG • şeffaf arka planlı PNG önerilir
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleSaveReferanslar}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#12487c" }}
              >
                Tüm Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ═══ Hakkımızda ═══ */}
        {activeTab === "hakkimizda" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              Hakkımızda İçerikleri
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Şirket Tanıtımı</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-gray-500">🇹🇷 Türkçe</span>
                    <textarea
                      value={aboutContent.tr}
                      onChange={(e) => setAboutContent(setBi(aboutContent, "tr", e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      rows={8}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">🇬🇧 English</span>
                    <textarea
                      value={aboutContent.en}
                      onChange={(e) => setAboutContent(setBi(aboutContent, "en", e.target.value))}
                      placeholder="Boş bırakılırsa Türkçe kullanılır"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      rows={8}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  İpucu: Paragrafları ayırmak için boş bir satır bırakın.
                </p>
              </div>

              <button
                onClick={handleSaveHakkimizda}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#12487c" }}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ═══ İletişim ═══ */}
        {activeTab === "iletisim" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              İletişim Bilgileri
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Adres</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-gray-500">🇹🇷 Türkçe</span>
                    <textarea
                      value={contactAddress.tr}
                      onChange={(e) => setContactAddress(setBi(contactAddress, "tr", e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      rows={3}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">🇬🇧 English</span>
                    <textarea
                      value={contactAddress.en}
                      onChange={(e) => setContactAddress(setBi(contactAddress, "en", e.target.value))}
                      placeholder="Boş bırakılırsa Türkçe kullanılır"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Telefon 1</label>
                  <input
                    type="text"
                    value={contactPhone1}
                    onChange={(e) => setContactPhone1(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Telefon 2</label>
                  <input
                    type="text"
                    value={contactPhone2}
                    onChange={(e) => setContactPhone2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">E-posta 1</label>
                  <input
                    type="email"
                    value={contactEmail1}
                    onChange={(e) => setContactEmail1(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">E-posta 2</label>
                  <input
                    type="email"
                    value={contactEmail2}
                    onChange={(e) => setContactEmail2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveIletisim}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#12487c" }}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ═══ Sosyal Medya ═══ */}
        {activeTab === "sosyal" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-2" style={{ color: "#12487c" }}>
              Sosyal Medya Yönetimi
            </h2>
            <p className="text-gray-500 text-[15px] mb-8">
              Hangi sosyal medya ikonlarının sitede görünür olacağını seçin.
            </p>

            <div className="space-y-4 max-w-[640px]">
              {([
                { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/kullaniciadi" },
                { key: "linkedin" as const, label: "LinkedIn", placeholder: "https://linkedin.com/company/firma" },
                { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/sayfa" },
                { key: "twitter" as const, label: "Twitter / X", placeholder: "https://x.com/kullaniciadi" },
                { key: "youtube" as const, label: "YouTube", placeholder: "https://youtube.com/@kanal" },
              ]).map(({ key, label, placeholder }) => (
                <div
                  key={key}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] text-gray-700 font-medium">{label}</span>
                    <label className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        checked={socialVis[key]}
                        onChange={(e) => setSocialVis({ ...socialVis, [key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#12487c] transition-colors" />
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={socialLinks[key]}
                    onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                  />
                  <p className="text-[12px] text-gray-500 mt-1.5">
                    Link boş bırakılırsa ikon görünür olsa bile sitede gösterilmez.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={handleSaveSocial}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#12487c" }}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* ═══ Mesajlar ═══ */}
        {activeTab === "mesajlar" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px]" style={{ color: "#12487c" }}>
                Gelen Mesajlar
              </h2>
              <span className="text-sm text-gray-500">
                Toplam {messages.length} mesaj • {unreadCount} okunmamış
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              İletişim formundan gelen mesajlar burada listelenir. Ayrıca <strong>info@dpiteknoloji.com.tr</strong> adresine e-posta olarak da iletilir (Web3Forms anahtarı tanımlıysa).
            </p>
            {messages.length === 0 ? (
              <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                Henüz mesaj yok.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`border rounded-lg p-5 transition-colors ${
                      m.read ? "bg-gray-50 border-gray-200" : "bg-white border-[#12487c]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!m.read && (
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{ backgroundColor: "#e8860c" }}
                            />
                          )}
                          <h3 className="font-semibold text-[16px]" style={{ color: "#12487c" }}>
                            {m.subject || "(Konu yok)"}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>{m.name}</strong>
                          {" • "}
                          <a
                            href={`mailto:${encodeURIComponent(m.email)}`}
                            className="text-blue-600 hover:underline"
                          >
                            {m.email}
                          </a>
                          {m.phone && (
                            <>
                              {" • "}
                              <a
                                href={`tel:${m.phone.replace(/[^\d+]/g, "")}`}
                                className="text-blue-600 hover:underline"
                              >
                                {m.phone}
                              </a>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(m.createdAt).toLocaleString("tr-TR")}
                          {" • "}
                          {m.emailSent ? (
                            <span className="text-green-600">📧 E-posta gönderildi</span>
                          ) : (
                            <span className="text-gray-500">📭 Sadece panelde</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => markMessageRead(m.id, !m.read)}
                          className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                        >
                          {m.read ? "Okunmadı işaretle" : "Okundu işaretle"}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
                              deleteMessage(m.id);
                            }
                          }}
                          className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-800 whitespace-pre-line bg-white rounded p-3 border border-gray-100">
                      {m.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══ Hesap Ayarları ═══ */}
        {activeTab === "hesap" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              Hesap Ayarları
            </h2>
            <div className="space-y-6 max-w-[600px]">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#12487c" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>E-posta:</strong> info@dpiteknoloji.com.tr
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Güvenliğiniz için şifrenizi düzenli olarak değiştirin
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mevcut Şifre</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  placeholder="Mevcut şifrenizi girin"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Yeni Şifre</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  placeholder="Yeni şifrenizi girin"
                />
                <p className="text-sm text-gray-500 mt-1">En az 6 karakter olmalıdır</p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  placeholder="Yeni şifrenizi tekrar girin"
                />
              </div>

              {passwordError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{passwordError}</p>
                </div>
              )}

              <button
                onClick={handleChangePassword}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#12487c" }}
              >
                Şifreyi Değiştir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
