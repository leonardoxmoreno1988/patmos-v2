/**
 * Official PATMOS typography logo, shared by the site header and the Consultas
 * Patmos panel so both stay pixel-identical. The source SVG carries no intrinsic
 * size, so we pin its viewBox ratio (105.62 x 14.77) and let callers set the height.
 * The wordmark is dark navy: in dark mode we flatten it to white with a filter
 * instead of shipping a second asset.
 */
export function PatmosWordmark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-patmos.svg"
      alt="Patmos"
      className={`w-auto self-start object-contain aspect-[105.62/14.77] dark:brightness-0 dark:invert ${className ?? "h-4"}`}
    />
  );
}