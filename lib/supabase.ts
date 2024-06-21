import "react-native-url-polyfill/auto";
import { createClient, type SupportedStorage } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv";

class MMKVStorage implements SupportedStorage {
  storage: MMKV;

  constructor() {
    this.storage = new MMKV({ id: "supabase.storage" });
  }

  getItem(key: string) {
    const item = this.storage.getString(key);
    return item === undefined ? null : item;
  }

  setItem(key: string, data: string) {
    this.storage.set(key, data);
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new MMKVStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
