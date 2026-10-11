import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { createClient } from '@supabase/supabase-js';

// Importaciones necesarias para SEO y configuración de página
import { PUBLIC_PAGE_HEADERS, seoHead } from "@/lib/seo";

// Declaración global para Lemon Squeezy
declare global {
  interface Window {
    LemonSqueezy: any;
  }
}

// Inicialización de Supabase adaptada para Vite
const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'] || '';
const supabaseKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] || '';
const supabase = createClient(supabaseUrl, supabaseKey);

function HomePage() {
  // Usamos estado local temporal para el idioma para evitar errores de importación
  const [lang, setLanguage] = useState<'en' | 'es'>('es');
  const [isMounted, setIsMounted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://app.lemonsqueezy.com/js/lemon.js";
    script.defer = true;
    
    script.onload = () => {
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Setup();
      }
    };

    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src="https://app.lemonsqueezy.com/js/lemon.js"]');
      if (existing) existing.remove();
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const checkUser = async () => {
      if (!supabaseUrl || !supabaseKey) return;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setUserId(user.id);
      } catch (e) {
        console.error("Error auth", e);
      }
    };
    checkUser();
  }, []);

  const handleCheckout = () => {
    if (!userId) {
      window.location.href = '/dashboard'; // El dashboard forzará el login modal
      return;
    }

    const CHECKOUT_URL = `https://patmos.lemonsqueezy.com/checkout/buy/4beafe1a-6811-457e-b7b5-02e216f8aeef?checkout[custom][user_id]=${userId}&embed=1`;

    if (window.LemonSqueezy?.Url) {
      window.LemonSqueezy.Url.open(CHECKOUT_URL);
    } else {
      window.open(CHECKOUT_URL, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-[#f9fafb]" />;

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#000f37] flex flex-col items-center justify-between antialiased px-6 md:px-0" style={{ fontFamily: '"Inter", sans-serif' }}>
      
      {/* HEADER */}
      <header className="w-full max-w-[700px] py-6 flex justify-between items-center mt-4">
        <a href="/" className="flex items-center transition-opacity duration-200 hover:opacity-80">
          <img 
            src="https://www.leonardoxmoreno.com/files/logo-patmos.svg" 
            alt="Patmos Research Logo" 
            className="h-4 w-auto object-contain"
          />
        </a>
        
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center border border-[#000f37] px-2 gap-1 bg-transparent h-9 md:h-7 box-sizing-border">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000f37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>
            </svg>
            
            <select 
              value={lang}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="bg-transparent border-none outline-none cursor-pointer text-[10px] font-bold uppercase tracking-wider h-full p-0 m-0"
              style={{ color: '#000f37', fontFamily: '"Inter", sans-serif', WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>

          <a 
            href="/dashboard" 
            className="text-[10px] font-bold uppercase tracking-widest border border-[#000f37] text-[#000f37] px-4 py-2.5 md:py-1 rounded-none transition-all duration-300 hover:bg-[#000f37] hover:text-[#f9fafb] flex items-center justify-center min-h-[36px] md:min-h-[28px]"
          >
            {userId ? (lang === 'es' ? "Ir al Lector" : "Go to Reader") : (lang === 'es' ? "Iniciar Sesión" : "Sign In")}
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full max-w-[700px] flex flex-col justify-center py-16">
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight text-[#000f37]">
            {lang === 'es' ? <>El Lector Bíblico e Inteligencia Exegética</> : <>The Biblical Reader &<br/>Exegetical Intelligence</>}
          </h1>
        </div>

        <p className="text-2xl font-medium text-[#000f37] max-w-xl">
          {lang === 'es' ? <>Texto bilingüe, herramientas de estudio y asistencia AI basada exclusivamente en la <span className="font-semibold">Reina Valera 1865 y la KJV</span>.</> : <>Bilingual text, study tools, and AI assistance based exclusively on the <span className="font-semibold">Authorized King James Version</span>.</>}
        </p>

        <p className="text-lg leading-relaxed text-[#374151] mt-6 max-w-2xl">
          {lang === 'es' ? <>Una plataforma integral diseñada para el escrutinio literal y dispensacional de las Escrituras. Lee, subraya, guarda notas, analiza paralelos y consulta dudas doctrinales profundas en un solo lugar.<br/><br/>Sin traducciones modernas. Solo la Palabra pura.</> : <>An all-in-one platform designed for the literal and dispensational study of Scripture. Read, highlight, save notes, analyze parallels, and consult deep doctrinal questions in one place.<br/><br/>No modern translations. Just the pure Word.</>}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="/dashboard" className="inline-flex items-center justify-center bg-[#000f37] text-[#f9fafb] text-base font-semibold px-10 py-5 rounded-xl hover:bg-black transition-all">
            {lang === 'es' ? "Abrir el Lector Gratis →" : "Open Reader for Free →"}
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {lang === 'es' ? "Lectura 100% gratuita • IA y Notas Ilimitadas por $15/mes" : "100% Free Reading • Unlimited AI & Notes for $15/month"}
        </p>

        <img src="https://www.leonardoxmoreno.com/files/patmos-illustration.jpg" alt="Patmos Platform Preview" className="w-full h-auto mt-8 block mb-0" />

        {/* BENEFITS SECTION */}
        <section className="mt-0 border-t border-[#e5e7eb] pt-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] mb-8">
            {lang === 'es' ? "Todo tu estudio en un solo ecosistema" : "Your Entire Study in One Ecosystem"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h4 className="font-semibold text-lg">{lang === 'es' ? "Lector Dual (RV1865 / KJV)" : "Dual Reader (RV1865 / KJV)"}</h4>
              <p className="text-[#4b5563] mt-3 leading-relaxed">
                {lang === 'es' ? "Lee los 1,189 capítulos con navegación rápida, referencias cruzadas y sincronización bilingüe perfecta." : "Read all 1,189 chapters with fast navigation, cross-references, and perfect bilingual synchronization."}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">{lang === 'es' ? "Panel Exegético Asistido (IA)" : "AI-Assisted Exegetical Panel"}</h4>
              <p className="text-[#4b5563] mt-3 leading-relaxed">
                {lang === 'es' ? "Consulta dudas proféticas, analiza tipos del Antiguo Testamento y recibe respuestas sustentadas con una postura pretribulacional firme." : "Ask prophetic questions, analyze Old Testament types, and get answers backed by a firm pre-tribulational stance."}
              </p>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="mt-20 border-t border-[#e5e7eb] pt-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] mb-8">
            {lang === 'es' ? "Seleccione su Acceso" : "Choose Your Access"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white border border-[#cbd5e1] p-8 rounded-xl flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-semibold">{lang === 'es' ? "Lector Básico" : "Basic Reader"}</h4>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="ml-2 text-gray-500">{lang === 'es' ? "/ para siempre" : "/ forever"}</span>
                </div>
                <p className="mt-6 text-[#4b5563]">
                  {lang === 'es' ? "Acceso completo a las Escrituras con límite en herramientas avanzadas." : "Full access to the Scriptures with limits on advanced tools."}
                </p>
              </div>
              <a href="/dashboard" className="block w-full text-center mt-10 border border-[#000f37] py-4 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                {lang === 'es' ? "Comenzar a Leer" : "Start Reading"}
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-[#000f37] p-8 rounded-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-[#2d65f6] text-white text-xs px-4 py-1 rounded-full font-medium">
                {lang === 'es' ? "PATMOS PRO" : "PATMOS PRO"}
              </div>
              
              <div>
                <h4 className="text-xl font-semibold">{lang === 'es' ? "Estudio Sin Límites" : "Limitless Study"}</h4>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold">$15</span>
                  <span className="ml-2 text-gray-500">{lang === 'es' ? "/ mes" : "/ month"}</span>
                </div>
                
                <p className="mt-4 text-sm leading-relaxed text-[#4b5563]">
                  {lang === 'es' ? "Desbloquea el poder total del motor Patmos y apoya el desarrollo continuo de software bíblico independiente." : "Unlock the full power of the Patmos engine and support the continuous development of independent biblical software."}
                </p>
              </div>
              
              <button onClick={handleCheckout} className="block w-full text-center mt-10 bg-[#000f37] text-white py-4 font-semibold rounded-xl hover:bg-black border-none cursor-pointer outline-none transition-all shadow-md">
                {lang === 'es' ? "Obtener Acceso Ilimitado" : "Unlock Unlimited Access"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-[700px] border-t border-[#e5e7eb] py-8 flex flex-col items-center gap-4">
        <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider text-center">
          © {new Date().getFullYear()} Patmos Research. {lang === 'es' ? "Todos los derechos reservados." : "All Rights Reserved."}
        </p>
      </footer>
    </div>
  );
}

// Exportación obligatoria con todos los datos que exige TanStack Router
export const Route = createFileRoute('/')({
  staticData: { sitemap: true },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () =>
    seoHead({
      title: "PATMOS – Exégesis y Biblia Reina Valera 1865",
      description: "Plataforma de investigación teológica, análisis profético y preservación del texto bíblico en español.",
      canonical: "/",
      jsonLd: [],
    }),
  component: HomePage,
});