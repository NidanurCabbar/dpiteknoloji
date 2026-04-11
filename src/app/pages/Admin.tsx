import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface Project {
  client: string;
  project: string;
  year: string;
}

export function Admin() {
  const { logout, isAdmin, changePassword } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"anasayfa" | "hizmetler" | "referanslar" | "hakkimizda" | "iletisim" | "hesap">("anasayfa");

  // Anasayfa state
  const [heroTitle, setHeroTitle] = useState("Teknoloji ve Güvenilirlik");
  const [heroDescription, setHeroDescription] = useState("DPI TEKNOLOJİ, büyük ölçekli LED ekran, profesyonel ses ve ışıklandırma sistemleri konusunda kurumsal çözümler sunan lider teknoloji şirketidir.");

  // Hizmetler state
  const [services, setServices] = useState<Service[]>([
    {
      title: "Profesyonel Led Ekran Sistemleri",
      description: "En son teknoloji LED ekran sistemleri ile etkinliklerinize, mekanlarınıza ve projelerinize görsel mükemmellik katıyoruz.",
      features: [
        "İç ve dış mekan LED ekran kurulumu",
        "Stadyum ve arena LED sistemleri",
        "Reklam ve bilgilendirme ekranları",
      ],
      image: "https://images.unsplash.com/photo-1575719028439-65ce8662c1cc?w=1080",
    },
    {
      title: "Profesyonel Ses, Işık Ve Görüntü Sistemi",
      description: "Konserlerden konferanslara, tiyatro sahnesinden açık hava etkinliklerine kadar her ortam için özel tasarlanmış profesyonel ses çözümleri sunuyoruz.",
      features: [
        "Konser ve etkinlik ses sistemleri",
        "Konferans salonu akustiği",
        "Line array ve point source hoparlör sistemleri",
      ],
      image: "https://images.unsplash.com/photo-1773625545016-d575264483e9?w=1080",
    },
    {
      title: "Zayıf Akım Sistemleri",
      description: "Işıklandırma sistemlerimiz ile mekanlarınızı dönüştürüyor, etkinliklerinize görsel derinlik katıyoruz.",
      features: [
        "Mimari cephe aydınlatması",
        "Sahne ve etkinlik ışıklandırması",
        "LED ve moving head sistemleri",
      ],
      image: "https://images.unsplash.com/photo-1760210885713-624a29a48633?w=1080",
    },
  ]);

  // Referanslar state
  const [projects, setProjects] = useState<Project[]>([
    { client: "İstanbul Büyükşehir Belediyesi", project: "Taksim Meydanı LED Ekran Sistemi", year: "2024" },
    { client: "Türk Telekom Arena", project: "Stadyum Ses ve Görüntü Sistemi", year: "2023" },
    { client: "Ankara Kongre Merkezi", project: "Konferans Salonu Teknolojik Altyapı", year: "2024" },
  ]);

  // Hakkımızda state
  const [aboutContent, setAboutContent] = useState("2010 yılında kurulan DPI TEKNOLOJİ, görsel ve işitsel teknolojiler alanında Türkiye'nin önde gelen şirketlerinden biridir.");

  // İletişim state
  const [contactAddress, setContactAddress] = useState("Atatürk Mahallesi, Teknoloji Caddesi\nNo: 123, Kat: 4\nÇankaya / ANKARA");
  const [contactPhone1, setContactPhone1] = useState("+90 (312) 123 45 67");
  const [contactPhone2, setContactPhone2] = useState("+90 (312) 123 45 68");
  const [contactEmail1, setContactEmail1] = useState("info@dpiteknoloji.com.tr");
  const [contactEmail2, setContactEmail2] = useState("destek@dpiteknoloji.com.tr");

  // Hesap state
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

  const handleSaveAnasayfa = () => {
    alert("Ana sayfa içerikleri kaydedildi!");
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        title: "Yeni Hizmet",
        description: "Hizmet açıklaması",
        features: ["Özellik 1", "Özellik 2", "Özellik 3"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1080",
      },
    ]);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const handleServiceFeatureChange = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...services];
    newServices[serviceIndex].features[featureIndex] = value;
    setServices(newServices);
  };

  const handleAddServiceFeature = (serviceIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex].features.push("Yeni özellik");
    setServices(newServices);
  };

  const handleRemoveServiceFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex].features = newServices[serviceIndex].features.filter((_, i) => i !== featureIndex);
    setServices(newServices);
  };

  const handleAddProject = () => {
    setProjects([...projects, { client: "Yeni Müşteri", project: "Yeni Proje", year: "2024" }]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

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
      alert("Şifre başarıyla değiştirildi!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordError("Mevcut şifre hatalı");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
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
        {/* Ana Sayfa */}
        {activeTab === "anasayfa" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              Ana Sayfa İçerikleri
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Hero Başlık</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Hero Açıklama</label>
                <textarea
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Arka Plan Videosu</label>
                <input
                  type="file"
                  accept="video/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Mevcut video: led_ekran_aydınlatma.mp4
                </p>
              </div>

              <button
                onClick={handleSaveAnasayfa}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#12487c" }}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Hizmetler */}
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
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleServiceChange(index, "title", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">Açıklama</label>
                      <textarea
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-2">Görsel URL</label>
                      <input
                        type="text"
                        value={service.image}
                        onChange={(e) => handleServiceChange(index, "image", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                      />
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
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
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
                onClick={() => alert("Hizmetler kaydedildi!")}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#12487c" }}
              >
                Tüm Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Referanslar */}
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
                      <label className="block text-gray-700 text-sm mb-1">Müşteri</label>
                      <input
                        type="text"
                        value={project.client}
                        onChange={(e) => handleProjectChange(index, "client", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Proje</label>
                      <input
                        type="text"
                        value={project.project}
                        onChange={(e) => handleProjectChange(index, "project", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Yıl</label>
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => handleProjectChange(index, "year", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => alert("Referanslar kaydedildi!")}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#12487c" }}
              >
                Tüm Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Hakkımızda */}
        {activeTab === "hakkimizda" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              Hakkımızda İçerikleri
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Şirket Tanıtımı</label>
                <textarea
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  rows={6}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Arka Plan Görseli</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-2">Mevcut görsel yüklü</p>
              </div>

              <button
                onClick={() => alert("Hakkımızda içerikleri kaydedildi!")}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#12487c" }}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* İletişim */}
        {activeTab === "iletisim" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-[24px] mb-6" style={{ color: "#12487c" }}>
              İletişim Bilgileri
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Adres</label>
                <textarea
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Telefon 1</label>
                  <input
                    type="text"
                    value={contactPhone1}
                    onChange={(e) => setContactPhone1(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Telefon 2</label>
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
                  <label className="block text-gray-700 mb-2">E-posta 1</label>
                  <input
                    type="email"
                    value={contactEmail1}
                    onChange={(e) => setContactEmail1(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">E-posta 2</label>
                  <input
                    type="email"
                    value={contactEmail2}
                    onChange={(e) => setContactEmail2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Arka Plan Görseli</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-2">Mevcut görsel yüklü</p>
              </div>

              <button
                onClick={() => alert("İletişim bilgileri kaydedildi!")}
                className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#12487c" }}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Hesap Ayarları */}
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
                      <strong>E-posta:</strong> admin_s@gmail.com
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
