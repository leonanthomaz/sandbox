// src/utils/access.ts
export const STORAGE_KEY = 'lt_access_token';

export type AccessToken = {
  token: string;
  exp: number; // epoch ms
  sig: string; // cópia do VITE_ACCESS_PROJECT_HASH vigente
};

function getEnvHash(): string {
  return (import.meta.env.VITE_ACCESS_PROJECT_HASH ?? '') as string;
}

function getTTLMinutes(): number {
  const raw = import.meta.env.VITE_ACCESS_TTL_MINUTES as string | undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 1440;
}

export function generateToken(): AccessToken {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  const token = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const exp = Date.now() + getTTLMinutes() * 60 * 1000;
  const sig = getEnvHash();
  const obj: AccessToken = { token, exp, sig };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  return obj;
}

export function getToken(): AccessToken | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as AccessToken; } catch { return null; }
}

export function clearToken(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isTokenValid(): boolean {
  const t = getToken();
  if (!t) return false;
  if (Date.now() >= t.exp) return false;
  if (t.sig !== getEnvHash()) return false; // invalida quando trocar hash no env
  return true;
}

/**
 * Valida se o segmento de path recebido corresponde ao hash do .env
 * Ex: /S3nh4Top => accessParam === 'S3nh4Top'
 */
export function validateEntryPath(accessParam?: string): boolean {
  const envHash = getEnvHash();
  if (!envHash) return false;
  if (!accessParam) return false;
  return accessParam === envHash;
}

export function acceptEntry(): void {
  generateToken();
}
