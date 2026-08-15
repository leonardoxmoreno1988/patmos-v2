import bannerAsset from "@/assets/patmos-banner.jpg.asset.json";

const ETSY_URL = "https://www.etsy.com/shop/PatmosStore";

export function EtsyBanner() {
  return (
    <a
      href={ETSY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 block cursor-pointer overflow-hidden rounded-none border border-border/60 transition-opacity hover:opacity-95"
    >
      <img
        src={bannerAsset.url}
        alt="Patmos — arte bíblico majestuoso, ver más en Etsy"
        loading="lazy"
        className="h-auto w-full object-cover"
      />
    </a>
  );
}
