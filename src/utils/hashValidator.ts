export function validateHash(): boolean {
  const urlHash = window.location.hash.replace('#', ''); // pega depois do #
  const envHash = import.meta.env.VITE_ACCESS_PROJECT_HASH as string;

  return urlHash === envHash;
}
