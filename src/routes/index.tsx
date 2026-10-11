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
          {/* Selector de idioma redondeado */}
          <div className="inline-flex items-center border border-[#000f37] px-3 gap-1 bg-transparent h-9 md:h-7 box-sizing-border rounded-full">
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

          {/* Botón Ir al Lector redondeado */}
          <a 
            href="/dashboard" 
            className="text-[10px] font-bold uppercase tracking-widest border border-[#000f37] text-[#000f37] px-4 py-2.5 md:py-1 rounded-full transition-all duration-300 hover:bg-[#000f37] hover:text-[#f9fafb] flex items-center justify-center min-h-[36px] md:min-h-[28px]"
          >
            {lang === 'es' ? "Ir al Lector" : "Go to Reader"}
          </a>
        </div>
      </header>

     {/* HERO SECTION */}
     <main className="flex-1 w-full max-w-[700px] flex flex-col justify-center py-16">
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight text-[#000f37]">
            {lang === 'es' ? <>RV1865 + Notas</> : <>KJV + Notes</>}
          </h1>
        </div>

        <p className="text-lg md:text-xl leading-relaxed text-[#000f37] max-w-2xl font-normal">
          {lang === 'es' ? (
            <>
              Estudia la Palabra pura (<span className="font-bold">RV1865 / KJV</span>) con herramientas avanzadas, notas personales y asistencia doctrinal en un solo ecosistema bilingüe.
            </>
          ) : (
            <>
              Study the pure Word (<span className="font-bold">KJV / RV1865</span>) with advanced tools, personal notes, and doctrinal assistance in one bilingual ecosystem.
            </>
          )}
        </p>

        {/* Ajustado el margen superior de mt-10 a mt-6 */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <a 
            href="/dashboard" 
            className="inline-flex items-center justify-center bg-[#000f37] text-[#f9fafb] text-base font-semibold px-8 py-3.5 rounded-full hover:bg-black transition-all"
          >
            {lang === 'es' ? "Abrir el Lector Gratis →" : "Open Reader for Free →"}
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {lang === 'es' ? "Lectura 100% gratuita • Consultas y Notas Ilimitadas por $15/mes" : "100% Free Reading • Unlimited Questions & Notes for $15/month"}
        </p>

        <div className="w-full mt-8 mb-0 rounded-xl overflow-hidden border border-[#e5e7eb] shadow-sm">
          <video
            src="https://www.leonardoxmoreno.com/images/patmos-v2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto block"
            aria-label="Patmos Platform Preview Video"
          />
        </div>

       {/* BENEFITS SECTION */}
       <section className="mt-0 border-t border-[#e5e7eb] pt-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] mb-8">
            {lang === 'es' ? "Todo en un solo ecosistema" : "All in One Ecosystem"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Feature 1: Lector Dual (Icono de Libro/Páginas) */}
            <div className="flex items-start gap-4">
              <div className="mt-1 shrink-0 p-2.5 bg-[#f3f4f6] rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000f37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg">{lang === 'es' ? "Lector Dual (RV1865 / KJV)" : "Dual Reader (KJV / RV1865)"}</h4>
                <p className="text-[#4b5563] mt-2 leading-relaxed">
                  {lang === 'es' ? "Lee los 1,189 capítulos con navegación rápida y sincronización bilingüe perfecta, sin interrupciones." : "Read all 1,189 chapters with fast navigation and perfect bilingual synchronization, without interruptions."}
                </p>
              </div>
            </div>
            
            {/* Feature 2: IA (Icono de Cerebro/Chispa) */}
            <div className="flex items-start gap-4">
              <div className="mt-1 shrink-0 p-2.5 bg-[#f3f4f6] rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000f37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg">{lang === 'es' ? "Panel Exegético Asistido" : "Assisted Exegetical Panel"}</h4>
                <p className="text-[#4b5563] mt-2 leading-relaxed">
                  {lang === 'es' ? "Consulta dudas proféticas, analiza tipos del Antiguo Testamento y recibe respuestas sustentadas con una postura pretribulacional firme." : "Ask prophetic questions, analyze Old Testament types, and get answers backed by a firm pre-tribulational stance."}
                </p>
              </div>
            </div>

            {/* Feature 3: Referencias Cruzadas (Icono de Enlaces/Red) */}
            <div className="flex items-start gap-4">
              <div className="mt-1 shrink-0 p-2.5 bg-[#f3f4f6] rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000f37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg">{lang === 'es' ? "Red de Referencias Cruzadas" : "Cross-Reference Network"}</h4>
                <p className="text-[#4b5563] mt-2 leading-relaxed">
                  {lang === 'es' ? "Navega a través de las Escrituras y descubre conexiones doctrinales con un sistema de referencias integrado en cada versículo." : "Navigate through the Scriptures and discover doctrinal connections with an integrated reference system for every verse."}
                </p>
              </div>
            </div>

            {/* Feature 4: Subrayado y Notas (Icono de Marcador/Lápiz) */}
            <div className="flex items-start gap-4">
              <div className="mt-1 shrink-0 p-2.5 bg-[#f3f4f6] rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000f37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg">{lang === 'es' ? "Subrayado y Notas Personales" : "Highlighting & Personal Notes"}</h4>
                <p className="text-[#4b5563] mt-2 leading-relaxed">
                  {lang === 'es' ? "Organiza tu estudio sistemático marcando textos con distintos colores temáticos y guarda tus propias anotaciones de forma segura en la nube." : "Organize your systematic study by highlighting texts with different thematic colors and securely save your own annotations in the cloud."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL SECTION */}
        <section className="mt-20 border-t border-[#e5e7eb] pt-12">
          <div className="flex flex-col gap-5">
            {/* 5 ESTRELLAS DORADAS ALINEADAS A LA IZQUIERDA */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="#c49400" 
                  className="shrink-0"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <p className="text-xl md:text-2xl font-medium text-[#000f37] leading-relaxed italic">
              {lang === 'es' ? (
                <>“Súper intuitivo y potente. Patmos transforma completamente cómo estudio la Biblia. Esta alternativa es exactamente lo que el estudiante de la Biblia necesita.”</>
              ) : (
                <>“Super intuitive and powerful. Patmos completely transforms how I study the Bible. This alternative is exactly what the Bible student needs.”</>
              )}
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#000f37] text-[#f9fafb] flex items-center justify-center text-sm font-bold tracking-tight select-none shrink-0">
                J
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#000f37]">Jesus Navarro</span>
                <span className="text-xs text-[#6b7280] font-medium mt-0.5">
                  {lang === 'es' ? "Diseñador de Productos y Creyente de la Biblia" : "Product Designer and Bible Believer"}
                </span>
              </div>
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
      {/* Reducido mt-10 a mt-8 y py-4 a py-2.5 con text-sm */}
      <a href="/dashboard" className="block w-full text-center mt-8 border border-[#000f37] py-2.5 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors">
        {lang === 'es' ? "Comenzar a Leer" : "Start Reading"}
      </a>
    </div>

    {/* Pro Plan */}
    <div className="bg-white border-2 border-[#000f37] p-8 rounded-xl relative flex flex-col justify-between">
      <div className="absolute -top-3 right-6 bg-[#2d65f6] text-white text-xs px-3 py-1 rounded-sm font-medium">
        {lang === 'es' ? "PATMOS PRO" : "PATMOS PRO"}
      </div>
      
      <div>
        <h4 className="text-xl font-semibold">{lang === 'es' ? "Apoya Patmos" : "Support Patmos"}</h4>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-bold">$15</span>
          <span className="ml-2 text-gray-500">{lang === 'es' ? "/ mes" : "/ month"}</span>
        </div>
        
        <p className="mt-4 text-sm leading-relaxed text-[#4b5563]">
          {lang === 'es' ? "Desbloquea el poder total del motor Patmos y apoya el desarrollo continuo de software bíblico independiente." : "Unlock the full power of the Patmos engine and support the continuous development of independent biblical software."}
        </p>
      </div>
      
      {/* Reducido mt-10 a mt-8 y py-4 a py-2.5 con text-sm */}
      <button onClick={handleCheckout} className="block w-full text-center mt-8 bg-[#000f37] text-white py-2.5 text-sm font-semibold rounded-full hover:bg-black border-none cursor-pointer outline-none transition-all shadow-md">
        {lang === 'es' ? "Obtener Acceso Ilimitado" : "Unlock Unlimited Access"}
      </button>
    </div>
  </div>
</section>

        {/* FAQS SECTION */}
        <section className="mt-20 border-t border-[#e5e7eb] pt-12 pb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] mb-8">
            {lang === 'es' ? "Preguntas Frecuentes" : "FAQs"}
          </h3>

          <div className="flex flex-col border-b border-[#e5e7eb]">
            
            {/* FAQ TEOLÓGICA 1 */}
            <details className="group border-t border-[#e5e7eb] py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#000f37]">
                <h4 className="text-base font-semibold tracking-wide text-left">
                  {lang === 'es' ? "¿Qué enseña Patmos sobre la Biblia?" : "What does Patmos teach about the Bible?"}
                </h4>
                <svg className="size-4 text-[#4b5563] group-open:-rotate-180 transition-transform duration-300 ease-in-out shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-[#4b5563] pr-6 transition-all duration-300">
                {lang === 'es' ? (
                  "Sostiene que la autoridad suprema, exclusiva y final para toda fe y ejecución del ministerio es la palabra de Dios infalible y estructuralmente preservada—encarnada strictly dentro de la Biblia Reina Valera 1865 y la Versión Autorizada King James para el mundo de habla inglesa. Opera bajo la convicción absoluta de que todas las traducciones modernas introducen distorsiones teológicas y corrupciones sistémicas (Salmos 12:6-7)."
                ) : (
                  "It holds that the supreme, exclusive, and final authority for all faith and ministry execution is the flawless, structurally preserved word of God—embodied strictly within the Authorized King James Holy Bible for the English-speaking world. It operates on the absolute conviction that all modern translations introduce theological distortions and systemic corruptions (Psalms 12:6-7)."
                )}
              </p>
            </details>

            {/* FAQ TEOLÓGICA 2 */}
            <details className="group border-t border-[#e5e7eb] py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#000f37]">
                <h4 className="text-base font-semibold tracking-wide text-left">
                  {lang === 'es' ? "¿Qué enseña Patmos sobre Dios?" : "What does Patmos teach about God?"}
                </h4>
                <svg className="size-4 text-[#4b5563] group-open:-rotate-180 transition-transform duration-300 ease-in-out shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-[#4b5563] pr-6 transition-all duration-300">
                {lang === 'es' ? (
                  "Reconoce a una Deidad suprema y triuna, que existe eternamente en tres Personas distintas: el Padre, la Palabra y el Espíritu Santo. Sostiene que cada miembro de la Trinidad es coeterno en existencia, coidéntico en su naturaleza esencial, coigual en poder soberano y perfectamente integrado dentro de los mismos atributos absolutos y perfecciones divinas (Deuteronomio 6:4; 1 Timoteo 1:17; 1 Juan 5:7)."
                ) : (
                  "It recognizes one supreme, triune Godhead, eternally existing across three distinct Persons: the Father, the Word, and the Holy Ghost. It holds that each constituent of the Trinity is co-eternal in existence, co-identical in core nature, co-equal in sovereign power, and perfectly integrated within the absolute self-same attributes and divine perfections (Deuteronomy 6:4; 1 Timothy 1:17; 1 John 5:7)."
                )}
              </p>
            </details>

            {/* FAQ TEOLÓGICA 3 */}
            <details className="group border-t border-[#e5e7eb] py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#000f37]">
                <h4 className="text-base font-semibold tracking-wide text-left">
                  {lang === 'es' ? "¿Qué enseña Patmos sobre Jesucristo?" : "What does Patmos teach about Jesus Christ?"}
                </h4>
                <svg className="size-4 text-[#4b5563] group-open:-rotate-180 transition-transform duration-300 ease-in-out shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-[#4b5563] pr-6 transition-all duration-300">
                {lang === 'es' ? (
                  "Afirma la deidad absoluta y la perfecta humanidad del Señor Jesucristo en una unión hipostática indivisible. Sostiene Su nacimiento virginal, Su vida sin pecado, Su sacrificio expiatorio y sustitutivo en la cruz mediante el derramamiento de Su sangre preciosa, Su resurrección corporal y Su ascensión gloriosa a la diestra del Padre (Filipenses 2:5-8; 1 Pedro 2:24; Hechos 1:9-11)."
                ) : (
                  "It affirms the absolute deity and perfect humanity of the Lord Jesus Christ in one indivisible hypostatic union. It holds to His virgin birth, His sinless life, His substitutionary atoning sacrifice on the cross through the shedding of His precious blood, His bodily resurrection, and His glorious ascension to the right hand of the Father (Philippians 2:5-8; 1 Peter 2:24; Acts 1:9-11)."
                )}
              </p>
            </details>

            {/* FAQ TEOLÓGICA 4 */}
            <details className="group border-t border-[#e5e7eb] py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-[#000f37]">
                <h4 className="text-base font-semibold tracking-wide text-left">
                  {lang === 'es' ? "¿Qué enseña Patmos sobre los Tiempos y Dispensaciones?" : "What does Patmos teach about Times and Dispensations?"}
                </h4>
                <svg className="size-4 text-[#4b5563] group-open:-rotate-180 transition-transform duration-300 ease-in-out shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-[#4b5563] pr-6 transition-all duration-300">
                {lang === 'es' ? (
                  "Sostiene una hermenéutica literal y dispensacional estricta, administrando bien la palabra de verdad. Reconoce la separación absoluta entre los planes de Dios para la Iglesia de Cristo y la nación de Israel. Defiende la expectativa inminente del rapto pretribulacional y el posterior establecimiento del reino milenial literal sobre la tierra (2 Timoteo 2:15; Romanos 11:25-26; 1 Tesalonicenses 4:16-17)."
                ) : (
                  "It maintains a strict literal and dispensational hermeneutic, rightly dividing the word of truth. It recognizes the absolute separation between God's distinct programs for the Church of Christ and the nation of Israel. It upholds the imminent pre-tribulation rapture and the subsequent literal millennial reign upon the earth (2 Timothy 2:15; Romans 11:25-26; 1 Thessalonians 4:16-17)."
                )}
              </p>
            </details>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-[700px] border-t border-[#e5e7eb] py-8 flex flex-col items-center">
        <p className="text-sm text-[#6b7280] text-center">
          © Patmos {new Date().getFullYear()} ·{' '}
          
          {lang === 'es' && (
            <>
              <a 
                href="/estudios" 
                className="text-[#000f37] font-semibold underline underline-offset-4 decoration-2 decoration-[#000f37]/30 hover:decoration-[#000f37] transition-colors"
              >
                Blog de estudios
              </a>
              {' '}·{' '}
            </>
          )}
          
          {lang === 'es' ? "Todos los derechos reservados." : "All rights reserved."}
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