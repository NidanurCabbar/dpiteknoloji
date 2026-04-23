/**
 * İletişim formu mesajını e-posta olarak gönderir.
 *
 * Web3Forms (ücretsiz, 250 mesaj/ay) üzerinden info@dpiteknoloji.com.tr'ye
 * e-posta atar. Access key almak için:
 *   https://web3forms.com/ → e-posta gir → anında key gelir
 *
 * Key'i VITE_WEB3FORMS_KEY env değişkenine koyun (.env veya Vercel proje
 * ayarları). Key tanımsızsa fonksiyon sessizce false döner ve mesaj yine
 * admin panel inbox'ına düşer.
 */
export interface ContactEmailPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<boolean> {
  const accessKey = (import.meta as any).env?.VITE_WEB3FORMS_KEY as
    | string
    | undefined;

  if (!accessKey) {
    console.warn(
      "VITE_WEB3FORMS_KEY tanımlı değil — e-posta gönderimi atlandı (mesaj sadece admin panelinde saklanacak)."
    );
    return false;
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        // Hedef adres (Web3Forms dashboard'unda da ayarlanabilir)
        to: "info@dpiteknoloji.com.tr",
        from_name: "DPI Teknoloji Web Formu",
        subject: `[Web Formu] ${payload.subject || "Yeni mesaj"} — ${payload.name}`,
        // Mesaj içeriği
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        _subject: payload.subject,
        message: payload.message,
        // Otomasyon engelleri
        botcheck: "",
      }),
    });
    const json = await res.json().catch(() => ({}));
    return Boolean(res.ok && json?.success);
  } catch (err) {
    console.error("Web3Forms gönderim hatası:", err);
    return false;
  }
}
