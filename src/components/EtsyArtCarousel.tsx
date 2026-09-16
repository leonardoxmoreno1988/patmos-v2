import artCreacion from "@/assets/etsy-art/creacion.jpg";
import artSalmo23 from "@/assets/etsy-art/salmo23.jpg";
import artMarRojo from "@/assets/etsy-art/mar-rojo.jpg";
import artJonas from "@/assets/etsy-art/jonas.jpg";
import artBelen from "@/assets/etsy-art/belen.jpg";
import artJerusalen from "@/assets/etsy-art/jerusalen.jpg";

const ETSY_SHOP = "https://www.etsy.com/shop/PatmosStore";

type Artwork = {
  title: string;
  price: string;
  image: string;
  href: string;
};

const ARTWORKS: Artwork[] = [
  {
    title: "La Creación — Génesis 1",
    price: "Desde €12",
    image: artCreacion,
    href: ETSY_SHOP,
  },
  {
    title: "El Buen Pastor — Salmo 23",
    price: "Desde €12",
    image: artSalmo23,
    href: ETSY_SHOP,
  },
  {
    title: "El Mar Rojo — Éxodo 14",
    price: "Desde €12",
    image: artMarRojo,
    href: ETSY_SHOP,
  },
  {
    title: "Jonás y el Gran Pez",
    price: "Desde €12",
    image: artJonas,
    href: ETSY_SHOP,
  },
  {
    title: "Natividad — Belén",
    price: "Desde €12",
    image: artBelen,
    href: ETSY_SHOP,
  },
  {
    title: "La Nueva Jerusalén — Apocalipsis 21",
    price: "Desde €12",
    image: artJerusalen,
    href: ETSY_SHOP,
  },
];

export function EtsyArtCarousel() {
  return (
    <section aria-label="Láminas e ilustraciones teológicas" className="mt-0">
      <h2 className="mb-3 text-xs uppercase tracking-wider text-muted-foreground/70">
        Láminas &amp; Ilustraciones Teológicas
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
            className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-foreground/[0.03] transition-all hover:bg-foreground/[0.06] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:w-[280px]"
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="space-y-1.5 p-3">
              <p className="mb-1 text-[18px] font-semibold leading-snug text-foreground">
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
