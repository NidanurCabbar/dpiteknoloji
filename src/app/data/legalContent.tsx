/**
 * Hukuki belge içerikleri (TR).
 * Footer'daki KVKK / Gizlilik Politikası / Çerez Politikası
 * popup modallerinde gösterilir.
 *
 * NOT: Belgeler resmi metin olduğu için tek dilde (TR) tutulur.
 */

import { ReactNode } from "react";

export interface LegalDoc {
  key: "kvkk" | "privacy" | "cookies";
  title: string;
  body: ReactNode;
}

export const legalDocs: Record<LegalDoc["key"], LegalDoc> = {
  kvkk: {
    key: "kvkk",
    title: "KVKK Aydınlatma Metni",
    body: (
      <>
        <p className="legal-meta">
          <strong>KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA AYDINLATMA METNİ</strong>
          <br />
          DPI TEKNOLOJİ ELK. ELEK. DAN. MÜH. İTH. VE İHR. TİC. LTD. ŞTİ.
        </p>

        <p>
          Dpi Teknoloji Elk. Elek. Dan. Müh. İth. ve İhr. Tic. Ltd. Şti. (bundan sonra
          "DPI TEKNOLOJİ" veya "Şirket" olarak anılacaktır), 6698 sayılı Kişisel Verilerin
          Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatıyla hareket etmekte olup
          kişisel verilerinizi aşağıda açıklanan amaçlar ve kapsamda işlemektedir.
        </p>

        <h3>1. Veri Sorumlusunun Kimliği</h3>
        <p><strong>Unvan:</strong> Dpi Teknoloji Elk. Elek. Dan. Müh. İth. ve İhr. Tic. Ltd. Şti.</p>
        <p><strong>Adres:</strong> İvedik OSB. 1440 Sokak 1/114 Köşe İvedik İş Merkezi K:16 D:278 Yenimahalle / Ankara</p>
        <p><strong>E-posta:</strong> info@dpiteknoloji.com.tr</p>
        <p><strong>Telefon:</strong> +90 312 514 9796</p>

        <h3>2. İşlenen Kişisel Veriler</h3>
        <p>
          Web sitemiz aracılığıyla iletişim formu kullanılması halinde aşağıdaki kişisel
          verileriniz işlenebilmektedir:
        </p>
        <ul>
          <li>Ad ve soyad</li>
          <li>E-posta adresi</li>
          <li>Telefon numarası</li>
          <li>Mesaj içeriği (talep, soru veya yorumlarınız)</li>
          <li>IP adresi ve çerez verileri (teknik veriler)</li>
        </ul>

        <h3>3. Kişisel Verilerin İşlenme Amaçları</h3>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul>
          <li>Tarafınızca iletilen talep, soru ve başvuruların yanıtlanması</li>
          <li>Hizmet tekliflerinin hazırlanması ve sunulması</li>
          <li>İş ilişkilerinin kurulması ve yürütülmesi</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Web sitesinin güvenliği ve işlevselliğinin sağlanması</li>
        </ul>

        <h3>4. Kişisel Verilerin İşlenme Hukuki Dayanağı</h3>
        <p>
          Kişisel verileriniz KVKK'nın 5. maddesi kapsamında aşağıdaki hukuki dayanaklar
          çerçevesinde işlenmektedir:
        </p>
        <ul>
          <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</li>
          <li>Şirketimizin hukuki yükümlülüklerini yerine getirmesi</li>
          <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaatlerimizin korunması</li>
          <li>Açık rızanızın bulunması (yalnızca açık rıza gerektiren işlemler için)</li>
        </ul>

        <h3>5. Kişisel Verilerin Aktarılması</h3>
        <p>
          Kişisel verileriniz; yasal zorunluluklar dışında üçüncü taraflara, yurt içi veya
          yurt dışındaki kuruluşlara aktarılmamaktadır. Yasal yükümlülük kapsamında yalnızca
          yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.
        </p>

        <h3>6. Kişisel Verilerin Saklanma Süresi</h3>
        <p>
          Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta
          öngörülen saklama sürelerine uygun olarak muhafaza edilmekte; bu sürelerin sona
          ermesinin ardından silinmekte, yok edilmekte veya anonim hale getirilmektedir.
        </p>

        <h3>7. İlgili Kişinin Hakları</h3>
        <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
          <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
          <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
          <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
          <li>İşlenen veriler aleyhine münhasıran otomatik sistemler aracılığıyla aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
        </ul>

        <h3>8. Başvuru Yöntemi</h3>
        <p>
          Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici belgelerle
          birlikte aşağıdaki kanallar aracılığıyla başvuruda bulunabilirsiniz:
        </p>
        <ul>
          <li>
            <strong>Yazılı başvuru:</strong> İvedik OSB. 1440 Sokak 1/114 Köşe İvedik İş Merkezi
            K:16 D:278 Yenimahalle / Ankara
          </li>
          <li><strong>E-posta:</strong> info@dpiteknoloji.com.tr</li>
        </ul>
        <p>
          Başvurularınız, KVKK'nın 13. maddesi uyarınca en geç otuz (30) gün içinde
          sonuçlandırılacaktır.
        </p>

        <p className="legal-footer">Son güncelleme: 2025 &nbsp;|&nbsp; DPI TEKNOLOJİ</p>
      </>
    ),
  },

  privacy: {
    key: "privacy",
    title: "Gizlilik Politikası",
    body: (
      <>
        <p className="legal-meta">
          <strong>GİZLİLİK POLİTİKASI</strong>
          <br />
          DPI TEKNOLOJİ ELK. ELEK. DAN. MÜH. İTH. VE İHR. TİC. LTD. ŞTİ.
        </p>

        <p>
          Bu Gizlilik Politikası, Dpi Teknoloji Elk. Elek. Dan. Müh. İth. ve İhr. Tic. Ltd. Şti.
          ("DPI TEKNOLOJİ") tarafından işletilen web sitesini ziyaret etmeniz ve/veya iletişim
          formunu kullanmanız sırasında kişisel verilerinizin nasıl toplandığını, kullanıldığını
          ve korunduğunu açıklamaktadır.
        </p>

        <p>
          Web sitemizi kullanarak bu politikada belirtilen uygulamaları kabul etmiş sayılırsınız.
          Politikamızı kabul etmiyorsanız lütfen sitemizi kullanmaktan kaçınınız.
        </p>

        <h3>1. Toplanan Bilgiler</h3>
        <p>Web sitemiz aracılığıyla yalnızca siz bize ilettiğinizde aşağıdaki bilgiler toplanmaktadır:</p>
        <ul>
          <li><strong>İletişim formu verileri:</strong> Ad-soyad, e-posta adresi, telefon numarası ve mesaj içeriği</li>
          <li><strong>Teknik veriler:</strong> IP adresi, tarayıcı türü, ziyaret edilen sayfalar, ziyaret süresi ve çerez verileri</li>
        </ul>
        <p>Sitemiz, ödeme bilgileri veya özel nitelikli kişisel veri toplamaz.</p>

        <h3>2. Bilgilerin Kullanım Amacı</h3>
        <p>Toplanan bilgiler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
        <ul>
          <li>İletişim taleplerinizi yanıtlamak ve teklife dönüştürmek</li>
          <li>Hizmetlerimizi sunmak ve geliştirmek</li>
          <li>Web sitesinin güvenliğini ve performansını sağlamak</li>
          <li>Yasal yükümlülükleri yerine getirmek</li>
        </ul>

        <h3>3. Bilgilerin Paylaşımı</h3>
        <p>DPI TEKNOLOJİ, kişisel verilerinizi;</p>
        <ul>
          <li>Açık rızanız olmaksızın ticari amaçla üçüncü taraflara satmaz veya kiralamaz,</li>
          <li>Yalnızca yasal zorunluluk durumunda yetkili kamu kurum ve kuruluşlarıyla paylaşır,</li>
          <li>Hizmet alınan iş ortaklarıyla yalnızca hizmet kapsamında ve gizlilik sözleşmesi çerçevesinde paylaşabilir.</li>
        </ul>

        <h3>4. Veri Güvenliği</h3>
        <p>
          Kişisel verilerinizin güvenliğini sağlamak amacıyla endüstri standardı teknik ve idari
          güvenlik önlemleri uygulanmaktadır. Ancak internet ortamında hiçbir veri iletiminin
          veya depolama yönteminin yüzde yüz güvenli olmadığını belirtmek isteriz.
        </p>

        <h3>5. Saklama Süresi</h3>
        <p>
          Kişisel verileriniz, işlenme amacının ortadan kalkması ve yasal saklama sürelerinin sona
          ermesinin ardından güvenli bir şekilde silinmekte veya anonim hale getirilmektedir.
        </p>

        <h3>6. Üçüncü Taraf Bağlantılar</h3>
        <p>
          Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik
          uygulamalarından DPI TEKNOLOJİ sorumlu tutulamaz. Söz konusu siteleri ziyaret etmeden
          önce ilgili gizlilik politikalarını incelemenizi tavsiye ederiz.
        </p>

        <h3>7. Çocukların Gizliliği</h3>
        <p>
          Web sitemiz 18 yaşın altındaki bireylere yönelik değildir. Reşit olmayan bireylerden
          bilerek kişisel veri toplanmamaktadır. Bu nitelikte bir verinin sistemimize ulaştığını
          fark etmeniz durumunda lütfen bizimle iletişime geçiniz.
        </p>

        <h3>8. Politika Değişiklikleri</h3>
        <p>
          DPI TEKNOLOJİ, bu Gizlilik Politikası'nı herhangi bir zamanda güncelleme hakkını saklı
          tutar. Değişiklikler web sitemizde yayımlandığı tarihten itibaren yürürlüğe girer.
          Politikayı düzenli olarak incelemenizi öneririz.
        </p>

        <h3>9. İletişim</h3>
        <p>Gizlilik politikamıza ilişkin sorularınız için aşağıdaki kanallardan bize ulaşabilirsiniz:</p>
        <p><strong>Adres:</strong> İvedik OSB. 1440 Sokak 1/114 Köşe İvedik İş Merkezi K:16 D:278 Yenimahalle / Ankara</p>
        <p><strong>E-posta:</strong> info@dpiteknoloji.com.tr</p>
        <p><strong>Telefon:</strong> +90 312 514 9796</p>

        <p className="legal-footer">Son güncelleme: 2025 &nbsp;|&nbsp; DPI TEKNOLOJİ</p>
      </>
    ),
  },

  cookies: {
    key: "cookies",
    title: "Çerez Politikası",
    body: (
      <>
        <p className="legal-meta">
          <strong>ÇEREZ POLİTİKASI</strong>
          <br />
          DPI TEKNOLOJİ ELK. ELEK. DAN. MÜH. İTH. VE İHR. TİC. LTD. ŞTİ.
        </p>

        <p>
          Bu Çerez Politikası, Dpi Teknoloji Elk. Elek. Dan. Müh. İth. ve İhr. Tic. Ltd. Şti.
          ("DPI TEKNOLOJİ") tarafından işletilen web sitesinde kullanılan çerezleri (cookie),
          bunların nasıl kullanıldığını ve tercihlerinizi nasıl yönetebileceğinizi açıklamaktadır.
        </p>

        <h3>1. Çerez Nedir?</h3>
        <p>
          Çerezler, web sitelerinin cihazınıza yerleştirdiği küçük metin dosyalarıdır. Siteyi
          yeniden ziyaret ettiğinizde bu dosyalar okunarak deneyiminizin daha işlevsel ve
          kişiselleştirilmiş olması sağlanır. Çerezler kimliğinizi doğrudan ifşa etmez; yalnızca
          tarayıcınıza ilişkin teknik bilgileri içerir.
        </p>

        <h3>2. Kullandığımız Çerez Türleri</h3>
        <table>
          <thead>
            <tr>
              <th>Çerez Türü</th>
              <th>Açıklama</th>
              <th>Zorunluluk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Zorunlu Çerezler</strong></td>
              <td>
                Web sitesinin temel işlevlerinin çalışması için gereklidir. Bu çerezler olmadan
                site düzgün çalışamaz. Oturum yönetimi ve güvenlik işlemleri bu kapsamdadır.
              </td>
              <td>Zorunlu</td>
            </tr>
            <tr>
              <td><strong>İşlevsel Çerezler</strong></td>
              <td>
                Dil tercihi, form bilgilerinin hatırlanması gibi kullanım kolaylığı sağlayan
                tercihlerinizi saklar.
              </td>
              <td>İsteğe bağlı</td>
            </tr>
            <tr>
              <td><strong>Analitik Çerezler</strong></td>
              <td>
                Ziyaretçi sayısı, ziyaret edilen sayfalar ve site kullanım istatistikleri gibi
                verileri toplar. Bu veriler siteyi geliştirmek amacıyla anonim olarak kullanılır.
              </td>
              <td>İsteğe bağlı</td>
            </tr>
          </tbody>
        </table>

        <h3>3. Çerezlerin Kullanım Amaçları</h3>
        <ul>
          <li>Web sitesinin güvenli ve sorunsuz çalışmasını sağlamak</li>
          <li>Kullanıcı deneyimini iyileştirmek</li>
          <li>Site trafiğini ve kullanım alışkanlıklarını analiz etmek</li>
          <li>Teknik hataları tespit etmek ve gidermek</li>
        </ul>

        <h3>4. Çerez Tercihlerini Yönetme</h3>
        <p>
          Çerezleri kabul etme veya reddetme konusunda tam kontrole sahipsiniz. Tarayıcınızın
          ayarlar menüsünden çerezleri devre dışı bırakabilir veya silebilirsiniz. Bununla birlikte,
          zorunlu çerezlerin devre dışı bırakılması durumunda web sitesinin bazı işlevleri düzgün
          çalışmayabilir.
        </p>
        <p>Yaygın tarayıcılarda çerez yönetimi için:</p>
        <ul>
          <li><strong>Google Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler ve diğer site verileri</li>
          <li><strong>Mozilla Firefox:</strong> Seçenekler → Gizlilik ve Güvenlik → Çerezler</li>
          <li><strong>Microsoft Edge:</strong> Ayarlar → Gizlilik, arama ve hizmetler → Çerezler</li>
          <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezleri engelle</li>
        </ul>

        <h3>5. Çerezlerin Saklanma Süresi</h3>
        <p>
          Çerezler, türlerine göre farklı sürelerde saklanır. Oturum çerezleri tarayıcı
          kapatıldığında otomatik olarak silinirken; kalıcı çerezler, belirledikleri süre dolana
          kadar veya siz manuel olarak silene kadar cihazınızda saklanır.
        </p>

        <h3>6. Politika Değişiklikleri</h3>
        <p>
          DPI TEKNOLOJİ, bu Çerez Politikası'nı teknolojik gelişmeler veya yasal düzenlemeler
          doğrultusunda güncelleme hakkını saklı tutar. Güncel politikaya her zaman web sitemizden
          ulaşabilirsiniz.
        </p>

        <h3>7. İletişim</h3>
        <p>Çerez politikamıza ilişkin sorularınız için bizimle iletişime geçebilirsiniz:</p>
        <p><strong>Adres:</strong> İvedik OSB. 1440 Sokak 1/114 Köşe İvedik İş Merkezi K:16 D:278 Yenimahalle / Ankara</p>
        <p><strong>E-posta:</strong> info@dpiteknoloji.com.tr</p>
        <p><strong>Telefon:</strong> +90 312 514 9796</p>

        <p className="legal-footer">Son güncelleme: 2025 &nbsp;|&nbsp; DPI TEKNOLOJİ</p>
      </>
    ),
  },
};
