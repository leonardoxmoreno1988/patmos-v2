export const EBOOK_URL =
  "https://drive.google.com/file/d/1gC_qykQa0p4zCXUbuYlXnH-CcvCzVpvn/view?usp=sharing";
export const EBOOK_TITLE = "La Segunda Venida de Cristo en las Religiones del Mundo";
export const EBOOK_COVER = "/religiones-segunda-venida.jpg";

export interface DownloadableResource {
  id: string;
  title: string;
  cover: string;
  url: string;
}

/** Catálogo único de descargas: se muestra en la ventana "Recursos". */
export const RESOURCES: DownloadableResource[] = [
  { id: "segunda-venida", title: EBOOK_TITLE, cover: EBOOK_COVER, url: EBOOK_URL },
];

const key = (userId: string) => `rvnotas:welcomed:${userId}`;

export function hasSeenWelcome(userId: string): boolean {
  try {
    return window.localStorage.getItem(key(userId)) === "1";
  } catch {
    return true;
  }
}

export function markWelcomeSeen(userId: string) {
  try {
    window.localStorage.setItem(key(userId), "1");
  } catch {
    /* ignore */
  }
}
