import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "tr";

/* ─── Çeviri sözlüğü ─── */
type Dict = Record<string, string>;

const en: Dict = {
  // Navbar
  "nav.home": "HOME",
  "nav.about": "ABOUT",
  "nav.services": "SERVICES",
  "nav.references": "REFERENCES",
  "nav.contact": "CONTACT",

  // TopBar
  "top.address": "Atatürk Neighborhood, Teknoloji Avenue No:123, Çankaya / ANKARA",

  // Sticky
  "sticky.getQuote": "Get a Quote",

  // Footer
  "footer.intro":
    "Your trusted technology partner providing corporate solutions in large-scale LED displays, professional audio, lighting and low-current systems.",
  "footer.quickLinks": "QUICK LINKS",
  "footer.services": "SERVICES",
  "footer.contact": "CONTACT",
  "footer.address": "Atatürk Neighborhood, Teknoloji Ave.\nNo:123, Çankaya / ANKARA",
  "footer.copyright": "All rights reserved.",
  "footer.kvkk": "Privacy Notice",
  "footer.privacy": "Privacy Policy",
  "footer.cookies": "Cookie Policy",
  "footer.service1": "Professional LED Display Systems",
  "footer.service2": "Sound, Light and Image Systems",
  "footer.service3": "Low-Current Systems",

  // Home (Anasayfa)
  "home.hero.titleBefore": "Technology and ",
  "home.hero.titleAccent": "Reliability",
  "home.hero.titleAfter": "",
  "home.hero.description":
    "DPI TEKNOLOJİ is a leading technology company providing corporate solutions in large-scale LED displays, professional audio and lighting systems.",
  "home.services.kicker": "What We Do",
  "home.services.title": "Our Services",
  "home.services.subtitle": "Click on the cards for detailed information",
  "home.service1.title": "PROFESSIONAL LED DISPLAY SYSTEMS",
  "home.service1.description":
    "At DPI TEKNOLOJİ, we install LED displays of every scale — from stadiums and outdoor events to commercial venues and concert areas. We add value to your projects with high resolution, durability and stunning image quality.",
  "home.service2.title": "PROFESSIONAL SOUND, LIGHT & IMAGE SYSTEMS",
  "home.service2.description":
    "We deliver professional-grade sound systems for concerts, conferences, meetings and events. With acoustic analysis, sound design and technical support we create a flawless audio experience, tailored for each venue.",
  "home.service3.title": "LOW-CURRENT SYSTEMS",
  "home.service3.description":
    "Our expert team handles architectural lighting, stage lighting and event light systems. We transform spaces with aesthetic, functional designs that add visual depth to every event.",
  "home.cta.titleBefore": "Technical Consultancy ",
  "home.cta.titleAccent": "for Your Project",
  "home.cta.titleAfter": "",
  "home.cta.description":
    "Our experienced team analyzes your project's needs and delivers tailored solutions",
  "home.cta.button": "Contact Us",

  // Services (Hizmetler)
  "services.hero.kicker": "Our Expertise",
  "services.hero.title": "Our Services",
  "services.hero.subtitle": "Professional technology solutions for large-scale projects",
  "services.cta.getQuote": "Get a Quote",
  "services.s1.title": "Professional LED Display Systems",
  "services.s1.description":
    "We bring visual excellence to your events, venues and projects with the latest LED display technology. High brightness, wide viewing angles and long-lasting build make our professional LED solutions fit every need.",
  "services.s1.f1": "Indoor and outdoor LED display installation",
  "services.s1.f2": "Stadium and arena LED systems",
  "services.s1.f3": "Advertising and information displays",
  "services.s1.f4": "High-resolution video wall systems",
  "services.s1.f5": "Mobile LED display solutions",
  "services.s1.f6": "24/7 technical support and maintenance",
  "services.s2.title": "Professional Sound, Light and Image Systems",
  "services.s2.description":
    "From concerts to conferences, theaters to outdoor events, we deliver professional audio solutions designed for every environment. We use state-of-the-art equipment for crystal-clear sound and flawless acoustics.",
  "services.s2.f1": "Concert and event sound systems",
  "services.s2.f2": "Conference room acoustics",
  "services.s2.f3": "Line array and point source speaker systems",
  "services.s2.f4": "Digital mixers and audio processing",
  "services.s2.f5": "Wireless microphone systems",
  "services.s2.f6": "Acoustic analysis and optimization",
  "services.s3.title": "Low-Current Systems",
  "services.s3.description":
    "With our lighting systems we transform spaces and add visual depth to your events. We offer design and implementation services across a wide range — from architectural projects to stage performances.",
  "services.s3.f1": "Architectural façade lighting",
  "services.s3.f2": "Stage and event lighting",
  "services.s3.f3": "LED and moving-head systems",
  "services.s3.f4": "DMX control and programming",
  "services.s3.f5": "Decorative and ambient lighting",
  "services.s3.f6": "Energy-efficient lighting solutions",

  // About (Hakkimizda)
  "about.hero.kicker": "Who We Are",
  "about.hero.title": "About Us",
  "about.hero.subtitle": "A pioneer of technology and innovation, your trusted solution partner",
  "about.kicker": "Corporate",
  "about.companyTitle": "DPI TEKNOLOJİ",
  "about.p1":
    "DPI Teknoloji is a technology firm that stands out in professional LED displays, sound-light-image systems and low-current solutions thanks to its engineering discipline and innovative approach.",
  "about.p2":
    "We approach every project as a strategic process that creates brand reputation and long-term investment value beyond a mere technical implementation. We provide end-to-end professional service across needs analysis, system design, implementation and after-sales support.",
  "about.p3":
    "With our experience across diverse sectors, strong technical infrastructure and forward-looking vision, we continue producing innovative and sustainable solutions that adapt to future expectations.",
  "about.fields.title": "Our Fields of Activity",
  "about.fields.i1": "Professional LED Display Systems",
  "about.fields.i2": "Sound, Light and Image Solutions",
  "about.fields.i3": "Low-Current Systems",
  "about.mission.title": "Our Mission",
  "about.mission.text":
    "To carefully analyze our customers' needs and provide high-quality, reliable and sustainable solutions in LED displays, sound-light-image and low-current systems. To deliver lasting satisfaction in every project by uniting technology with functionality, aesthetics and performance.",
  "about.vision.title": "Our Vision",
  "about.vision.text":
    "To be one of the leading brands in professional technology systems, recognized at national and international scale. To build a strong brand identity that adapts quickly to changing needs and sets the direction of the industry with high quality standards.",
  "about.values.kicker": "Our Principles",
  "about.values.title": "Our Values",
  "about.values.v1.title": "Quality",
  "about.values.v1.desc": "High-standard materials and workmanship in every project",
  "about.values.v2.title": "Reliability",
  "about.values.v2.desc": "Proven references in public and corporate projects",
  "about.values.v3.title": "Innovation",
  "about.values.v3.desc": "Integrating the latest industry technologies into projects",
  "about.values.v4.title": "Customer Focus",
  "about.values.v4.desc": "Custom needs analysis and technical consultancy for each project",

  // References (Referanslar)
  "refs.hero.kicker": "Our Projects",
  "refs.hero.title": "Our References",
  "refs.hero.subtitle":
    "Corporate solutions we deliver to public institutions and large-scale organizations",
  "refs.section.kicker": "Trusted Partnerships",
  "refs.section.title": "Institutions We Work With",
  "refs.section.subtitle":
    "We produce solutions that are referenced in public and corporate projects.",
  "refs.project.default": "Corporate technology solutions",
  "refs.why.kicker": "Why DPI Teknoloji",
  "refs.why.title": "What Sets Us Apart",
  "refs.why.c1.title": "End-to-End Service",
  "refs.why.c1.desc":
    "Needs analysis, design, installation and after-sales support — all under one roof.",
  "refs.why.c2.title": "Public Sector Experience",
  "refs.why.c2.desc":
    "Proven track record with municipalities, public institutions and large organizations.",
  "refs.why.c3.title": "24/7 Technical Support",
  "refs.why.c3.desc":
    "Uninterrupted technical support and maintenance after project delivery.",
  "refs.client.konya": "Konya Municipality",
  "refs.client.dsi": "State Hydraulic Works Foundation",
  "refs.client.esenyurt": "Istanbul Esenyurt Municipality",
  "refs.client.tcdd": "TCDD (Turkish State Railways)",

  // Contact (Iletisim)
  "contact.hero.kicker": "Get in Touch",
  "contact.hero.title": "Contact",
  "contact.hero.subtitle": "Reach out to us for your projects",
  "contact.form.title": "Get in Touch",
  "contact.form.name": "Full Name",
  "contact.form.email": "Email",
  "contact.form.phone": "Phone",
  "contact.form.subject": "Subject",
  "contact.form.subject.placeholder": "Please choose a subject",
  "contact.form.message": "Your Message",
  "contact.form.submit": "Send",
  "contact.form.success": "Your message has been received! We will get back to you shortly.",
  "contact.info.title": "Contact Information",
  "contact.info.address.label": "Address",
  "contact.info.address.value":
    "Atatürk Neighborhood, Teknoloji Avenue\nNo: 123, Floor: 4\nÇankaya / ANKARA",
  "contact.info.phone.label": "Phone",
  "contact.info.email.label": "Email",
  "contact.info.hours.label": "Working Hours",
  "contact.info.hours.v1": "Monday - Friday: 09:00 - 18:00",
  "contact.info.hours.v2": "Saturday: 10:00 - 15:00",
  "contact.map.view": "View Our Location",
  "contact.map.address": "Atatürk Nbrh., Teknoloji Ave. No: 123, Fl: 4, Çankaya / ANKARA",
  "contact.subject.led": "Professional LED Display Systems",
  "contact.subject.sound": "Professional Sound, Light and Image Systems",
  "contact.subject.lowcurrent": "Low-Current Systems",
  "contact.subject.consulting": "Technical Consultancy",
  "contact.subject.quote": "Quote / Pricing",
  "contact.subject.other": "Other",
};

const tr: Dict = {
  // Navbar
  "nav.home": "ANASAYFA",
  "nav.about": "HAKKIMIZDA",
  "nav.services": "HİZMETLER",
  "nav.references": "REFERANSLAR",
  "nav.contact": "İLETİŞİM",

  // TopBar
  "top.address": "Atatürk Mah. Teknoloji Cad. No:123, Çankaya / ANKARA",

  // Sticky
  "sticky.getQuote": "Teklif Al",

  // Footer
  "footer.intro":
    "Büyük ölçekli LED ekran, profesyonel ses, ışık ve zayıf akım sistemleri alanında kurumsal çözümler sunan güvenilir teknoloji şirketiniz.",
  "footer.quickLinks": "HIZLI LİNKLER",
  "footer.services": "HİZMETLER",
  "footer.contact": "İLETİŞİM",
  "footer.address": "Atatürk Mah. Teknoloji Cad.\nNo:123, Çankaya / ANKARA",
  "footer.copyright": "Tüm hakları saklıdır.",
  "footer.kvkk": "KVKK Aydınlatma Metni",
  "footer.privacy": "Gizlilik Politikası",
  "footer.cookies": "Çerez Politikası",
  "footer.service1": "Profesyonel LED Ekran Sistemleri",
  "footer.service2": "Ses, Işık ve Görüntü Sistemleri",
  "footer.service3": "Zayıf Akım Sistemleri",

  // Home (Anasayfa)
  "home.hero.titleBefore": "Teknoloji ve ",
  "home.hero.titleAccent": "Güvenilirlik",
  "home.hero.titleAfter": "",
  "home.hero.description":
    "DPI TEKNOLOJİ, büyük ölçekli LED ekran, profesyonel ses ve ışıklandırma sistemleri konusunda kurumsal çözümler sunan lider teknoloji şirketidir.",
  "home.services.kicker": "Neler Yapıyoruz",
  "home.services.title": "Hizmetlerimiz",
  "home.services.subtitle": "Kartlara tıklayarak detaylı bilgi alabilirsiniz",
  "home.service1.title": "PROFESYONEL LED EKRAN SİSTEMLERİ",
  "home.service1.description":
    "DPI TEKNOLOJİ olarak, stadyumlardan açık hava etkinliklerine, ticari mekânlardan konser alanlarına kadar her ölçekte LED ekran kurulumu gerçekleştiriyoruz. Yüksek çözünürlük, dayanıklılık ve etkileyici görüntü kalitesi ile projelerinize değer katıyoruz.",
  "home.service2.title": "PROFESYONEL SES, IŞIK VE GÖRÜNTÜ SİSTEMİ",
  "home.service2.description":
    "Konserler, konferanslar, toplantılar ve etkinlikler için profesyonel düzeyde ses sistemleri kuruyoruz. Akustik analiz, ses tasarımı ve teknik destek ile mükemmel ses deneyimi sunuyoruz. Her mekan için özel çözümler üretiyoruz.",
  "home.service3.title": "ZAYIF AKIM SİSTEMLERİ",
  "home.service3.description":
    "Mimari aydınlatma, sahne ışıklandırması ve etkinlik ışık sistemleri konusunda uzman ekibimizle hizmet veriyoruz. Estetik ve fonksiyonel ışık tasarımları ile mekanlarınızı dönüştürüyor, etkinliklerinize görsel zenginlik katıyoruz.",
  "home.cta.titleBefore": "Projeniz için ",
  "home.cta.titleAccent": "Teknik Danışmanlık",
  "home.cta.titleAfter": "",
  "home.cta.description":
    "Deneyimli ekibimiz, projenizin ihtiyaçlarını analiz ederek size özel çözümler sunar",
  "home.cta.button": "İletişime Geçin",

  // Services (Hizmetler)
  "services.hero.kicker": "Uzmanlık Alanlarımız",
  "services.hero.title": "Hizmetlerimiz",
  "services.hero.subtitle": "Büyük ölçekli projeler için profesyonel teknoloji çözümleri",
  "services.cta.getQuote": "Teklif Al",
  "services.s1.title": "Profesyonel Led Ekran Sistemleri",
  "services.s1.description":
    "En son teknoloji LED ekran sistemleri ile etkinliklerinize, mekanlarınıza ve projelerinize görsel mükemmellik katıyoruz. Yüksek parlaklık değerleri, geniş görüş açıları ve uzun ömürlü yapısıyla profesyonel LED çözümlerimiz, her türlü ihtiyaca cevap verir.",
  "services.s1.f1": "İç ve dış mekan LED ekran kurulumu",
  "services.s1.f2": "Stadyum ve arena LED sistemleri",
  "services.s1.f3": "Reklam ve bilgilendirme ekranları",
  "services.s1.f4": "Yüksek çözünürlüklü video wall sistemleri",
  "services.s1.f5": "Mobil LED ekran çözümleri",
  "services.s1.f6": "7/24 teknik destek ve bakım hizmeti",
  "services.s2.title": "Profesyonel Ses, Işık ve Görüntü Sistemi",
  "services.s2.description":
    "Konserlerden konferanslara, tiyatro sahnesinden açık hava etkinliklerine kadar her ortam için özel tasarlanmış profesyonel ses çözümleri sunuyoruz. Kristal netliğinde ses kalitesi ve mükemmel akustik performans için son teknoloji ekipmanlar kullanıyoruz.",
  "services.s2.f1": "Konser ve etkinlik ses sistemleri",
  "services.s2.f2": "Konferans salonu akustiği",
  "services.s2.f3": "Line array ve point source hoparlör sistemleri",
  "services.s2.f4": "Dijital mikser ve ses işleme teknolojileri",
  "services.s2.f5": "Kablosuz mikrofon sistemleri",
  "services.s2.f6": "Akustik analiz ve optimizasyon",
  "services.s3.title": "Zayıf Akım Sistemleri",
  "services.s3.description":
    "Işıklandırma sistemlerimiz ile mekanlarınızı dönüştürüyor, etkinliklerinize görsel derinlik katıyoruz. Mimari projelerden sahne performanslarına kadar geniş yelpazede ışık tasarımı ve uygulama hizmeti veriyoruz.",
  "services.s3.f1": "Mimari cephe aydınlatması",
  "services.s3.f2": "Sahne ve etkinlik ışıklandırması",
  "services.s3.f3": "LED ve moving head sistemleri",
  "services.s3.f4": "DMX kontrol ve programlama",
  "services.s3.f5": "Dekoratif ve ambient aydınlatma",
  "services.s3.f6": "Enerji verimli ışık çözümleri",

  // About (Hakkimizda)
  "about.hero.kicker": "Biz Kimiz",
  "about.hero.title": "Hakkımızda",
  "about.hero.subtitle": "Teknoloji ve inovasyonun öncüsü, güvenilir çözüm ortağınız",
  "about.kicker": "Kurumsal",
  "about.companyTitle": "DPI TEKNOLOJİ",
  "about.p1":
    "DPI Teknoloji, profesyonel LED ekranlar, ses-ışık-görüntü sistemleri ve zayıf akım çözümleri alanında faaliyet gösteren, mühendislik disiplini ve yenilikçi yaklaşımıyla öne çıkan bir teknoloji firmasıdır.",
  "about.p2":
    "Her projeyi teknik bir uygulama olmanın ötesinde, marka itibarı ve uzun vadeli yatırım değeri üreten stratejik bir süreç olarak ele alıyoruz. İhtiyaç analizi, sistem tasarımı, uygulama ve satış sonrası destek süreçlerinin tamamında uçtan uca profesyonel hizmet sunuyoruz.",
  "about.p3":
    "Farklı sektörlerdeki deneyimimiz, güçlü teknik altyapımız ve gelişime açık vizyonumuzla, geleceğin beklentilerine uyum sağlayan yenilikçi ve sürdürülebilir çözümler üretmeye devam ediyoruz.",
  "about.fields.title": "Faaliyet Alanlarımız",
  "about.fields.i1": "Profesyonel LED Ekran Sistemleri",
  "about.fields.i2": "Ses, Işık ve Görüntü Çözümleri",
  "about.fields.i3": "Zayıf Akım Sistemleri",
  "about.mission.title": "Misyonumuz",
  "about.mission.text":
    "Müşterilerimizin ihtiyaçlarını titizlikle analiz ederek, LED ekran, ses-ışık-görüntü ve zayıf akım sistemlerinde yüksek kaliteli, güvenilir ve sürdürülebilir çözümler sunmak. Teknolojiyi işlevsellik, estetik ve performans ile buluşturarak her projede kalıcı memnuniyet sağlamak.",
  "about.vision.title": "Vizyonumuz",
  "about.vision.text":
    "Profesyonel teknoloji sistemleri alanında ulusal ve uluslararası ölçekte referans gösterilen öncü markalardan biri olmak. Değişen ihtiyaçlara hızlı uyum sağlayan, yüksek kalite standartlarıyla sektörün gelişimine yön veren güçlü bir marka kimliği inşa etmek.",
  "about.values.kicker": "İlkelerimiz",
  "about.values.title": "Değerlerimiz",
  "about.values.v1.title": "Kalite",
  "about.values.v1.desc": "Her projede yüksek standartlarda malzeme ve işçilik",
  "about.values.v2.title": "Güvenilirlik",
  "about.values.v2.desc": "Kamu ve kurumsal projelerde kanıtlanmış referanslar",
  "about.values.v3.title": "İnovasyon",
  "about.values.v3.desc": "Sektördeki en güncel teknolojileri projelere entegre etme",
  "about.values.v4.title": "Müşteri Odaklılık",
  "about.values.v4.desc": "Her projeye özel ihtiyaç analizi ve teknik danışmanlık",

  // References (Referanslar)
  "refs.hero.kicker": "Projelerimiz",
  "refs.hero.title": "Referanslarımız",
  "refs.hero.subtitle":
    "Kamu kurumları ve büyük ölçekli kuruluşlar için sunduğumuz kurumsal çözümler",
  "refs.section.kicker": "Güvenilir İş Birlikleri",
  "refs.section.title": "Çözüm Ortağı Olduğumuz Kurumlar",
  "refs.section.subtitle": "Kamu ve kurumsal projelerde referans gösterilen çözümler üretiyoruz.",
  "refs.project.default": "Kurumsal teknoloji çözümleri",
  "refs.why.kicker": "Neden DPI Teknoloji",
  "refs.why.title": "Farkımız",
  "refs.why.c1.title": "Uçtan Uca Hizmet",
  "refs.why.c1.desc":
    "İhtiyaç analizi, tasarım, kurulum ve satış sonrası destek — tüm süreçler tek çatı altında.",
  "refs.why.c2.title": "Kamu Deneyimi",
  "refs.why.c2.desc":
    "Belediyeler, kamu kurumları ve büyük ölçekli kuruluşlarla kanıtlanmış proje tecrübesi.",
  "refs.why.c3.title": "7/24 Teknik Destek",
  "refs.why.c3.desc": "Proje teslimi sonrasında da kesintisiz teknik destek ve bakım hizmeti.",
  "refs.client.konya": "Konya Belediyesi",
  "refs.client.dsi": "Devlet Su İşleri Vakfı",
  "refs.client.esenyurt": "İstanbul Esenyurt Belediyesi",
  "refs.client.tcdd": "TCDD",

  // Contact (Iletisim)
  "contact.hero.kicker": "Bize Ulaşın",
  "contact.hero.title": "İletişim",
  "contact.hero.subtitle": "Projeleriniz için bizimle iletişime geçin",
  "contact.form.title": "Bize Ulaşın",
  "contact.form.name": "Ad Soyad",
  "contact.form.email": "E-posta",
  "contact.form.phone": "Telefon",
  "contact.form.subject": "Konu",
  "contact.form.subject.placeholder": "Lütfen bir konu seçin",
  "contact.form.message": "Mesajınız",
  "contact.form.submit": "Gönder",
  "contact.form.success": "Mesajınız alındı! En kısa sürede sizinle iletişime geçeceğiz.",
  "contact.info.title": "İletişim Bilgileri",
  "contact.info.address.label": "Adres",
  "contact.info.address.value":
    "Atatürk Mahallesi, Teknoloji Caddesi\nNo: 123, Kat: 4\nÇankaya / ANKARA",
  "contact.info.phone.label": "Telefon",
  "contact.info.email.label": "E-posta",
  "contact.info.hours.label": "Çalışma Saatleri",
  "contact.info.hours.v1": "Pazartesi - Cuma: 09:00 - 18:00",
  "contact.info.hours.v2": "Cumartesi: 10:00 - 15:00",
  "contact.map.view": "Konumumuzu Görüntüle",
  "contact.map.address": "Atatürk Mah., Teknoloji Cad. No: 123, Kat: 4, Çankaya/ANKARA",
  "contact.subject.led": "Profesyonel Led Ekran Sistemleri",
  "contact.subject.sound": "Profesyonel Ses, Işık ve Görüntü Sistemi",
  "contact.subject.lowcurrent": "Zayıf Akım Sistemleri",
  "contact.subject.consulting": "Teknik Danışmanlık",
  "contact.subject.quote": "Teklif / Fiyat Bilgisi",
  "contact.subject.other": "Diğer",
};

const dictionaries: Record<Lang, Dict> = { en, tr };

/* ─── Context ─── */
interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "dpi_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "tr") return stored;
    } catch {
      /* ignore */
    }
    return "en"; // Varsayılan: İngilizce
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    // <html lang="..."> attribute'unu da güncelle (SEO / erişilebilirlik)
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  const t = (key: string): string => {
    const d = dictionaries[lang];
    return d[key] ?? dictionaries.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
