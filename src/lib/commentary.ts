interface BookNote {
  genre: string;
  theme: string;
  key: string;
}

export const BOOK_NOTES: Record<number, BookNote> = {
  1: { genre: "Pentateuco", theme: "Los orígenes: creación, caída y las promesas hechas a los patriarcas.", key: "Dios crea con propósito y sostiene su pacto pese al fracaso humano." },
  2: { genre: "Pentateuco", theme: "La liberación de Egipto y el nacimiento de Israel como pueblo del pacto.", key: "La redención precede a la ley: primero el rescate, después la obediencia." },
  3: { genre: "Pentateuco", theme: "Santidad, sacrificio y culto en la presencia de Dios.", key: "El acceso a Dios exige mediación y pureza." },
  4: { genre: "Pentateuco", theme: "El desierto: censo, murmuración y fidelidad divina.", key: "La incredulidad retrasa la promesa, pero no la anula." },
  5: { genre: "Pentateuco", theme: "Renovación del pacto ante la entrada a la tierra.", key: "Recordar es la clave de la obediencia." },
  6: { genre: "Históricos", theme: "Conquista y reparto de la tierra prometida.", key: "Dios cumple lo que jura." },
  7: { genre: "Históricos", theme: "Ciclos de apostasía, opresión, clamor y liberación.", key: "La gracia irrumpe donde falta el liderazgo justo." },
  8: { genre: "Históricos", theme: "Lealtad y redención en tiempos oscuros.", key: "La providencia obra en historias pequeñas." },
  9: { genre: "Históricos", theme: "Del sacerdocio al reinado: Samuel, Saúl y David.", key: "Dios mira el corazón, no la apariencia." },
  10: { genre: "Históricos", theme: "El reinado de David y el pacto davídico.", key: "Un trono eterno prometido a la casa de David." },
  11: { genre: "Históricos", theme: "Salomón, el templo y la división del reino.", key: "La sabiduría sin fidelidad termina en ruina." },
  12: { genre: "Históricos", theme: "Profetas y reyes hasta el exilio.", key: "La palabra profética juzga y sostiene la historia." },
  13: { genre: "Históricos", theme: "Relectura sacerdotal de la historia de David.", key: "La adoración organiza la vida del pueblo." },
  14: { genre: "Históricos", theme: "El templo, la reforma y la esperanza del retorno.", key: "El avivamiento nace de volver a la Palabra." },
  15: { genre: "Históricos", theme: "Regreso del exilio y reconstrucción del templo.", key: "Dios mueve imperios para restaurar a los suyos." },
  16: { genre: "Históricos", theme: "Reconstrucción de los muros y renovación comunitaria.", key: "Oración y trabajo van de la mano." },
  17: { genre: "Históricos", theme: "Providencia oculta en la corte persa.", key: "Dios protege a su pueblo aun cuando no se le nombra." },
  18: { genre: "Poéticos", theme: "El sufrimiento del justo y la soberanía inescrutable de Dios.", key: "La fe puede convivir con preguntas sin respuesta." },
  19: { genre: "Poéticos", theme: "Oración y alabanza para toda la experiencia humana.", key: "Todo lo humano puede llevarse a Dios en oración." },
  20: { genre: "Poéticos", theme: "Sabiduría práctica para la vida diaria.", key: "El temor de Jehová es el principio de la sabiduría." },
  21: { genre: "Poéticos", theme: "El vacío de la vida sin Dios bajo el sol.", key: "Vivir con sentido es vivir ante Dios." },
  22: { genre: "Poéticos", theme: "El amor humano celebrado como don bueno.", key: "El deseo y la fidelidad se pertenecen." },
  23: { genre: "Profetas mayores", theme: "Juicio y consolación: el Siervo sufriente y la nueva creación.", key: "La salvación viene de Jehová." },
  24: { genre: "Profetas mayores", theme: "Advertencia ante el exilio y promesa del nuevo pacto.", key: "Dios escribe su ley en el corazón." },
  25: { genre: "Profetas mayores", theme: "Lamento por Jerusalén caída.", key: "Nuevas son sus misericordias cada mañana." },
  26: { genre: "Profetas mayores", theme: "La gloria de Dios, el exilio y los huesos secos.", key: "Dios da corazón nuevo y espíritu nuevo." },
  27: { genre: "Profetas mayores", theme: "Fidelidad en el imperio y visiones del reino eterno.", key: "El Altísimo gobierna sobre los reinos humanos." },
  28: { genre: "Profetas menores", theme: "Amor fiel frente a la infidelidad del pueblo.", key: "Misericordia quiero, y no sacrificio." },
  29: { genre: "Profetas menores", theme: "El día de Jehová y el derramamiento del Espíritu.", key: "Volveos a mí con todo vuestro corazón." },
  30: { genre: "Profetas menores", theme: "Justicia social como fruto del culto verdadero.", key: "Corra el juicio como las aguas." },
  31: { genre: "Profetas menores", theme: "Juicio sobre el orgullo de Edom.", key: "La soberbia precede a la caída." },
  32: { genre: "Profetas menores", theme: "La misericordia de Dios alcanza a los de afuera.", key: "Dios es clemente y lento para la ira." },
  33: { genre: "Profetas menores", theme: "Juicio y esperanza mesiánica desde Belén.", key: "Hacer justicia, amar misericordia, andar humildemente." },
  34: { genre: "Profetas menores", theme: "Caída de Nínive y consuelo para los oprimidos.", key: "Dios es refugio en el día de la angustia." },
  35: { genre: "Profetas menores", theme: "Preguntas honestas y confianza final.", key: "El justo por su fe vivirá." },
  36: { genre: "Profetas menores", theme: "El día de Jehová y el remanente humilde.", key: "Dios se regocija sobre los suyos con cánticos." },
  37: { genre: "Profetas menores", theme: "Prioridades: reconstruir la casa de Dios.", key: "Meditad bien sobre vuestros caminos." },
  38: { genre: "Profetas menores", theme: "Visiones de restauración y del Rey humilde.", key: "No con ejército, ni con fuerza, sino con mi Espíritu." },
  39: { genre: "Profetas menores", theme: "Culto sincero y la promesa del mensajero.", key: "Nace el Sol de justicia con salvación en sus alas." },
  40: { genre: "Evangelios", theme: "Jesús, el Mesías prometido y Rey del reino de los cielos.", key: "Cumplimiento de la Escritura en Cristo." },
  41: { genre: "Evangelios", theme: "Jesús, el Siervo que actúa con autoridad y va a la cruz.", key: "El Hijo del Hombre vino para servir y dar su vida." },
  42: { genre: "Evangelios", theme: "Jesús, salvador de los perdidos y de los marginados.", key: "Buenas nuevas para los pobres." },
  43: { genre: "Evangelios", theme: "Jesús, el Verbo hecho carne: creer y tener vida.", key: "Yo soy el camino, la verdad y la vida." },
  44: { genre: "Históricos", theme: "El Espíritu impulsa a la iglesia hasta lo último de la tierra.", key: "La misión avanza pese a la oposición." },
  45: { genre: "Cartas paulinas", theme: "El evangelio de la justificación por la fe.", key: "Justificados por fe, tenemos paz para con Dios." },
  46: { genre: "Cartas paulinas", theme: "Corrección pastoral a una iglesia dividida.", key: "La cruz redefine la sabiduría y el poder." },
  47: { genre: "Cartas paulinas", theme: "Ministerio en debilidad y consuelo.", key: "Mi poder se perfecciona en la debilidad." },
  48: { genre: "Cartas paulinas", theme: "Libertad en Cristo frente al legalismo.", key: "El justo vivirá por la fe, no por las obras de la ley." },
  49: { genre: "Cartas paulinas", theme: "El plan eterno de Dios y la iglesia como un solo pueblo.", key: "Por gracia sois salvos, por medio de la fe." },
  50: { genre: "Cartas paulinas", theme: "Gozo y humildad al estilo de Cristo.", key: "Haya en vosotros este sentir que hubo en Cristo Jesús." },
  51: { genre: "Cartas paulinas", theme: "La supremacía y suficiencia de Cristo.", key: "En él habita toda la plenitud de la Deidad." },
  52: { genre: "Cartas paulinas", theme: "Esperanza en el regreso del Señor.", key: "Vivir santamente mientras esperamos." },
  53: { genre: "Cartas paulinas", theme: "Firmeza ante la confusión escatológica.", key: "Estad firmes y retened la enseñanza recibida." },
  54: { genre: "Cartas paulinas", theme: "Orden y liderazgo en la iglesia.", key: "Sana doctrina y conducta ejemplar." },
  55: { genre: "Cartas paulinas", theme: "Testamento pastoral de Pablo.", key: "Toda la Escritura es inspirada por Dios." },
  56: { genre: "Cartas paulinas", theme: "Buenas obras como fruto de la gracia.", key: "La gracia enseña a vivir sobriamente." },
  57: { genre: "Cartas paulinas", theme: "Reconciliación y perdón concretos.", key: "El evangelio transforma las relaciones." },
  58: { genre: "Cartas generales", theme: "Cristo superior: mejor sacerdote, mejor pacto, mejor sacrificio.", key: "Acerquémonos confiadamente al trono de la gracia." },
  59: { genre: "Cartas generales", theme: "Fe práctica que se ve en las obras.", key: "La fe sin obras es muerta." },
  60: { genre: "Cartas generales", theme: "Esperanza viva en medio del sufrimiento.", key: "Sois linaje escogido, real sacerdocio." },
  61: { genre: "Cartas generales", theme: "Firmeza ante falsos maestros.", key: "Creced en la gracia y el conocimiento de Cristo." },
  62: { genre: "Cartas generales", theme: "Comunión con Dios: luz, amor y verdad.", key: "Dios es amor; amémonos unos a otros." },
  63: { genre: "Cartas generales", theme: "Andar en verdad y amor.", key: "La verdad no se negocia." },
  64: { genre: "Cartas generales", theme: "Hospitalidad y humildad en el liderazgo.", key: "Imita lo bueno, no lo malo." },
  65: { genre: "Cartas generales", theme: "Contender por la fe frente al error.", key: "Dios es poderoso para guardaros sin caída." },
  66: { genre: "Apocalíptico", theme: "La victoria final del Cordero y la nueva creación.", key: "He aquí, yo hago nuevas todas las cosas." },
};

export interface ChapterNote {
  title: string;
  body: string;
}

export function buildNotes(
  bookid: number,
  bookName: string,
  chapter: number,
  verses: { verse: number; text: string }[],
): ChapterNote[] {
  const info = BOOK_NOTES[bookid];
  const notes: ChapterNote[] = [];

  if (info) {
    notes.push({
      title: `Contexto de ${bookName}`,
      body: `${info.genre}. ${info.theme}`,
    });
    notes.push({ title: "Idea central del libro", body: info.key });
  }

  const longest = verses.reduce(
    (acc, v) => (v.text.length > acc.text.length ? v : acc),
    verses[0] ?? { verse: 0, text: "" },
  );
  if (longest.verse) {
    notes.push({
      title: `Versículo para meditar · ${chapter}:${longest.verse}`,
      body: `«${longest.text}» Léelo despacio y pregúntate qué revela sobre Dios y qué pide de ti hoy.`,
    });
  }

  notes.push({
    title: "Cómo estudiar este capítulo",
    body: `Este capítulo tiene ${verses.length} versículos. Observa quién habla, a quién y en qué circunstancia; luego identifica una promesa, un mandato y una razón para dar gracias.`,
  });

  return notes;
}