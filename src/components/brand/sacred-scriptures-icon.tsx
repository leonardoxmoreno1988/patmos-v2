/**
 * Glifo de las Escrituras (libro abierto con columnas de texto).
 * Geometría original de `sacred-scriptures.svg`, normalizada a un lienzo de 512
 * y pintada con `currentColor` para que herede el tono del tema.
 */
export function SacredScripturesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth={30}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <g transform="translate(0,512) scale(1,-1)">
        <g transform="translate(256,378.875)">
          <path d="m 0,0 v -305.75 c 0,33.28 -26.97,60.25 -60.25,60.25 H -241 V 60 H -60 C -26.86,60 0,33.14 0,0 Z" />
        </g>
        <g transform="translate(497,438.875)">
          <path d="m 0,0 v -305.5 h -180.75 c -16.64,0 -31.7,-6.74 -42.61,-17.64 -10.9,-10.91 -17.64,-25.97 -17.64,-42.61 V -60 c 0,33.14 26.86,60 60,60 z" />
        </g>
        <g transform="translate(75.25,344.25)">
          <path d="M 0,0 H 120.5" />
        </g>
        <g transform="translate(75.25,284)">
          <path d="M 0,0 H 120.5" />
        </g>
        <g transform="translate(75.25,223.75)">
          <path d="M 0,0 H 120.5" />
        </g>
        <g transform="translate(316.25,344.25)">
          <path d="M 0,0 H 120.5" />
        </g>
        <g transform="translate(316.25,284)">
          <path d="M 0,0 H 120.5" />
        </g>
        <g transform="translate(316.25,223.75)">
          <path d="M 0,0 H 120.5" />
        </g>
        <g transform="translate(256,73.125)">
          <path d="M 0,0 H -241 V 60.25 H -60.25 C -26.97,60.25 0,33.28 0,0 Z" />
        </g>
        <g transform="translate(497,133.375)">
          <path d="m 0,0 v -60.25 h -241 c 0,16.64 6.74,31.7 17.64,42.61 10.91,10.9 25.97,17.64 42.61,17.64 z" />
        </g>
      </g>
    </svg>
  );
}
