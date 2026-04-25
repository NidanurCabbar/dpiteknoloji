/**
 * Medya yükleme yardımcıları — admin görselleri/logolarını Supabase Storage'a
 * yükler, başarılıysa public URL döner. Supabase devre dışıysa veya yükleme
 * başarısızsa fallback olarak data URL döner (eski davranış korunur).
 */
import { supabase, isSupabaseReady } from "./supabase";

/** Data URL → Blob dönüşümü (canvas.toDataURL çıktısını upload'a çevirmek için). */
function dataUrlToBlob(dataUrl: string): Blob | null {
  const m = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!m) return null;
  const mime = m[1];
  const binary = atob(m[2]);
  const len = binary.length;
  const buf = new Uint8Array(len);
  for (let i = 0; i < len; i++) buf[i] = binary.charCodeAt(i);
  return new Blob([buf], { type: mime });
}

function mimeToExt(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpg";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "bin";
}

/**
 * Data URL'i Supabase Storage'a yükle. Başarılıysa public URL, değilse orijinal
 * data URL'i döner. Böylece UI her koşulda çalışır.
 */
export async function uploadDataUrl(
  dataUrl: string,
  folder: string
): Promise<string> {
  if (!dataUrl || !dataUrl.startsWith("data:")) return dataUrl;
  if (!isSupabaseReady() || !supabase) return dataUrl;

  const blob = dataUrlToBlob(dataUrl);
  if (!blob) return dataUrl;

  const ext = mimeToExt(blob.type);
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, blob, { upsert: false, contentType: blob.type });
  if (error) {
    console.warn("Storage upload hatası, data URL fallback:", error.message);
    return dataUrl;
  }
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data?.publicUrl || dataUrl;
}
