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
    image: "/etsy-art/jonas.webp",
    href: "https://www.etsy.com/listing/4541664433/jonah-and-the-whale-digital-painting",
  },
  {
    title: "El Becerro de Oro",
    reference: "Éxodo 32",
    image: "/etsy-art/becerro-oro.webp",
    href: "https://www.etsy.com/listing/4569526660/adoration-of-the-golden-calf-biblical",
  },
  {
    title: "Daniel en el Foso de los Leones",
    reference: "Daniel 6",
    image: "/etsy-art/daniel.webp",
    href: "https://www.etsy.com/listing/4543525189/daniel-in-lions-den-oil-painting-print",
  },
  {
    title: "El Arca de Noé",
    reference: "Génesis 7",
    image: "/etsy-art/arca-noe.webp",
    href: "https://www.etsy.com/listing/4545827815/noahs-ark-oil-painting-print-stormy-sea",
  },
  {
    title: "El Mar Rojo",
    reference: "Éxodo 14",
    image: "/etsy-art/mar-rojo.webp",
    href: "https://www.etsy.com/listing/4542083259/moses-parting-red-sea-oil-painting-print",
  },
  {
    title: "Caminando sobre el Agua",
    reference: "Mateo 14",
    image: "/etsy-art/camina-sobre-agua.webp",
    href: "https://www.etsy.com/listing/4554387329/jesus-walking-on-water-impasto-oil",
  },
  {
    title: "El Trono de Salomón",
    reference: "1 Reyes 10",
    image: "/etsy-art/trono-salomon.webp",
    href: "https://www.etsy.com/listing/4544403417/king-solomon-throne-oil-texture-painting",
  },
  {
    title: "La Caída de Sodoma",
    reference: "Génesis 19",
    image: "/etsy-art/sodoma.webp",
    href: "https://www.etsy.com/listing/4549020689/lots-wife-pillar-of-salt-oil-painting",
  },
  {
    title: "La Crucifixión",
    reference: "Juan 19",
    image: "/etsy-art/crucifixion.webp",
    href: "https://www.etsy.com/listing/4546714509/crucifixion-oil-painting-golgotha-wall",
  },
  {
    title: "Adán en el Edén",
    reference: "Génesis 2",
    image: "/etsy-art/adam-eden.webp",
    href: "https://www.etsy.com/listing/4543370817/garden-of-eden-impasto-oil-painting",
  },
  {
    title: "David y Goliat",
    reference: "1 Samuel 17",
    image: "/etsy-art/david-goliat.webp",
    href: "https://www.etsy.com/listing/4543227597/david-and-goliath-oil-painting-print",
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
              <p className="text-xs font-medium text-primary transition-colors hover:underline dark:text-white dark:hover:text-white/90">
                Ver en Etsy →
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}