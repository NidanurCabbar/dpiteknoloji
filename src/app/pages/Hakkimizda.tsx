import bgImage from "figma:asset/0375b7736794914741acd8ea38b508a023ca321b.png";

export function Hakkimizda() {
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
            Hakkımızda
          </h1>
          <p className="text-gray-600 text-[18px] max-w-[700px] mx-auto">
            Teknoloji ve inovasyonun öncüsü, güvenilir çözüm ortağınız
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="flex flex-col">
            <div className="mb-12">
            </div>
            <div>
              <h2 className="text-[36px] mb-6" style={{ color: "#12487c" }}>
                DPI TEKNOLOJİ
              </h2>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                DPI Teknoloji, ileri teknoloji sistemleri alanında faaliyet gösteren, mühendislik disiplini, yenilikçi bakış açısı ve yüksek hizmet standartlarıyla öne çıkan kurumsal bir teknoloji firmasıdır. Profesyonel LED ekranlar, profesyonel ses, ışık ve görüntü sistemleri ile zayıf akım sistemleri alanlarında sunduğumuz kapsamlı çözümlerle, farklı sektörlerin ihtiyaçlarına değer odaklı ve sürdürülebilir hizmetler sunmaktayız.
              </p>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                Kurumsal yaklaşımımızın temelinde, her projeyi yalnızca teknik bir uygulama olarak değil, aynı zamanda marka itibarı, operasyonel verimlilik ve uzun vadeli yatırım değeri üreten stratejik bir süreç olarak değerlendirmek yer almaktadır. Bu anlayış doğrultusunda, müşterilerimizin ihtiyaçlarını titizlikle analiz ediyor; her projeye özel teknik gereksinimleri, kullanım senaryolarını ve beklentileri dikkate alarak en doğru çözümleri geliştiriyoruz.
              </p>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                DPI Teknoloji olarak, teknolojiyi sadece takip eden değil; onu doğru yorumlayan, projeye özel şekilde uyarlayan ve yüksek performanslı sistemlere dönüştüren bir anlayışla hareket ediyoruz. Gelişen sektör dinamiklerini yakından izleyerek, çağdaş ihtiyaçlara cevap veren, güvenilir, estetik ve verimli çözümler üretmeyi ilke ediniyoruz. Her çalışmamızda kalite, işlevsellik ve sürdürülebilirliği bir araya getirerek müşterilerimize uzun ömürlü ve yüksek katma değerli sistemler sunuyoruz.
              </p>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                Faaliyet gösterdiğimiz profesyonel LED ekran sistemleri, ses, ışık ve görüntü çözümleri ile zayıf akım sistemleri; ileri düzey teknik bilgi, doğru planlama ve güçlü uygulama tecrübesi gerektiren uzmanlık alanlarıdır. DPI Teknoloji, sahip olduğu bilgi birikimi, proje yönetim kabiliyeti ve saha deneyimi ile bu alanların her birinde uçtan uca profesyonel hizmet sunmaktadır. İhtiyaç analizi, sistem tasarımı, ürün seçimi, uygulama, devreye alma ve satış sonrası destek süreçlerinin tamamı, kurumsal hizmet anlayışımızın ayrılmaz bir bütününü oluşturmaktadır.
              </p>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                Şirketimizin önceliği, yalnızca beklentileri karşılayan değil; güven veren, kalıcılık sağlayan ve uzun vadeli memnuniyet oluşturan çözümler geliştirmektir. Bu nedenle her projede teknik doğruluğu, hizmet kalitesini ve müşteri memnuniyetini en üst seviyede tutmayı esas alıyoruz. Şeffaf iletişim anlayışımız, disiplinli çalışma prensibimiz ve çözüm odaklı yaklaşımımız sayesinde müşterilerimiz için güvenilir bir iş ortağı olmayı hedefliyoruz.
              </p>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                DPI Teknoloji, farklı sektörlerde kazandığı deneyim, güçlü teknik altyapısı ve gelişime açık kurumsal vizyonu ile faaliyet gösterdiği alanlarda saygın, güvenilir ve referans gösterilen bir marka olma yolunda kararlılıkla ilerlemektedir. Amacımız, yalnızca bugünün ihtiyaçlarına cevap veren sistemler sunmak değil, aynı zamanda geleceğin beklentilerine uyum sağlayan yenilikçi ve sürdürülebilir çözümler geliştirmektir.
              </p>
              <p className="text-gray-700 text-[16px] leading-relaxed mb-6">
                Kaliteyi standart, güveni temel değer ve müşteri memnuniyetini kurumsal sorumluluğun ayrılmaz bir parçası olarak gören DPI Teknoloji, profesyonel yaklaşımıyla teknoloji yatırımlarını verimli, estetik ve yüksek performanslı sistemlere dönüştürmeye devam etmektedir. Sahip olduğumuz mühendislik anlayışı ve çözüm üretme kabiliyetiyle, müşterilerimize yalnızca ürün ve hizmet değil, aynı zamanda güven, süreklilik ve değer sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-lg shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "#12487c" }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-[28px] mb-4" style={{ color: "#12487c" }}>
                Misyonumuz
              </h3>
              <p className="text-gray-700 text-[16px] leading-relaxed">
                Misyonumuz, müşterilerimizin ihtiyaç ve beklentilerini en doğru şekilde analiz ederek; profesyonel LED ekranlar, profesyonel ses, ışık ve görüntü sistemleri ile zayıf akım sistemleri alanlarında yüksek kaliteli, güvenilir, verimli ve sürdürülebilir çözümler sunmaktır. Her projeyi titizlikle ele alarak ihtiyaç analizi, sistem tasarımı, ürün seçimi, uygulama, devreye alma ve satış sonrası destek süreçlerinin tamamında profesyonel hizmet anlayışıyla hareket ediyoruz. Teknik bilgi birikimimizi, saha tecrübemizi ve çözüm odaklı yaklaşımımızı bir araya getirerek, müşterilerimize yalnızca ürün ve hizmet değil, uzun vadeli değer ve güven sunmayı temel ilke olarak benimsiyoruz. DPI Teknoloji olarak misyonumuz, teknolojiyi işlevsellik, estetik ve performans ile buluşturarak her projede yüksek memnuniyet sağlayan kalıcı çözümler üretmektir.
              </p>
            </div>

            <div className="bg-white p-12 rounded-lg shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "#12487c" }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-[28px] mb-4" style={{ color: "#12487c" }}>
                Vizyonumuz
              </h3>
              <p className="text-gray-700 text-[16px] leading-relaxed">
                DPI Teknoloji olarak vizyonumuz, profesyonel teknoloji sistemleri alanında yenilikçi, güvenilir ve sürdürülebilir çözümler sunan, ulusal ve uluslararası ölçekte referans gösterilen öncü markalardan biri olmaktır. Faaliyet gösterdiğimiz profesyonel LED ekranlar, ses, ışık ve görüntü sistemleri ile zayıf akım sistemleri alanlarında; teknolojiyi doğru yorumlayan, değişen ihtiyaçlara hızlı uyum sağlayan ve yüksek kalite standartlarını esas alan yaklaşımımızla sektörün gelişimine yön veren bir yapı oluşturmayı hedefliyoruz. Müşterilerimiz, iş ortaklarımız ve paydaşlarımız için güven, kalite ve profesyonelliği temsil eden güçlü bir marka kimliği inşa ederek, geleceğin teknolojilerini bugünün projelerine değer katan çözümlere dönüştürmeyi amaçlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-12">
          <h2 className="text-[36px] text-center mb-16" style={{ color: "#12487c" }}>
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              { title: "Kalite", icon: "✓" },
              { title: "Güvenilirlik", icon: "✓" },
              { title: "İnovasyon", icon: "✓" },
              { title: "Müşteri Odaklılık", icon: "✓" },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#12487c" }}>
                  <span className="text-white text-[32px]">{value.icon}</span>
                </div>
                <h4 className="text-[18px] text-gray-800">{value.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
