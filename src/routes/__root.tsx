import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Comentario Bíblico — Lectura y notas de estudio" },
      {
        name: "description",
        content:
          "Lee la Biblia en un espacio limpio y sereno, con notas de estudio por capítulo.",
      },
      { property: "og:title", content: "Comentario Bíblico" },
      {
        property: "og:description",
        content: "Lectura bíblica minimalista con comentario y notas de estudio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "text/javascript",
        innerHTML: `!function(t,e){var o,n,p,r;e.__SV=window.posthog=void 0!==window.posthog&&void 0!==window.posthog.__SV?window.posthog:void 0,e.__SV=1;var i=document,s=window.posthog=window.posthog||[];if(!s.__SV){try{i=window.location.protocol+"//"+window.location.host+window.location.pathname}catch(t){}s.snippetVersion="v1.0",s.posthogConfig={api_host:"https://eu.i.posthog.com",autocapture:true,session_recording:{enabled:true}},o=function(t,e){var o=Array.prototype.slice.call(arguments,1);o.unshift(t),s.push(o)},n=["init","capture","identify","alias","page","pageview","register","register_once","unregister","opt_out_capturing","opt_in_capturing","is_feature_enabled","reloadFeatureFlags","onFeatureFlags","getFeatureFlag","getFeatureFlagPayload","group","setPersonProperties","resetPersonProperties","debug"];for(p=0;p<n.length;p++)r=n[p],s[r]=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t),s.push(e)}}(r);var a=i.createElement("script");a.type="text/javascript",a.async=true,a.src="https://eu.i.posthog.com/static/array.js";var c=i.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c),s.init("phc_BzubCxdmhVpCwpAwAFdK5KoFwGEDK6HBRcShx7dfTiLp",{api_host:"https://eu.i.posthog.com",autocapture:true,session_recording:{enabled:true}})}}(document,window.posthog||[]);`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
