import bannerAsset from "@/assets/etsy-ad.png.asset.json";

const ETSY_URL = "https://www.etsy.com/shop/PatmosStore";

export function EtsyBanner() {
  return (
    <a
      href={ETSY_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="Etsy Click"
      className="my-6 block w-full cursor-pointer overflow-hidden rounded-xl transition-opacity hover:opacity-95"
    >
      <img
        src={bannerAsset.url}
        alt="Descarga arte digital bíblico en alta definición — ver tienda en Etsy"
        loading="lazy"
        className="h-auto w-full object-cover"
      />
    </a>
  );
}
