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
  price: string;
  image: string;
  href: string;
};

const ARTWORKS: Artwork[] = [
  {
    title: "Jonás y el Gran Pez — Jonás 2",
    price: "Desde $6 USD",
    image: artJonas.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Becerro de Oro — Éxodo 32",
    price: "Desde $6 USD",
    image: artBecerro.url,
    href: ETSY_SHOP,
  },
  {
    title: "Daniel en el Foso de los Leones — Daniel 6",
    price: "Desde $6 USD",
    image: artDaniel.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Arca de Noé — Génesis 7",
    price: "Desde $6 USD",
    image: artArca.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Mar Rojo — Éxodo 14",
    price: "Desde $6 USD",
    image: artMarRojo.url,
    href: ETSY_SHOP,
  },
  {
    title: "Caminando sobre el Agua — Mateo 14",
    price: "Desde $6 USD",
    image: artCamina.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Trono de Salomón — 1 Reyes 10",
    price: "Desde $6 USD",
    image: artSalomon.url,
    href: ETSY_SHOP,
  },
  {
    title: "La Caída de Sodoma — Génesis 19",
    price: "Desde $6 USD",
    image: artSodoma.url,
    href: ETSY_SHOP,
  },
  {
    title: "La Crucifixión — Juan 19",
    price: "Desde $6 USD",
    image: artCrucifixion.url,
    href: ETSY_SHOP,
  },
  {
    title: "El Bautismo de Jesús — Mateo 3",
    price: "Desde $6 USD",
    image: artBautismo.url,
    href: ETSY_SHOP,
  },
  {
    title: "David y Goliat — 1 Samuel 17",
    price: "Desde $6 USD",
    image: artDavid.url,
    href: ETSY_SHOP,
  },
];

export function EtsyArtCarousel() {
  return (
    <section aria-label="Láminas e ilustraciones teológicas" className="mt-0">
      <h2 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground/70">
        Láminas &amp; Ilustraciones
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
            className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-lg bg-foreground/[0.03] transition-all hover:bg-foreground/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:w-[280px]"
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              loading="lazy"
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
            />
            <div className="space-y-1.5 p-3">
              <p className="mb-1 text-[16px] font-semibold leading-snug text-foreground">
                {artwork.title}
              </p>
              <p className="text-[14px] text-muted-foreground">
                {artwork.price}
              </p>
              <p className="pt-1 text-[14px] font-medium text-primary hover:underline">
                Ver en Etsy →
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
