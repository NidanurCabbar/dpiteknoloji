export function Referanslar() {
  const projects = [
    {
      client: "İstanbul Büyükşehir Belediyesi",
      project: "Taksim Meydanı LED Ekran Sistemi",
      year: "2024",
    },
    {
      client: "Türk Telekom Arena",
      project: "Stadyum Ses ve Görüntü Sistemi",
      year: "2023",
    },
    {
      client: "Ankara Kongre Merkezi",
      project: "Konferans Salonu Teknolojik Altyapı",
      year: "2024",
    },
    {
      client: "İzmir Fuar Alanı",
      project: "Açık Hava Etkinlik Ses Sistemi",
      year: "2023",
    },
    {
      client: "Zorlu Center PSM",
      project: "Tiyatro ve Konser Salonu Işıklandırma",
      year: "2022",
    },
    {
      client: "Antalya EXPO 2016",
      project: "Dev LED Ekran ve Ses Altyapısı",
      year: "2023",
    },
    {
      client: "Vodafone Park",
      project: "Stadyum LED Ekran Modernizasyonu",
      year: "2024",
    },
    {
      client: "Atatürk Havalimanı",
      project: "Terminal Bilgilendirme Ekranları",
      year: "2022",
    },
    {
      client: "Ankara Sanat Tiyatrosu",
      project: "Sahne Işık ve Ses Sistemi",
      year: "2023",
    },
  ];

  const clients = [
    "İstanbul Büyükşehir Belediyesi",
    "Ankara Büyükşehir Belediyesi",
    "İzmir Büyükşehir Belediyesi",
    "Türk Telekom",
    "Vodafone",
    "Turkcell",
    "Zorlu Holding",
    "AVM Yönetim A.Ş.",
    "Kültür ve Turizm Bakanlığı",
    "Spor Toto Teşkilatı",
    "THY",
    "Garanti BBVA",
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-[1200px] mx-auto px-12 text-center">
          <h1 className="text-[48px] mb-4" style={{ color: "#12487c" }}>
            Referanslarımız
          </h1>
          <p className="text-gray-600 text-[18px] max-w-[700px] mx-auto">
            500'den fazla başarılı proje ile sektörde fark yaratan çalışmalarımız
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <h2 className="text-[36px] text-center mb-16" style={{ color: "#12487c" }}>
            Öne Çıkan Projelerimiz
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#12487c" }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[20px] mb-2" style={{ color: "#12487c" }}>
                  {project.client}
                </h3>
                <p className="text-gray-700 text-[15px] mb-3 leading-relaxed">
                  {project.project}
                </p>
                <span className="inline-block text-[13px] text-gray-500 bg-gray-100 px-3 py-1 rounded">
                  {project.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-12">
          <h2 className="text-[36px] text-center mb-16" style={{ color: "#12487c" }}>
            Çözüm Ortağı Olduğumuz Kurumlar
          </h2>
          <div className="grid grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-8 flex items-center justify-center h-32 hover:shadow-md transition-shadow"
              >
                <span className="text-[16px] text-gray-700 text-center">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <h2 className="text-[36px] text-center mb-16" style={{ color: "#12487c" }}>
            Müşteri Görüşleri
          </h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-lg p-10">
              <div className="text-[32px] mb-4" style={{ color: "#12487c" }}>
                "
              </div>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6 italic">
                DPI TEKNOLOJİ ile çalışmak büyük bir keyifti. Stadyumumuz için kurdukları LED ekran
                sistemi hem görsel kalitesi hem de dayanıklılığı ile beklentilerimizi aştı. Teknik
                ekipleri son derece profesyonel ve çözüm odaklı.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#12487c" }}>
                  <span className="text-white text-[18px]">TT</span>
                </div>
                <div>
                  <p className="text-gray-800">Teknik Müdür</p>
                  <p className="text-gray-500 text-[14px]">Türk Telekom Arena</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-10">
              <div className="text-[32px] mb-4" style={{ color: "#12487c" }}>
                "
              </div>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6 italic">
                Konferans merkezimiz için ihtiyaç duyduğumuz ses ve görüntü altyapısını kusursuz bir
                şekilde kurdular. Proje yönetimi ve zaman planlaması mükemmeldi. Kesinlikle tavsiye
                ediyoruz.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#12487c" }}>
                  <span className="text-white text-[18px]">AK</span>
                </div>
                <div>
                  <p className="text-gray-800">Genel Koordinatör</p>
                  <p className="text-gray-500 text-[14px]">Ankara Kongre Merkezi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
