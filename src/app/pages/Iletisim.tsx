import { useState } from "react";
import bgImage from "figma:asset/ed053a64549a21b8e2a9e3260dcdb7a6c82d99f3.png";

export function Iletisim() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const address = "Atatürk Mahallesi, Teknoloji Caddesi No: 123, Kat: 4, Çankaya/ANKARA";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajınız alındı! En kısa sürede sizinle iletişime geçeceğiz.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/30" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-12 text-center">
          <h1 className="text-[48px] mb-4" style={{ color: "#12487c" }}>
            İletişim
          </h1>
          <p className="text-gray-600 text-[18px] max-w-[700px] mx-auto">
            Projeleriniz için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-[32px] mb-8" style={{ color: "#12487c" }}>
                Bize Ulaşın
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-[15px] mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[15px] mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[15px] mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-[15px] mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12487c] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-4 rounded-lg hover:opacity-90 transition-opacity text-[16px]"
                  style={{ backgroundColor: "#12487c" }}
                >
                  Gönder
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-[32px] mb-8" style={{ color: "#12487c" }}>
                İletişim Bilgileri
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#12487c" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[18px] mb-2" style={{ color: "#12487c" }}>
                        Adres
                      </h3>
                      <p className="text-gray-700 text-[15px] leading-relaxed">
                        Atatürk Mahallesi, Teknoloji Caddesi<br />
                        No: 123, Kat: 4<br />
                        Çankaya / ANKARA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#12487c" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[18px] mb-2" style={{ color: "#12487c" }}>
                        Telefon
                      </h3>
                      <p className="text-gray-700 text-[15px]">+90 (312) 123 45 67</p>
                      <p className="text-gray-700 text-[15px]">+90 (312) 123 45 68</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#12487c" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[18px] mb-2" style={{ color: "#12487c" }}>
                        E-posta
                      </h3>
                      <p className="text-gray-700 text-[15px]">info@dpiteknoloji.com.tr</p>
                      <p className="text-gray-700 text-[15px]">destek@dpiteknoloji.com.tr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#12487c" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[18px] mb-2" style={{ color: "#12487c" }}>
                        Çalışma Saatleri
                      </h3>
                      <p className="text-gray-700 text-[15px]">Pazartesi - Cuma: 09:00 - 18:00</p>
                      <p className="text-gray-700 text-[15px]">Cumartesi: 10:00 - 15:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="h-[300px] bg-gray-200 relative rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DPI Teknoloji Konum"
              className="w-full h-full"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#12487c" }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[12px] text-gray-600 mb-0.5">Konumumuzu Görüntüle</p>
                  <p className="text-[13px]" style={{ color: "#12487c" }}>
                    Atatürk Mah., Teknoloji Cad. No: 123, Kat: 4, Çankaya/ANKARA
                  </p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
