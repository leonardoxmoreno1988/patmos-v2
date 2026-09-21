import artJonas from "@/assets/etsy-art/jonas.jpg.asset.json";
import artBecerro from "@/assets/etsy-art/becerro-de-oro.jpg.asset.json";
import artDaniel from "@/assets/etsy-art/daniel.jpg.asset.json";
import artArca from "@/assets/etsy-art/arca-noe.jpg.asset.json";
import artMarRojo from "@/assets/etsy-art/mar-rojo.jpg.asset.json";
import artCamina from "@/assets/etsy-art/camina-sobre-agua.jpg.asset.json";
import artSalomon from "@/assets/etsy-art/trono-salomon.jpg.asset.json";
import artSodoma from "@/assets/etsy-art/sodoma.jpg.asset.json";
import artCrucifixion from "@/assets/etsy-art/crucifixion.jpg.asset.json";
import artBautismo from "@/assets/etsy-art/bautismo.jpg.asset.json";
import artDavid from "@/assets/etsy-art/david-goliat.jpg.asset.json";

const ETSY_SHOP = "https://www.etsy.com/shop/PatmosStore";

type Artwork = {
  title: string;
  reference: string;
  image: string;
  href: string;
};

const ARTWORKS: Artwork[] = [
  {
    title: "Jonás y el Gran Pez",
    reference: "Jonás 2",
    image: artJonas.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Becerro de Oro",
    reference: "Éxodo 32",
    image: artBecerro.url,
    href: ETSY_SHOP,
  },
  {
    title: "Daniel en el Foso de los Leones",
    reference: "Daniel 6",
    image: artDaniel.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Arca de Noé",
    reference: "Génesis 7",
    image: artArca.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Mar Rojo",
    reference: "Éxodo 14",
    image: artMarRojo.url,
    href: ETSY_SHOP,
  },
  {
    title: "Caminando sobre el Agua",
    reference: "Mateo 14",
    image: artCamina.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Trono de Salomón",
    reference: "1 Reyes 10",
    image: artSalomon.url,
    href: ETSY_SHOP,
  },
  {
    title: "La Caída de Sodoma",
    reference: "Génesis 19",
    image: artSodoma.url,
    href: ETSY_SHOP,
  },
  {
    title: "La Crucifixión",
    reference: "Juan 19",
    image: artCrucifixion.url,
    href: ETSY_SHOP,
  },
  {
    title: "Adán en el Edén",
    reference: "Génesis 2",
    image: artBautismo.url,
    href: ETSY_SHOP,
  },
  {
    title: "David y Goliat",
    reference: "1 Samuel 17",
    image: artDavid.url,
    href: ETSY_SHOP,
  },
];

export function EtsyArtCarousel() {
  return (
    <section aria-label="Láminas e ilustraciones teológicas" className="mt-0">
      <h2 className="mb-5 text-xs uppercase tracking-wider text-muted-foreground/70">
        Descarga Digital
      </h2>
      <div className="scrollbar-none -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
        {ARTWORKS.map((artwork) => (
          <a
            key={artwork.title}
            href={artwork.href}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="Etsy Click"
            data-umami-event-item={artwork.title}
            className="group flex-none w-[220px] shrink-0 snap-start overflow-hidden rounded-lg bg-foreground/[0.03] transition-all hover:bg-foreground/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="relative">
              <img
                src={artwork.image}
                alt={artwork.title}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="space-y-1 p-3">
              <p className="mb-0.5 text-sm font-semibold leading-snug text-foreground line-clamp-1">
                {artwork.title}
              </p>
              <p className="mb-2 text-xs font-normal text-muted-foreground/70">
                {artwork.reference}
              </p>
              <p className="text-xs font-medium text-primary transition-colors hover:underline">
                Ver en Etsy →
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
