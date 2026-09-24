export const EBOOK_URL =
  "https://drive.google.com/file/d/1gC_qykQa0p4zCXUbuYlXnH-CcvCzVpvn/view?usp=sharing";
export const EBOOK_TITLE = "La Segunda Venida de Cristo y las Religiones del Mundo";

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
