import { lazy, Suspense, useEffect, useState, type ComponentProps } from "react";

import type { ConsultaPatmos as ConsultaPatmosComponent } from "./consulta-patmos";

// The consultation panel pulls in the whole AI/markdown stack (streamdown, shiki, mermaid), so it
// lives in its own chunk and only downloads when the panel is first opened or a trigger is hovered.
const loadConsulta = () => import("./consulta-patmos");
const ConsultaPatmos = lazy(() => loadConsulta().then((m) => ({ default: m.ConsultaPatmos })));

/** Starts downloading the panel ahead of time (e.g. on hover/focus of a trigger). */
export const preloadConsulta = () => void loadConsulta();

export function LazyConsultaPatmos(props: ComponentProps<typeof ConsultaPatmosComponent>) {
  // Stay mounted after the first open so the sheet's close animation and state survive.
  const [mounted, setMounted] = useState(props.open);
  useEffect(() => {
    if (props.open) setMounted(true);
  }, [props.open]);

  if (!mounted && !props.open) return null;
  return (
    <Suspense fallback={null}>
      <ConsultaPatmos {...props} />
    </Suspense>
  );
}
