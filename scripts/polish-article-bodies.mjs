import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ ERROR: ANTHROPIC_API_KEY no está definida en el entorno.');
  process.exit(1);
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const STUDIES_DIR = path.join(process.cwd(), 'src', 'content', 'estudios');

// Configuración de lote / prueba piloto
const PILOT_MODE = true;
const OFFSET = 3;      // Salta los primeros N archivos ya probados
const PILOT_LIMIT = 3; // Procesa N nuevos artículos

const EXCLUDED_SLUGS = [
  'en-una-posada-le-encontro-jehova-y-le-quiso-matar',
  'desde-los-cielos-hiciste-oir-juicio',
  'project-hail-mary-y-el-sol-como-saco-de',
  'la-cabaña-el-evangelio-gnostico-del-siglo-xxi',
  'la-cabana-el-evangelio-gnostico-del-siglo-xxi'
];

const SYSTEM_PROMPT = `Actúa como un editor teológico y analítico de élite para la plataforma bíblica Patmos.
Tu tarea es reestructurar y pulir el cuerpo de un artículo teológico/apologético para maximizar su legibilidad, autoridad académica (E-E-A-T) y relevancia SEO.

REGLAS EDITORIALES ESTRICTAS:
1. PROHIBIDO TÍTULO / SUBTÍTULO INICIAL (CRÍTICO Y OBLIGATORIO):
- NO incluyas el título del artículo, subtítulos repetidos ni encabezados (H1, H2, H3 o texto en negrita) en la primera línea del cuerpo.
- La plantilla web de Patmos ya renderiza automáticamente el título principal desde los metadatos YAML del frontmatter.
- El texto devuelto DEBE comenzar directamente con el primer párrafo de prosa analítica.

2. NOMENCLATURA CANÓNICA RV1865 (OBLIGATORIO):
- Usa siempre "Actos" (NUNCA "Hechos").
- Usa siempre "Revelación" (NUNCA "Apocalipsis").
- Mantén los nombres propios y citas bíblicas alineados con la tradición bíblica histórica.

3. LIMPIEZA DE ELEMENTOS EPISTOLARES Y FLUFF:
- Elimina saludos iniciales ("Estimado lector,", "Queridos hermanos,", etc.).
- Elimina despedidas, firmas personales ("Leonardo M.", etc.) y peticiones de suscripción/compartir.
- Ve directo al grano en el primer párrafo con prosa analítica y contundente.

4. JERARQUÍA SEMÁNTICA (SEO):
- Organiza las secciones internas usando encabezados formales Markdown (## para secciones principales, ### para subtemas).
- Utiliza listas numeradas o con viñetas para enumerar puntos exegéticos o contrastes doctrinales.
- Las citas bíblicas extensas deben usar bloques de cita: > *«Texto del versículo»* (Referencia).

5. TRATAMIENTO DE ENLACES E IMÁGENES (ESTRICTO):
- PROHIBIDO INVENTAR ENLACES: Solo conserva los enlaces internos hacia /estudios/... que YA EXISTAN expresamente en el texto original. NUNCA crees o inventes slugs nuevos que no estén en el texto de entrada.
- Para las citas bíblicas, sí puedes formatear enlaces hacia /leer/[libro]/[capitulo] usando nombres de libros en minúsculas.
- Elimina enlaces salientes genéricos (Wikipedia, YouTube, Twitter/X, imágenes sueltas ajenas).
- Limpia los enlaces anidados de imágenes (Blogger/IPZ). Transfórmalos en sintaxis limpia:
     ![Texto alternativo descriptivo y semántico](url_original_de_la_imagen)

6. INTEGRIDAD Y PROFUNDIDAD (ANTI-TRUNCAMIENTO):
- NO resumas ni acortes el texto. Mantén toda la argumentación exegética, datos históricos y referencias del texto original.
- Devuelve ÚNICAMENTE el cuerpo del artículo en formato Markdown limpio, sin bloques de frontmatter (---) y sin notas meta.`;

async function polishBody(bodyContent, filename) {
  const prompt = `A continuación tienes el cuerpo del artículo "${filename}". Aplica todas las reglas editoriales y devuelve el cuerpo reestructurado:\n\n${bodyContent}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find(block => block.type === 'text');
  if (!textBlock || typeof textBlock.text !== 'string') {
    throw new Error(`Respuesta no válida de la API: ${JSON.stringify(response.content)}`);
  }

  let text = textBlock.text.trim();

  // Limpieza programática post-generación: elimina cualquier título o encabezado redundante en la primera línea
  text = text.replace(/^(?:#+\s*|\*\*)?[^\n]+\n+/, (firstLine) => {
    const trimmed = firstLine.trim();
    if (trimmed.startsWith('#') || (trimmed.startsWith('**') && trimmed.endsWith('**'))) {
      return '';
    }
    return firstLine;
  }).trim();

  return text;
}

async function run() {
  console.log('🚀 Iniciando pipeline de optimización editorial...');

  const files = fs.readdirSync(STUDIES_DIR).filter(f => f.endsWith('.md'));
  let validFilesCount = 0;
  let processedCount = 0;

  for (const file of files) {
    const filePath = path.join(STUDIES_DIR, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');

    const parts = rawContent.split('---');
    if (parts.length < 3) continue;

    const frontmatter = parts[1];
    const originalBody = parts.slice(2).join('---').trim();

    const isExcluded = EXCLUDED_SLUGS.some(slug => file.includes(slug) || frontmatter.includes(slug));
    if (isExcluded) continue;

    validFilesCount++;

    // Saltar los primeros N archivos definidos en OFFSET
    if (PILOT_MODE && validFilesCount <= OFFSET) {
      console.log(`⏭️ Omitiendo (ya probado en lote anterior) [${validFilesCount}]: ${file}`);
      continue;
    }

    console.log(`\n📄 Procesando [${validFilesCount}]: ${file}...`);

    try {
      const polishedBody = await polishBody(originalBody, file);
      const finalFileContent = `---\n${frontmatter.trim()}\n---\n\n${polishedBody}\n`;

      fs.writeFileSync(filePath, finalFileContent, 'utf8');
      console.log(`✅ ${file} optimizado y guardado con éxito.`);
      processedCount++;

      if (PILOT_MODE && processedCount >= PILOT_LIMIT) {
        console.log(`\n🛑 Límite de prueba alcanzado (${PILOT_LIMIT} nuevos artículos).`);
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (err) {
      console.error(`\n❌ Error crítico procesando ${file}:`, err.message || err);
      process.exit(1);
    }
  }

  console.log('\n🏁 Ejecución finalizada.');
}

run();