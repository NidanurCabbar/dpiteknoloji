import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export function AdminPanel() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"anasayfa" | "hizmetler" | "hakkimizda" | "iletisim">("anasayfa");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 shadow-2xl z-50" style={{ borderColor: "#12487c" }}>
      <div className="max-w-[1440px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <h3 className="text-lg" style={{ color: "#12487c" }}>
              Admin Panel
            </h3>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          {["anasayfa", "hizmetler", "hakkimizda", "iletisim"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                activeTab === tab
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={activeTab === tab ? { backgroundColor: "#12487c" } : {}}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
          {activeTab === "anasayfa" && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 mb-3">Ana Sayfa İçerikleri</h4>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Hero Başlık</label>
                <input
                  type="text"
                  defaultValue="Teknoloji ve Güvenilirlik"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Hero Açıklama</label>
                <textarea
                  defaultValue="DPI TEKNOLOJİ, büyük ölçekli LED ekran, profesyonel ses ve ışıklandırma sistemleri konusunda kurumsal çözümler sunan lider teknoloji şirketidir."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Arka Plan Videosu</label>
                <input
                  type="file"
                  accept="video/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <button
                className="px-4 py-2 text-white rounded-lg text-sm"
                style={{ backgroundColor: "#12487c" }}
              >
                Kaydet
              </button>
            </div>
          )}

          {activeTab === "hizmetler" && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 mb-3">Hizmetler Sayfası</h4>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Hizmet 1 Başlığı</label>
                <input
                  type="text"
                  defaultValue="Profesyonel Led Ekran Sistemleri"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Hizmet 2 Başlığı</label>
                <input
                  type="text"
                  defaultValue="Profesyonel Ses, Işık Ve Görüntü Sistemi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Hizmet 3 Başlığı</label>
                <input
                  type="text"
                  defaultValue="Zayıf Akım Sistemleri"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Arka Plan Görselleri (4 adet)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <button
                className="px-4 py-2 text-white rounded-lg text-sm"
                style={{ backgroundColor: "#12487c" }}
              >
                Kaydet
              </button>
            </div>
          )}

          {activeTab === "hakkimizda" && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 mb-3">Hakkımızda Sayfası</h4>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Şirket Tanıtımı</label>
                <textarea
                  defaultValue="2010 yılında kurulan DPI TEKNOLOJİ, görsel ve işitsel teknolojiler alanında Türkiye'nin önde gelen şirketlerinden biridir."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Arka Plan Görseli</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <button
                className="px-4 py-2 text-white rounded-lg text-sm"
                style={{ backgroundColor: "#12487c" }}
              >
                Kaydet
              </button>
            </div>
          )}

          {activeTab === "iletisim" && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 mb-3">İletişim Bilgileri</h4>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Adres</label>
                <textarea
                  defaultValue="Atatürk Mahallesi, Teknoloji Caddesi No: 123, Kat: 4 Çankaya / ANKARA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Telefon 1</label>
                <input
                  type="text"
                  defaultValue="+90 (312) 123 45 67"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">E-posta</label>
                <input
                  type="email"
                  defaultValue="info@dpiteknoloji.com.tr"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <button
                className="px-4 py-2 text-white rounded-lg text-sm"
                style={{ backgroundColor: "#12487c" }}
              >
                Kaydet
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-gray-500 text-center">
          Klavyeden <kbd className="px-2 py-1 bg-gray-200 rounded">Shift</kbd> + <kbd className="px-2 py-1 bg-gray-200 rounded">S</kbd> ile admin panelini açabilirsiniz
        </div>
      </div>
    </div>
  );
}
