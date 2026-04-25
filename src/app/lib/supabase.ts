/**
 * Supabase client — proje genelinde tek bir instance kullanılır.
 *
 * Env değişkenleri:
 *   VITE_SUPABASE_URL       → https://<project>.supabase.co
 *   VITE_SUPABASE_ANON_KEY  → Public anon key
 *
 * Key/URL tanımsızsa client `null` olur ve katmanlar localStorage fallback'ine düşer.
 * Böylece env henüz Vercel'e eklenmeden build/çalışma kırılmaz.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      })
    : null;

export const isSupabaseReady = (): boolean => supabase !== null;

/** Supabase Storage public URL yardımcısı (null-safe). */
export function storagePublicUrl(bucket: string, path: string): string {
  if (!supabase) return "";
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl ?? "";
}
