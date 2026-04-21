import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSiteContent, ServiceData, ProjectData, SocialVisibility, Bi } from "../contexts/SiteContentContext";
import { useNavigate } from "react-router";

type EditLang = "en" | "tr";

export function Admin() {
  const { logout, isAdmin, changePassword } = useAuth();
  const { content, updateAnasayfa, updateHizmetler, updateReferanslar, updateHakkimizda, updateIletisim, updateSocialVisibility, setHeroVideoFile } = useSiteContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"anasayfa" | "hizmetler" | "referanslar" | "hakkimizda" | "iletisim" | "sosyal" | "hesap">("anasayfa");

  /* ─── Düzenlenen dil (EN/TR) ─── */
  const [editLang, setEditLang] = useState<EditLang>("tr");

  /* ─── Toast bildirimi ─── */
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
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

  /* ─── Hesap state ─── */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ═══════ KAYDET HANDLERLERİ ═══════ */

  const handleSaveAnasayfa = () => {
    // Video dosyası seçildiyse kaydet
    if (pendingVideoRef.current) {
      setHeroVideoFile(pendingVideoRef.current);
      pendingVideoRef.current = null;
    }
    // Metin içeriklerini kaydet
    updateAnasayfa({
      heroTitle,
      heroDescription,
      heroVideoUrl: content.anasayfa.heroVideoUrl,
    });
    showToast("✓ Ana sayfa içerikleri kaydedildi!");
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      pendingVideoRef.current = file;
      setVideoFileName(file.name);
    }
  };

  const handleSaveHizmetler = () => {
    updateHizmetler({ services });
    showToast("✓ Hizmetler kaydedildi!");
  };

  const handleSaveReferanslar = () => {
    updateReferanslar({ projects });
    showToast("✓ Referanslar kaydedildi!");
  };

  const handleSaveHakkimizda = () => {
    updateHakkimizda({ aboutText: aboutContent });
    showToast("✓ Hakkımızda içerikleri kaydedildi!");
  };

  const handleSaveIletisim = () => {
    updateIletisim({
      address: contactAddress,
      phone1: contactPhone1,
      phone2: contactPhone2,
      email1: contactEmail1,
      email2: contactEmail2,
    });
    showToast("✓ İletişim bilgileri kaydedildi!");
  };

  const handleSaveSocial = () => {
    updateSocialVisibility(socialVis);
    showToast("✓ Sosyal medya ayarları kaydedildi!");
  };

  /* ═══════ HİZMET YARDIMCILARI ═══════ */

  const handleAddService = () => {
    setServices([
      ...services,
      {
        title: { en: "New Service", tr: "Yeni Hizmet" },
        description: { en: "Service description", tr: "Hizmet açıklaması" },
        features: [
          { en: "Feature 1", tr: "Özellik 1" },
          { en: "Feature 2", tr: "Özellik 2" },
          { en: "Feature 3", tr: "Özellik 3" },
        ],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1080",
      },
    ]);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Bi alanları (title/description) için
  const handleServiceBiChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newServices = [...services];
    const current = newServices[index][field];
    newServices[index] = {
      ...newServices[index],
      [field]: { ...current, [editLang]: value },
    };
    setServices(newServices);
  };

  // Image alanı (tek string)
  const handleServiceImageChange = (index: number, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], image: value };
    setServices(newServices);
  };

  const handleServiceFeatureChange = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...services];
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      features: newServices[serviceIndex].features.map((f, i) =>
        i === featureIndex ? { ...f, [editLang]: value } : f
      ),
    };
    setServices(newServices);
  };

  const handleAddServiceFeature = (serviceIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      features: [...newServices[serviceIndex].features, { en: "New feature", tr: "Yeni özellik" }],
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
        client: { en: "New Client", tr: "Yeni Müşteri" },
        project: { en: "New Project", tr: "Yeni Proje" },
        year: "2024",
      },
    ]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Bi alanları (client/project)
  const handleProjectBiChange = (index: number, field: "client" | "project", value: string) => {
    const newProjects = [...projects];
    const current = newProjects[index][field];
    newProjects[index] = { ...newProjects[index], [field]: { ...current, [editLang]: value } };
    setProjects(newProjects);
  };

  // Year (tek string)
  const handleProjectYearChange = (index: number, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], year: value };
    setProjects(newProjects);
  };

  /* ═══════ ŞİFRE DEĞİŞTİRME ═══════ */

  const handleChangePassword = () => {
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
    const success = changePassword(currentPassword, newPassword);
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
        {/* Düzenlenen Dil Seçici - Metin içerikli tablar için göster */}
        {(activeTab === "anasayfa" ||
          activeTab === "hizmetler" ||
          activeTab === "referanslar" ||
          activeTab === "hakkimizda" ||
          activeTab === "iletisim") && (
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4 flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Düzenlenen Dil:</span>
            <div className="flex gap-2">
              {(["en", "tr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setEditLang(l)}
                  className="px-4 py-1.5 text-sm rounded-md border transition-colors"
                  style={
                    editLang === l
                      ? { backgroundColor: "#12487c", color: "#fff", borderColor: "#12487c" }
                      : { backgroundColor: "#fff", color: "#4b5563", borderColor: "#d1d5db" }
                  }
                >
                  {l === "en" ? "EN" : "TR"}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-2">
              Her iki dildeki içeriği ayrı ayrı düzenleyip kaydedin.
            </span>
          </div>
        )}

        {/* ═══ Ana Sayfa ═══ */}
        {activeTab === "anasayfa" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              Ana Sayfa İçerikleri
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Hero Başlık ({editLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={heroTitle[editLang]}
                  onChange={(e) => setHeroTitle({ ...heroTitle, [editLang]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Hero Açıklama ({editLang.toUpperCase()})
                </label>
                <textarea
                  value={heroDescription[editLang]}
                  onChange={(e) =>
                    setHeroDescription({ ...heroDescription, [editLang]: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  rows={4}
                />
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
                      <label className="block text-gray-700 text-sm mb-2">
                        Başlık ({editLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={service.title[editLang]}
                        onChange={(e) => handleServiceBiChange(index, "title", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">
                        Açıklama ({editLang.toUpperCase()})
                      </label>
                      <textarea
                        value={service.description[editLang]}
                        onChange={(e) =>
                          handleServiceBiChange(index, "description", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">Görsel URL</label>
                      <input
                        type="text"
                        value={service.image}
                        onChange={(e) => handleServiceImageChange(index, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-700 text-sm">
                          Özellikler ({editLang.toUpperCase()})
                        </label>
                        <button
                          onClick={() => handleAddServiceFeature(index)}
                          className="px-3 py-1 text-sm rounded-lg text-white"
                          style={{ backgroundColor: "#12487c" }}
                        >
                          + Özellik Ekle
                        </button>
                      </div>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={feature[editLang]}
                              onChange={(e) =>
                                handleServiceFeatureChange(index, featureIndex, e.target.value)
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
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

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">
                        Müşteri ({editLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={project.client[editLang]}
                        onChange={(e) => handleProjectBiChange(index, "client", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">
                        Proje ({editLang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={project.project[editLang]}
                        onChange={(e) => handleProjectBiChange(index, "project", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Yıl</label>
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => handleProjectYearChange(index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                      />
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
                <label className="block text-gray-700 mb-2 font-medium">
                  Şirket Tanıtımı ({editLang.toUpperCase()})
                </label>
                <textarea
                  value={aboutContent[editLang]}
                  onChange={(e) =>
                    setAboutContent({ ...aboutContent, [editLang]: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  rows={6}
                />
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
                <label className="block text-gray-700 mb-2 font-medium">
                  Adres ({editLang.toUpperCase()})
                </label>
                <textarea
                  value={contactAddress[editLang]}
                  onChange={(e) =>
                    setContactAddress({ ...contactAddress, [editLang]: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  rows={3}
                />
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

            <div className="space-y-4 max-w-[500px]">
              {([
                { key: "instagram" as const, label: "Instagram" },
                { key: "linkedin" as const, label: "LinkedIn" },
                { key: "facebook" as const, label: "Facebook" },
                { key: "twitter" as const, label: "Twitter / X" },
                { key: "youtube" as const, label: "YouTube" },
              ]).map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="text-[15px] text-gray-700 font-medium">{label}</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={socialVis[key]}
                      onChange={(e) => setSocialVis({ ...socialVis, [key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#12487c] transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                  </div>
                </label>
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
