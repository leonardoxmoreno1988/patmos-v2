import { SITE_URL } from "@/lib/seo";

/** Author bio shown at the end of house-authored studies. Guest posts do not render it. */
export function AuthorBox() {
  return (
    <aside className="mt-8 flex flex-col items-start gap-6 rounded-xl border border-border bg-muted/40 px-5 py-6 sm:flex-row sm:items-center sm:px-7 md:p-8">
      <img
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqEX3Ykv5bd2B31M5dsKH5XWIUaYIPcsbeeKKcsx-RgA1R4aSjK6y5SOxXeWW_XVmh0EmvyfSdNPW2I0eNf_C6s3vzVwMoFD2wV_M9EMtHPzM0MRRByfkblJaV_jCyRp2E9HFRwGBwEJZhUSpTdvsHbgeQkN7KOKexKuoUz_KKD678KOH5ZavnrWvSGUk/s1600/me-rp.png"
        alt="Leonardo Moreno"
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-border"
        loading="lazy"
      />

      <p className="text-[15px] leading-relaxed text-muted-foreground">
        <strong className="font-semibold text-foreground">Leonardo Moreno</strong> es teólogo graduado con un
        Bachelor of Divinity (BDiv) por The Bible Doctrine Institute (TBDI), con una especialización en escatología
        por el Instituto Teológico Internacional (ITI). A través de su{" "}
        <a
          href={SITE_URL}
          className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          sitio web
        </a>{" "}
        y su{" "}
        <a
          href="https://t.me/rvnotas"
          className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          canal de Telegram
        </a>
        , comparte análisis bíblicos, exégesis y estudio profético orientados a crecer y
        consolidar la fe de los creyentes.
      </p>
    </aside>
  );
}
