/** One element of a chapter in reading order. */
export type ChapterBlock =
  | { type: "paragraph"; text: string; variant?: "quote" | "lyrics" }
  | { type: "subheading"; text: string }
  | { type: "scripture"; reference: string; version: string; text: string };

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  subtitle?: string;
  summary: string;
  readingTimeMinutes: number;
  /** Every complete paragraph extracted from the PDF, without truncation. */
  content: string[];
  /** Structured chapter text. When present, the reader renders these blocks instead of `content`. */
  blocks?: ChapterBlock[];
}

export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    bio: string;
    church: string;
    city: string;
  };
  year: number;
  coverImage: string;
  pdfUrl: string;
  pageCount: number;
  synopsis: string;
  chapters: Chapter[];
}

export const LIBRO_1865: Book = {
  slug: "muchas-pero-solo-una",
  title: "Muchas pero solo una: La Biblia 1865",
  subtitle: "Siete evidencias de la palabra perfecta e infalible de Dios en castellano",
  author: {
    name: "Enrique Ginocchio R.",
    role: "Pastor Bautista",
    bio: "El Pastor Enrique Ginocchio lleva más de cuarenta años ejerciendo la labor Pastoral, y actualmente dirige la Iglesia Bautista ubicada en San Fernando en Chosica - Lima, Perú.",
    church: "Iglesia Bautista de San Fernando",
    city: "Chosica, Lima, Perú",
  },
  year: 2026,
  coverImage: "/resources/muchas-solo-una.webp",
  pdfUrl: "/resources/muchas-pero-solo-una-rv1865.pdf",
  pageCount: 51,
  synopsis: "Frente al relativismo moderno y la proliferación de versiones que afirman que ninguna traducción es la verdadera, este libro presenta siete evidencias históricas, textuales y teológicas que demuestran cómo Dios preservó de manera perfecta e infalible Su palabra en castellano a través de la revisión Reina-Valera de 1865.",
  chapters: [
  {
    slug: "el-hermano-lugardo",
    number: 1,
    title: "El hermano Lugardo",
    summary: "Carta a Lugardo Rossini, un hermano que hace muchas preguntas, para explicar el propósito del libro: siete evidencias de que la Biblia Reina-Valera de 1865 es la palabra de Dios en castellano. Abre con la persecución del justo, desde Abel en adelante.",
    readingTimeMinutes: 8,
    content: [],
    blocks: [
      {
        "type": "paragraph",
        "text": "Lugardo Rossini es un amado hermano de la Iglesia Bautista de San Fernando en Chosica, Lima, Perú. Lo considero mi hijo espiritual, aunque él tiene unos cuantos años más que yo. Los dos somos “setentones” pero yo acabo de cumplir recién los 70. No hay nadie dentro de la Iglesia más preguntador que el hermano Lugardo. ¡Y eso no es un defecto, es una virtud!. Porque él aprende mucho preguntando. Yo mismo le he animado a él y a los demás hermanos de la Escuela Pastoral de nuestra Iglesia a plantear todas las preguntas que ellos quieran, pero advirtiéndoles que algunas veces no tenemos ninguna respuesta, porque la Biblia habla de ciertas cosas secretas que solamente pertenecen a Dios:"
      },
      {
        "type": "scripture",
        "reference": "Deuteronomio 29:29",
        "version": "RV1865",
        "text": "Las cosas secretas pertenecen a Jehová nuestro Dios: mas las reveladas son para nosotros y para nuestros hijos para siempre, para que hagamos todas las palabras de esta ley."
      },
      {
        "type": "paragraph",
        "text": "Este libro presenta siete evidencias acerca de la Biblia Reina-Valera revisada en 1865 como la única y perfecta palabra de Dios en castellano. Está escrito como un mensaje al hermano Lugardo. Si Dios me permite lograr el objetivo de que él entienda cabalmente la explicación, estoy seguro de que muchos otros miles de amados hermanos alrededor de América Latina o de España, o de otros lugares del mundo donde se habla español, también podrán entender. Porque el hermano de nuestra Iglesia a quien escribo estas cartas es una persona real -no es imaginario- que no ha tenido de manera formal una “educación teológica” como a veces así le llaman, tampoco es un “profesional” entendiendo esto como aquellos que tienen una carrera universitaria. Mi mayor placer es hacerlo así!!! Lograr que muchísimos hermanos en Cristo puedan ser instruidos de la manera más sencilla posible en el campo de la fe."
      },
      {
        "type": "subheading",
        "text": "Uno contra cuatrocientos"
      },
      {
        "type": "paragraph",
        "text": "Apreciado hermano Lugardo: A lo largo de la historia tanto el hombre justo como la verdad que él proclama han sido objeto de persecución. El primer acontecimiento dentro de la primera familia humana fue el asesinato del justo Abel a manos de su hermano Caín. Y Dios nos explica que el motivo de haberlo matado fue porque las acciones de su hermano eran justas."
      },
      {
        "type": "scripture",
        "reference": "1 Juan 3:12-13",
        "version": "RV1865",
        "text": "No como Caín, que era del maligno, y mató a su hermano. ¿Y por qué causa le mató? Porque sus obras eran malas, y las de su hermano eran justas. Hermanos míos, no os maravilléis si el mundo os aborrece."
      },
      {
        "type": "paragraph",
        "text": "¡Semejante motivo de ser asesinado, porque sus acciones eran justas!. Lo cual apunta y señala, por supuesto, a que un día aquel Santo y Justo, aquel Hijo de Dios enviado del cielo, sería asesinado a manos de los incrédulos y perversos."
      },
      {
        "type": "paragraph",
        "text": "Este cuadro se ha repetido innumerables veces en la historia del hombre. Uno de aquellos acontecimientos en donde la verdad y el hombre que proclama la verdad son perseguidos, se ubica en tiempos de apostasía. Acab fue uno de los más perversos reyes que tuvo Israel, y Josafat rey de Judá, un hombre temeroso de Dios, se junta con él para batallar contra los sirios."
      },
      {
        "type": "paragraph",
        "text": "Como era siempre necesario, Acab rey de Israel consulta (o pretende consultar) a Dios por medio de los profetas. Entonces cuatrocientos profetas le anuncian que Dios ha respondido positivamente, y que saldrá victorioso. Pero Josafat, sospechando de aquello, pregunta si hay todavía otro profeta a quién consultar."
      },
      {
        "type": "scripture",
        "reference": "2 Crónicas 18:5-7",
        "version": "RV1865",
        "text": "Y el rey de Israel juntó cuatrocientos varones profetas, y díjoles: ¿Iremos a la guerra contra Ramot de Galaad, o reposarnos hemos? Y ellos dijeron: Sube; que Dios los entregará en mano del rey. Y Josafat dijo: ¿Hay aún aquí algún profeta de Jehová, para que por él preguntemos? Y el rey de Israel respondió a Josafat: Aún hay aquí un hombre por el cual podemos preguntar a Jehová: mas yo le aborrezco, porque nunca me profetiza cosa buena, sino toda su vida por mal: este es Miqueas, hijo de Jemla. Y respondió Josafat: No hable el rey así."
      },
      {
        "type": "paragraph",
        "text": "(Hermano Lugardo, nos damos el tiempo de analizar esta historia porque tiene que ver directamente con nosotros y con nuestro tiempo)."
      },
      {
        "type": "paragraph",
        "text": "Entonces Miqueas, el profeta de quien Acab dice nunca me profetiza cosa buena es traído a la presencia del rey, y efectivamente, le dice la verdad pero la verdad de Dios es menospreciada y Acab prefiere seguir el engaño de los otros cuatrocientos. Su orgullo le lleva a desembocar en la muerte tal como Miqueas, el solitario profeta, de parte de Dios se lo había anunciado."
      },
      {
        "type": "scripture",
        "reference": "2 Crónicas 18:14-22, 25-27",
        "version": "RV1865",
        "text": "Y el rey le dijo: Miqueas, ¿iremos a pelear contra Ramot de Galaad, o dejarlo hemos? Y él respondió: Subid; que seréis prosperados; que serán entregados en vuestras manos. Y el rey le dijo: ¿Hasta cuántas veces te conjuraré por el nombre de Jehová, que no me hables sino la verdad? Entonces él dijo: Yo he visto a todo Israel derramado por los montes, como ovejas sin pastor: y dijo Jehová: Estos no tienen señor: vuélvase cada uno en paz a su casa.\n\nY el rey de Israel dijo a Josafat: ¿No te había yo dicho, que este no me profetizará bien, sino mal? Entonces él dijo: Oíd pues palabra de Jehová: Yo he visto a Jehová asentado en su trono, y todo el ejército de los cielos estaba a su mano derecha y a su mano izquierda. Y Jehová dijo: ¿Quién inducirá a Acab rey de Israel, para que suba, y caiga en Ramot de Galaad? Y este decía así, y el otro decía así. Mas salió un espíritu, que se puso delante de Jehová, y dijo: Yo le induciré. Y Jehová le dijo: ¿De qué manera? Y él dijo: Saldré; y seré espíritu de mentira en la boca de todos sus profetas. Y Jehová dijo: Induce, y también prevalece: sal, y hazlo así. Y, he aquí, ahora Jehová ha puesto espíritu de mentira en la boca de estos tus profetas: mas Jehová ha hablado contra ti mal. (...)\n\nEntonces el rey de Israel dijo: Tomad a Miqueas, y volvedle a Amón el gobernador de la ciudad, y a Joas, hijo del rey; Y diréis: El rey ha dicho así: Poned a este en la cárcel, hacedle comer pan de aflicción, y agua de angustia, hasta que yo vuelva en paz. Y Miqueas dijo: Si volviendo volvieres en paz, Jehová no ha hablado por mí. Y dijo también: Oíd esto todos los pueblos."
      },
      {
        "type": "paragraph",
        "text": "En ese mismo día el rey Acab murió en la batalla e Israel fue derrotado."
      },
      {
        "type": "paragraph",
        "text": "Cuatrocientos profetas lo estaban engañando y uno solo de parte de Dios anunciaba la verdad. El anuncio del profeta se cumplió, por supuesto, pero él fue metido en la cárcel con pan de aflicción, y agua de angustia."
      },
      {
        "type": "paragraph",
        "text": "¿No le parece bastante familiar, bastante parecido este acontecimiento, hermano Lugardo, con lo que atravesamos el día de hoy?"
      },
      {
        "type": "paragraph",
        "text": "Mientras todos los demás grupos e Iglesias cristianas, empezando por los “eruditos bíblicos” afirman que todas las versiones de la Biblia en castellano “son buenas” pero “no hay ninguna que sea la única, la verdadera”, nosotros en cambio creemos y proclamamos otra cosa: que Dios se ha manifestado a los muchos millones de personas que en el mundo hablan español, exclusivamente por medio de una versión: aquella que había sido primero publicada en 1569 por Casiodoro de Reina, después perfeccionada por Cipriano de Valera en 1602, y por último la revisión de la cual el principal participante fue Ángel Herreros de Mora en 1865."
      },
      {
        "type": "paragraph",
        "text": "Somos uno contra cuatrocientos."
      },
      {
        "type": "paragraph",
        "text": "Y nos agrada que nos llamen CREYENTES DE LA BIBLIA, porque creemos en ella. Creemos que Dios nos ha hablado en castellano de manera perfecta e infalible por medio de la Biblia de 1865."
      },
      {
        "type": "paragraph",
        "text": "Además mientras TODOS los demás grupos y denominaciones cristianas, todos los señores de la erudición bíblica, creen que ninguna traducción es perfecta y que solamente “los manuscritos originales” fueron inspirados por Dios y por lo tanto fueron divinos e infalibles, nosotros creemos y afirmamos algo muy diferente: que en la Biblia 1865 CADA PALABRA que se encuentra escrita en ella en idioma español es divina, es la respiración de Dios y por tanto la vida de Dios, y al ser divina es perfecta e infalible."
      },
      {
        "type": "paragraph",
        "text": "También sabemos que Dios ha hecho lo mismo en muchos idiomas del mundo, esto es, hablar sus palabras exactas, perfectas e infalibles en el idioma traducido y no solamente en el hebreo y el griego, los originales de la Biblia. Pero por supuesto ¡No se refiere esto a la multitud de versiones modernas!. Dios siempre ha tenido UN SOLO TESTIMONIO DE SU VERDAD; UNA SOLA BIBLIA. En el caso del idioma inglés de manera incontrovertible la única Biblia que lleva el sello de Dios porque su origen es divino, viene a ser la que se conoce como la King James Bible, la que fue publicada por primera vez en 1611."
      }
    ],
  },
  {
    slug: "primera-evidencia-la-epoca",
    number: 2,
    title: "Primera evidencia: la época",
    summary: "Examina la época actual: el declive del cristianismo y el rechazo de la palabra de Dios en los países desarrollados, y la relación de ese panorama con lo que la Biblia anticipa.",
    readingTimeMinutes: 10,
    content: [],
    blocks: [
      {
        "type": "paragraph",
        "text": "La evidencia de la época proviene de la misma Biblia pero también puede ser sustentada en los hechos históricos sin ninguna dificultad, ya que es algo bastante evidente."
      },
      {
        "type": "paragraph",
        "text": "Nadie puede negar que la época nuestra es de terrible declinación en cuanto al cristianismo. Quedaron muy atrás en los siglos anteriores los grandes avivamientos cristianos: George Whitefield, Jonathan Edwards, John Wesley, Dwight Moody y otros. En el tiempo presente no hay ningún avivamiento espiritual porque nadie tiene hambre de la palabra de Dios."
      },
      {
        "type": "paragraph",
        "text": "En los países ricos y desarrollados el rechazo de todo lo que tenga que ver con Dios y con su palabra va aumentando a pasos agigantados. Europa se ha convertido en “la tumba del evangelio”. La generación joven del tiempo de hoy es absolutamente incrédula en cuanto a Dios. La fuerte declinación en la asistencia de las Iglesias es un índice bastante real del alejamiento de esta generación en cuanto a las cosas divinas."
      },
      {
        "type": "paragraph",
        "text": "El Señor Jesús ya lo había anunciado, en el tiempo final vendría la apostasía de la última generación:"
      },
      {
        "type": "scripture",
        "reference": "Lucas 18:8",
        "version": "RV1865",
        "text": "Empero el Hijo del hombre, cuando viniere, ¿hallará fe en la tierra?"
      },
      {
        "type": "paragraph",
        "text": "La palabra de Dios señala con claridad que han existido siete etapas en la historia de la Iglesia a lo largo de dos mil años, y esa secuencia profética la encontramos en los capítulos 2 y 3 del libro de Revelación (Apocalipsis)."
      },
      {
        "type": "paragraph",
        "text": "Es algo muy conocido que las Escrituras proféticas como el libro de Revelación tienen frecuentemente una doble referencia; una referencia cercana y otra lejana. Son cartas para siete Iglesias locales de la región de Asia, que existían en el primer siglo cuando el Apóstol Juan escribió. Pero la segunda referencia es lejana y es profética (como todo el libro de Apocalipsis) y se refiere al transcurso de siete épocas en la historia de la Iglesia cristiana hasta llegar al momento de la venida del Señor."
      },
      {
        "type": "paragraph",
        "text": "El mensaje, pues, para la última etapa histórica de la Iglesia, llamada Laodicea (el tiempo actual) es de una fuertísima reprensión de Dios contra ella. Veamos la primera parte de este mensaje:"
      },
      {
        "type": "scripture",
        "reference": "Revelación 3:14-16",
        "version": "RV1865",
        "text": "Y escribe al ángel de la iglesia de los Laodicenses: Estas cosas dice el Amén, el testigo fiel y verdadero, el principio de la creación de Dios: Yo conozco tus obras: que ni eres frío, ni caliente. Ojalá fueses frío, o hirviente; Mas porque eres tibio, y no frío ni hirviente, yo te vomitaré de mi boca."
      },
      {
        "type": "paragraph",
        "text": "Se puede trazar el inicio de la etapa histórica de Laodicea en el año 1881. Fue allí cuando salió publicado un Nuevo Testamento en griego compilado por dos autores apellidados Westcott y Hort. La intención de publicarlo era reemplazar el texto fiel y exacto del Nuevo Testamento, llamado el Textus Receptus (Texto Recibido) y que había salido a la imprenta desde 1516, con un texto griego bastante adulterado, el de Westcott y Hort, que tenía como base los manuscritos Alejandrinos que de por sí están llenos de cambios y corrupciones en el texto."
      },
      {
        "type": "paragraph",
        "text": "A partir de la publicación del Nuevo Testamento griego adulterado de Westcott y Hort en 1881, todo el campo de los traductores bíblicos se volcó a favor de ellos y dejó de lado la fidelidad del Textus Receptus. Sucedió exactamente como estaba predicho en 2 Timoteo 4:3-4:"
      },
      {
        "type": "scripture",
        "reference": "2 Timoteo 4:3-4",
        "version": "RV1865",
        "text": "Porque vendrá tiempo cuando no sufrirán la sana doctrina, antes teniendo comezón en las orejas, se amontonarán maestros que les hablen conforme a sus mismas concupiscencias. Y así apartarán de la verdad el oído, y se volverán a las fábulas."
      },
      {
        "type": "paragraph",
        "text": "De manera que una característica principal de Laodicea, la Iglesia de nuestro tiempo (comenzando en 1881) es su TIBIEZA ESPIRITUAL. Así está diagnosticada por el Señor, quien prueba su sabor espiritual y le sabe tan desagradable que la vomita de su boca."
      },
      {
        "type": "paragraph",
        "text": "Uno de los aspectos en donde se puede notar claramente la tibieza espiritual del cristianismo de nuestro tiempo es en el aspecto de la música, de la alabanza a Dios. Todo el campo evangélico se ha desviado hacia una música complaciente, acomodada al mundo, desprovista del poder transformador del Espíritu Santo."
      },
      {
        "type": "paragraph",
        "text": "Veamos la diferencia en lo que expresa la letra de un canto típico del estilo actual, comparado con la letra de los himnos antiguos. Transcribimos a continuación lo que se canta un domingo en la Iglesia Camino de Vida, una Iglesia evangélica en una de sus sedes en Lima, con grandes números de asistencia. El ambiente del salón permanece oscuro (¿por qué oscuro?) y hay luces tenues adelante en el estrado en donde un grupo de músicos y cantantes interpretan la siguiente alabanza:"
      },
      {
        "type": "paragraph",
        "text": "Bendice, alma mía, a Jehová,\nEres más de lo que puedo ver,\nMucho más que algo que comprender,\nEsta vida yo la vivo en fe, no pararé.\n\nEres fiel con cada amanecer,\nSigues siendo el mismo que ayer,\nEsta vida yo la vivo en fe,\nNo pararé, yo seguiré.\n\nAnclado estoy, mi esperanza en ti está,\nMe aferro a ti en la tempestad,\nEn tu amor ya no existe más temor,\nEn todo, Dios, confiaré en ti.\n\nTu promesa, esperanza al mundo da,\nLo entregaste todo por la humanidad,\nMi esperanza anclada en ti está,\nMi Dios, tú nunca cambiarás.",
        "variant": "lyrics"
      },
      {
        "type": "paragraph",
        "text": "No sé si usted hermano Lugardo se da cuenta pero la expresión espiritual de estas estrofas es vaga, es “diluída”, nunca expresa con claridad ni con firmeza las verdades acerca de Dios. Eso es algo típico de los cantos actuales. Todos lo hemos cantado muchas veces. Este himno es representativo del repertorio que usamos en la alabanza a Dios los días domingos. El autor y compositor fue Robert Harkness y el himno proviene de hace más de 100 años:"
      },
      {
        "type": "paragraph",
        "text": "Crucificado por mí fue Jesús,\nDe tal manera me amó;\nSin murmurar fue llevado a la cruz,\nDe tal manera me amó.\n\nDe tal manera me amó,\nDe tal manera me amó;\nCristo en la cruz del Calvario murió,\nDe tal manera me amó.\n\nEl inocente Cordero de Dios,\nDe tal manera me amó\nQue por salvarme sufrió muerte atroz,\nDe tal manera me amó.\n\nEn mi lugar padeció aflicción,\nDe tal manera me amó;\nYa consumó mi eternal salvación,\nDe tal manera me amó.",
        "variant": "lyrics"
      },
      {
        "type": "paragraph",
        "text": "Y claro, la diferencia no es solamente en la letra sino además en el estilo musical. Muchos de los himnos antiguos llevan un ritmo similar al ritmo de marcha, lo cual permite que la congregación los entone al unísono. Y la línea melódica también es altamente expresiva de nuestro reconocimiento de Dios como el único soberano, el único que merece gloria y honra y obediencia. Una sola persona puede dirigir el canto y es muy destacable que se trata de un solo canto entonado por toda la audiencia."
      },
      {
        "type": "paragraph",
        "text": "Pero el estilo de la música cristiana contemporánea es deplorable. Personalmente yo no puedo ocultar el desagrado que me produce ver el salón de la Iglesia a oscuras mientras en la parte delantera un grupo de músicos entonan una alabanza que en lugar de tocar profundamente el corazón para rendir nuestra voluntad al Señor, parece más bien ARRULLAR el alma y eso concuerda con la tibieza de la expresión de la letra del canto. En el otro extremo está la locura de los ritmos carnales del mundo usados en el culto y que se pretende aplicar como si fuera alabanza cristiana, mientras muchos de los presentes “danzan” y resuena a gran volumen una música estridente y escandalosa."
      },
      {
        "type": "paragraph",
        "text": "Pero volviendo al asunto que nos ocupa que es en esto la misma tibieza de los cristianos de Laodicea. Se le ha restado valor a la palabra de Dios de tal manera de afirmar que “NINGUNA BIBLIA ES LA VERDADERA”. Escuchémoslo en las propias palabras de Alfredo Tepox Varela, Traductor y Consultor de Sociedades Bíblicas y quien fue parte del Equipo de elaboración de varias de las versiones contemporáneas:"
      },
      {
        "type": "paragraph",
        "text": "“Ante esta miríada de versiones de la Biblia, no faltará quien se pregunte: «Si es verdad que la Biblia es la Palabra de Dios, ¿cuál de todas estas versiones es esa Palabra?» La respuesta puede parecer desconcertante: todas ellas en conjunto, y ninguna de ellas en particular. «Pero ¿cómo puede ser eso posible?», objetará alguien más. Y la respuesta es que debemos entender que cuando confesamos que la Biblia es la Palabra de Dios, no estamos limitando el sentido de «palabra» a la simple unidad fónica o léxica, hablada o escrita. De ninguna manera. La «palabra», en relación con Dios, aunque humana, es también divina; y aunque divina, es también humana. Y la Biblia, como Palabra de Dios, es algo más, mucho más, que una etiqueta pegada a un objeto.”",
        "variant": "quote"
      },
      {
        "type": "paragraph",
        "text": "Notemos que el autor afirma aquí dos cosas que contradicen el testimonio de la Biblia acerca de las palabras que están escritas en ella:\n\n1. Ante la pregunta de cuál de las muchas versiones en castellano es la verdadera palabra de Dios, responde que ninguna de ellas. (Aunque diga que todas ellas lo son, sigue afirmando que ninguna lo es).\n\n2. Notemos que en ningún momento el autor se refiere a las palabras individuales. Solamente menciona “palabra” para referirse a la Biblia como un todo, o sea la Biblia completa. Esto es típico de los eruditos modernos, quienes NUNCA PUEDEN CONFESAR QUE CADA PALABRA ESCRITA EN ELLA ES DIVINA. ¡NO LO CREEN!."
      },
      {
        "type": "paragraph",
        "text": "Continuemos con el mensaje del Señor a Laodicea:"
      },
      {
        "type": "scripture",
        "reference": "Revelación 3:17-19",
        "version": "RV1865",
        "text": "Porque tú dices: Yo soy rico, y soy enriquecido, y no tengo necesidad de ninguna cosa; y no conoces que tú eres cuitado, y miserable, y pobre, y ciego, y desnudo. Yo te aconsejo que de mí compres oro afinado en el fuego, para que seas hecho rico; y vestiduras blancas, para que seas vestido, y que la vergüenza de tu desnudez no se descubra; y unge tus ojos con colirio, para que veas. Yo reprendo y castigo a todos los que amo: sé pues zeloso, y arrepiéntete."
      },
      {
        "type": "paragraph",
        "text": "Entendemos aquí por supuesto que Dios no se está refiriendo a riquezas materiales ni a la miseria por falta de dinero. Pero una de las cosas que es objeto de “satisfacción”, digamos, (entre los que promueven las muchas versiones de la Biblia) es su idea de que la gran cantidad de diferentes versiones enriquece el entendimiento de la palabra de Dios."
      },
      {
        "type": "paragraph",
        "text": "Vamos a plantear un cuadro imaginario pero que nos va a servir mucho para entender el error de aquel planteamiento."
      },
      {
        "type": "paragraph",
        "text": "Si nosotros viviéramos en el tiempo del primer siglo y tuviéramos uno de los libros del Nuevo Testamento en su manuscrito original, por ejemplo el libro de Romanos, ¿Nos atreveríamos a crear diferentes versiones del libro de Romanos en idioma griego? Pues con toda seguridad eso sería considerado una profanación a las palabras de Dios, sería considerado un terrible pecado, el de QUERER CAMBIAR las palabras originales que Dios pronunció. Nadie se hubiera atrevido a hacerlo, a producir una versión diferente del libro de Romanos."
      },
      {
        "type": "paragraph",
        "text": "¿Entonces por qué en castellano (o en francés, o en italiano, o en cualquier idioma) se producen con gran celebración muchas versiones diferentes de la Biblia?"
      },
      {
        "type": "paragraph",
        "text": "La razón es, supuestamente, porque ninguna traducción es perfecta, entonces pueden existir diferentes traducciones (versiones) sin que ninguna de ellas llegue a traducir con cien por ciento de exactitud el significado original del griego o del hebreo al idioma castellano."
      },
      {
        "type": "paragraph",
        "text": "¡De ahí entonces el concepto que acabamos de mencionar, el expresado por Alfredo Tepox Varela, de que ninguna de todas las versiones de la Biblia es la verdadera palabra de Dios!."
      },
      {
        "type": "paragraph",
        "text": "Los eruditos de la época de Laodicea (Desde 1881 hasta el día de hoy) que traducen la Biblia produciendo muchas versiones diferentes, consideran que están produciendo mucha riqueza espiritual al hacerlo. Pero Dios califica al cristianismo de nuestra época como cuitado, (desdichado, en desgracia) y miserable, y pobre, y ciego, y desnudo."
      },
      {
        "type": "paragraph",
        "text": "No solamente está en la miseria espiritual, dice el Señor; también está en la CEGUERA espiritual."
      },
      {
        "type": "paragraph",
        "text": "Su ceguera significa que los señores eruditos bíblicos de nuestra época (y junto con ellos los creyentes que los siguen) perdieron completamente la capacidad de discernimiento en cuanto a la Biblia. No saben discernir que la Biblia, aun traducida, puede ser la palabra infalible de Dios. Son tan ciegos que enseñan que SOLAMENTE los manuscritos originales -que ya no existen desde hace muchos siglos- fueron las palabras perfectas de Dios."
      },
      {
        "type": "paragraph",
        "text": "Tenemos por ejemplo lo que afirma Calvin George, Misionero y autor de varios libros cristianos, en su libro titulado “La controversia Reina-Valera en el fundamentalismo”:"
      },
      {
        "type": "paragraph",
        "text": "“Enseñé en ese libro tal como sigo creyendo, que todas las traducciones pueden contener error humano (por el hecho de que no se hicieron bajo inspiración divina), pero que yo estaba dispuesto a darle el “beneficio de la duda” a las traducciones confiables que utilizo en inglés y español.”",
        "variant": "quote"
      },
      {
        "type": "paragraph",
        "text": "Observemos que este autor le atribuye a la Biblia en español, en primer lugar que todas las traducciones pueden contener errores, y en segundo lugar que de todas maneras se les puede considerar “confiables”."
      },
      {
        "type": "paragraph",
        "text": "Pues por las mismas palabras del autor sabemos que al llamarle “confiable” a la Biblia en español, le está atribuyendo que no es enteramente pura, tampoco es exacta ni perfecta, puede contener errores. Su enseñanza es la típica posición que adoptan los eruditos de la Biblia en la época de Laodicea. QUE TENEMOS UNA “CASI-BIBLIA” PERO NO TENEMOS LA BIBLIA. He ahí la ceguera de los creyentes del siglo 20 y siglo 21."
      },
      {
        "type": "paragraph",
        "text": "Así que como conclusión el cristianismo de la época de Laodicea, que ha corrido desde 1881 hasta nuestros días, está completamente descalificado para ser instrumento en las manos de Dios a fin de producir una traducción (versión) que haya sido obra del Espíritu Santo. Las propias palabras que pronuncian los eruditos de nuestra época los muestran como son."
      },
      {
        "type": "paragraph",
        "text": "DIOS YA SE ENCARGÓ ÉL MISMO DE ENTREGARNOS EN SU TIEMPO Y A SU PROPIA MANERA Y CON LAS PERSONAS QUE ÉL ESCOGIÓ, LA BIBLIA PERFECTA Y QUE CONTIENE CADA PALABRA INSPIRADA POR EL ESPÍRITU SANTO EN IDIOMA CASTELLANO: LA VERSIÓN DE REINA Y VALERA REVISADA EN 1865."
      },
      {
        "type": "paragraph",
        "text": "Ahora pasemos a examinar el mensaje del Señor a Filadelfia, la etapa de la historia de la Iglesia anterior a nosotros, que no contiene ninguna reprensión. Al contrario, Filadelfia ES FELICITADA DOS VECES POR HABER GUARDADO LA PALABRA DE DIOS:"
      },
      {
        "type": "scripture",
        "reference": "Revelación 3:7-11",
        "version": "RV1865",
        "text": "Y escribe al ángel de la iglesia que está en Filadelfia: El Santo y Verdadero, el que tiene la llave de David; el que abre, y ninguno cierra; el que cierra, y ninguno abre, dice estas cosas: Yo conozco tus obras: he aquí, te he dado una puerta abierta delante de ti, y ninguno la puede cerrar; porque tú tienes una poquita de potencia, y has guardado mi palabra, y no has negado mi nombre. He aquí, yo doy de la sinagoga de Satanás, los que se dicen ser Judíos, y no lo son, mas mienten: he aquí, yo los constreñiré a que vengan, y adoren delante de tus pies, y sepan que yo te he amado. Porque has guardado la palabra de mi paciencia, yo también te guardaré de la hora de la tentación, que ha de venir sobre todo el universo mundo, para probar los que moran en la tierra. Cata, que yo vengo prestamente: ten lo que tienes, para que ninguno tome tu corona."
      },
      {
        "type": "paragraph",
        "text": "El tiempo histórico de Filadelfia transcurrió aproximadamente desde 1500 hasta cerca del inicio del siglo XX, siendo el año de 1881 más o menos el término de esta etapa como ya hemos indicado."
      },
      {
        "type": "paragraph",
        "text": "Y aunque Filadelfia terminó en 1881, el mismo pasaje bíblico que acabamos de citar nos muestra que un pequeño remanente de Filadelfia ha continuado y seguirá hasta el día del rapto de la Iglesia: Porque has guardado la palabra de mi paciencia, yo también te guardaré de la hora de la tentación, que ha de venir sobre todo el universo mundo, para probar los que moran en la tierra. Refiriéndose estas palabras, sin que haya ninguna duda, a que Dios le librará de la tribulación."
      },
      {
        "type": "paragraph",
        "text": "Fue en la época de Filadelfia cuando se produjo una enorme difusión de la Biblia en el mundo entero por primera vez, a través del uso de la imprenta. Y esto porque se tradujo la palabra de Dios a muchos idiomas del mundo, teniendo como base para el Antiguo Testamento el Texto Masorético en hebreo, y para el Nuevo Testamento el Textus Receptus (Texto Recibido) en idioma griego. Es decir aquel que fue publicado (El Nuevo Testamento en griego) por Erasmo de Rotterdam por primera vez en 1516 aunque hubo subsiguientes ediciones del mismo en los años posteriores."
      },
      {
        "type": "paragraph",
        "text": "Todas las traducciones de la Biblia en la etapa histórica de Filadelfia se produjeron teniendo como base el texto fiel, el que fue preservado por Dios mismo a través de los siglos y que más tarde se conoció como el Textus Receptus, en cuanto al Nuevo Testamento."
      },
      {
        "type": "paragraph",
        "text": "Pero llegando al cambio de época en 1881 con la publicación del texto corrupto del Nuevo Testamento en griego de Westcott y Hort, se cumplió lo que la Biblia ya había anunciado de antemano en cuanto a la peor época de todas, la de Laodicea, cuando el cristianismo se ha desviado en pos de la incredulidad y de la apostasía."
      },
      {
        "type": "paragraph",
        "text": "La etapa histórica de Filadelfia fue también la de los mayores avances mundiales en el campo misionero, y es por eso que el Señor le promete una puerta abierta delante de ti, y ninguno la puede cerrar."
      },
      {
        "type": "paragraph",
        "text": "De manera que es completamente lógico que haya sido en la época de Filadelfia cuando Dios trajo para todos los que hablan español en medio del mundo su palabra fiel y perfecta e infalible, teniendo como instrumentos divinos a los santos hombres que la tradujeron y la revisaron, hombres que ERAN PRODUCTO DE SU ÉPOCA, UNA ÉPOCA DE GRAN FIDELIDAD Y DE ARDIENTE AMOR A LA PALABRA DE DIOS."
      },
      {
        "type": "paragraph",
        "text": "¡Hombres como Casiodoro de Reina y Cipriano de Valera y Ángel Herreros de Mora nunca hubieran surgido en la época apóstata en la cual nos encontramos el día de hoy!"
      },
      {
        "type": "paragraph",
        "text": "Mencionaremos de manera muy breve también que han surgido intentos ACTUALES de producir una traducción fiel y exacta de la palabra de Dios. Este es el caso de la versión que ha sido llamada Reina-Valera-Gómez, y asimismo la que es llamada “Valera 1602 Purificada”."
      },
      {
        "type": "paragraph",
        "text": "A esto debemos explicar que todo intento actual de hacerlo tropieza con el hecho de que DIOS YA SE ENCARGÓ DE LLEVARLO A CABO EN EL TIEMPO INDICADO, A LA MANERA DE DIOS MISMO Y CON LOS INSTRUMENTOS (LAS PERSONAS) QUE EL SEÑOR MISMO ESCOGIÓ."
      },
      {
        "type": "paragraph",
        "text": "Para ilustrar este caso mencionaremos que los escribas del pueblo judío sabían con toda certeza que posteriormente al profeta Malaquías (400 años antes de Cristo) no había venido NINGUNA revelación proveniente de Dios. Es por eso que ellos rechazaron tajantemente que los libros llamados “apócrifos” (que eran posteriores a Malaquías) fuesen considerados como Escritura divina."
      },
      {
        "type": "paragraph",
        "text": "Aunque no sea el mismo caso pero hay una semejanza en cuanto a la Biblia en español. Debemos recordar que Dios trazó senderos antiguos que no deben ser traspasados:"
      },
      {
        "type": "scripture",
        "reference": "Proverbios 22:28; 23:10",
        "version": "RV1865",
        "text": "No traspases el término antiguo que hicieron tus padres.\n\nNo traspases el término antiguo, ni entres en la heredad de los huérfanos."
      },
      {
        "type": "paragraph",
        "text": "No hemos de tratar de corregir lo que Dios ya estableció."
      }
    ],
  },
  {
    slug: "segunda-evidencia-los-hombres",
    number: 3,
    title: "Segunda evidencia: los hombres de la Biblia en castellano",
    summary: "Usa la analogía de contratar a un constructor para examinar la competencia y la confiabilidad de los hombres que transmitieron la Biblia en castellano.",
    readingTimeMinutes: 23,
    content: [
      "Hermano Lugardo, estoy seguro que usted comprenderá perfectamente la siguiente analogía. Que cuando buscamos a alguien por ejemplo para que construya nuestra casa, queremos saber quién es la persona o personas que se ofrecen para construirla. Las siguientes preguntas serán indispensables:",
      "1. ¿Cuánto tiempo de experiencia tiene en el área de construcción civil?",
      "2. ¿Hay trabajos previos que él haya hecho, que yo pueda verificar que son de muy buena reputación?",
      "3. ¿Su presupuesto es razonable o es muy bajo o es muy alto?",
      "4. ¿Hay alguien de mucha confianza que yo conozco y que me pueda recomendar a esta persona?",
      "5. ¿Qué impresión tengo yo (mi opinión personal) sobre él? ¿Me inspira confianza o me deja un poco de dudas?",
      "Las mismas interrogantes se plantean en cuanto a los traductores que recibieron esa tarea de la mano de Dios, la de poner la Biblia en el idioma de los que hablan español en medio del mundo.",
      "Hay algunas cosas sumamente importantes que comparten las tres personas principales que Dios escogió para entregarnos su palabra en castellano (Casiodoro de Reina, Cipriano de Valera y Ángel Herreros de Mora): 14",
      "1. Todos pertenecían a la época espiritual de Filadelfia.",
      "2. Todos eran españoles.",
      "3. Todos habían sido monjes o religiosos dentro del catolicismo pero se habían convertido a Cristo. Los dos primeros, Reina y Valera, llegaron",
      "14 Estas características son mencionadas (y damos el crédito) por el Profesor Enrique Chi en el Curso “Historia de la Biblia y de la Iglesia” en 1997, de la Escuela Pastoral de Kansas City Baptist Temple en Kansas City, Missouri, USA. (Hoy conocida como Graceway Church).",
      "a conocer el evangelio por medio de los escritos de Erasmo de Rotterdam.",
      "4. Todos eran verdaderos eruditos, entendiendo esto en el sentido de ser hombres temerosos de Dios y al mismo tiempo con mucho conocimiento bíblico. Los dos primeros dominaban los idiomas bíblicos y también el idioma latín.",
      "5. Todos fueron perseguidos y estuvieron cerca de morir en manos de la Inquisición española.",
      "6. Todos tuvieron que huir de España y la Biblia fue publicada siempre fuera de España. La “Biblia del Oso”, la de 1569, se publicó en Basilea en Suiza; la “Biblia del Cántaro”, la de 1602, en Amsterdam en los Países Bajos; y la última revisión, la de 1865, fue publicada por la Sociedad Bíblica Americana de Nueva York en los Estados Unidos.",
      "7. Todos tuvieron como objetivo hacer llegar las Escrituras al vasto campo de los hispanohablantes a pesar de la feroz persecución.",
      "Así que hay mucha semejanza entre aquellos tres varones de Dios que fueron instrumento divino para que recibamos la Biblia en español.",
      "El requisito de que amaran la palabra de Dios hasta el punto de estar al filo de la muerte por causa de ella, es algo que los eruditos y traductores del tiempo de ahora no podrían cumplir ni de lejos.",
      "Casiodoro de Reina nació alrededor de 1520. Él y Cipriano de Valera habían sido frailes jerónimos en el monasterio de San Isidoro del Campo en Sevilla. Citamos a continuación (traducido) un fragmento del libro “The Spanish Fountain: A History and Review of the Reina-Valera Version” por Thomas Holland:",
      "El prior del monasterio era el Dr. Blanco Garcia Arias, quien había sido influenciado por la Antigua Biblia Latina de los Valdenses y su predicación, la cual había infiltrado la mano de hierro de Roma dentro de España. Arias se convirtió en creyente y comenzó a leer a sus estudiantes los escritos de los Reformadores. Reina escuchaba con mucho ahínco las enseñanzas de los Reformadores y se llegó a convertir. En este punto de su vida inició la proclamación pública del tema de la Reforma “La justificación por la fe”. Y es innecesario decir que esto no le cayó nada bien a la Iglesia Católica Romana. Vino la persecución y Reina huyó de su tierra natal para nunca volver. 15",
      "Al ser advertidos de que la Inquisición planeaba capturarlos, en 1557 un grupo de monjes, entre ellos Casiodoro de Reina y Cipriano de Valera, huyeron en distintas direcciones hacia ciudades de Europa en donde pudieran salvar la vida.",
      "Casiodoro de Reina completó la traducción de la Biblia en un total de doce años, y lo hizo huyendo de una ciudad a otra en Europa porque la Inquisición le seguía los pasos para llevarlo a la hoguera. El 28 de Abril de 1562, al no poder capturarlo, el tribunal de la Inquisición quemó su efigie en un acto público en Sevilla.",
      "Este valeroso hombre de Dios sufrió tremendas penurias pero nunca se rindió en su tarea de completar la traducción de la Biblia al español. Entre otras cosas fue calumniado, acusado de pecados que eran inexistentes, porque no encontraban otra forma de alcanzarlo.",
      "Leemos una parte del propio testimonio de Casiodoro en su introducción a la Biblia de 1569:",
      "“(...) el dolor de la falta que la Iglesia padecia en esta parte, nos puso el animo que nunca nos pusiera la sola consideracion de nuestras fuerzas, ansi para comenzarla, como para llegarla a este punto: y ninguna dubda tenemos de que nuestro trabajo no aya sido agradable a Dios, por la continua assistencia de su favor con que avemos podido llevar una carga tan pesada, tan estorvada de Satanas, tan poco ayudada de Hermanos, y por tantos dias. La obra nos ha durado entre las manos enteros doze años. Sacado el tiempo que nos han llevado o enfermedades, o viajes, o otras occupaciones necessarias en nuestro destierro y pobreza, podemos affirmar, que han sido bien los nueve, que no hemos soltado la pluma de la mano, ni affloxado el estudio en quanto las fuerzas ansi del cuerpo como del animo nos han alcanzado. Parte de tan luenga tardanza ha sido la falta de nuestra erudicion para tan grande obra, lo qual ha sido menester recompensar con casi doblado trabajo: parte tambien ha sido la estima que Dios nos ha dado",
      "15 Tomado del URL http://www.biblebelievers.com/Holland2.html de la misma obra, y el zelo de tratarla con toda limpieza, con la qual obligacion có ninguna erudita ni luenga diligencia se puede asaz satisffazer.”",
      "Hay un abismo de diferencia entre Casiodoro de Reina -su ardiente amor por el Señor y por su palabra, su extremo cuidado al tomar la tarea de traducir las palabras divinas, su sacrificio en muchos obstáculos, su entrega a la tarea que Dios le dio- y las alegres afirmaciones de los eruditos y traductores actuales de la Biblia.",
      "Haremos una comparación entre las cosas que dice Casiodoro (notando su temor y temblor al tratar con las palabras de Dios) y aquellas que audazmente habla un erudito actual sobre el mismo tema. Se trata de la traducción del nombre de Dios en el Antiguo Testamento, mencionada por Casiodoro en su introducción:",
      "“Avemos retenido el nóbre (Iehova) no sin gravisimas causas. Primeramente porque donde quiera que se hallará en nuestra version, esta en el texto Hebreo, y nos parecio que no lo podiamos dexar, ni mudar en otro sin infidelidad y sacrilegio singular cótra la Ley de Dios, en la qual se máda que no se le quite, ni se le añada.”",
      "Sobre esta declaración y sobre la manera cómo Casiodoro tradujo el nombre “Jehová” se manifiesta Alfredo Tepox Varela, traductor de varias versiones modernas, teniendo en poco no solo a Casiodoro de Reina sino también a Cipriano de Valera:",
      "(...) “Y entonces se ve que la intención nunca fue que se leyeran las vocales, sino más bien que esas vocales fueran evocativas de otra palabra que sí pudieran pronunciar. Aquí tenemos e, o, a. Esta es una e como la e francesa, pero es una e. Entonces tenemos e, o. Vienen los traductores Casiodoro de Reina y Valera, que por cierto en su prefacio defienden el hecho de haber transliterado Jehová. Se defienden ellos. ¿Y qué hacen ellos? ¿Ven esto? Esta es Y, esta es H, esta es V y esta es H. La vocalizan, dicen “Ah, pues esta es e, esta es o, esta es a, sale Jehovah”. Por el cambio lingüístico que ha habido en nuestra lengua, la Y llega a ser J. Y tenemos entonces ya Jehovah con la h final y al final de cuentas tenemos Jehová ya sin la h final.",
      "Entonces eso nos ha llevado a pensar que este es el nombre de Dios y tengo que decirlo, no es el nombre de Dios. Pueden seguir usando, podemos seguir hablando de Jehová porque es una forma tan legítima como cualquier otra, pero no es el nombre de Dios. La intención de ellos era que si veían e, o, a, pensaran en una palabra que pudieran pronunciar y una podría ser El Olam y El Olam quiere decir Dios eterno.” 16",
      "Los señores de la ciencia bíblica actual jamás están dispuestos a reconocer que CADA PALABRA escrita en la Biblia es divina, es perfecta, es infalible. Por eso es que a propósito eluden mencionar LAS PALABRAS, solamente dicen la palabra (la Biblia como un todo). En otra Conferencia del mismo autor le escuchamos decir lo siguiente:",
      "(...) pero bueno, lo curioso es que el Señor nos habla en su palabra -en su palabra y no en las palabras que están allí- hay una diferencia, sin embargo entramos aquí al tema de revisión… 17",
      "(El subrayado es mío).",
      "Fíjese con cuidado hermano Lugardo lo que este biblista moderno está afirmando: que Dios nos habla en su palabra (la Biblia entera) pero ¡NO NOS HABLA EN LAS PALABRAS QUE ESTÁN ALLÍ!!!",
      "Nunca son capaces de confesar (reconocer) el hecho de que Dios nos habla en CADA PALABRA de la Biblia, mientras el Espíritu Santo testifica algo totalmente diferente a lo que enseñan ellos!!!:",
      "Ahora han ya conocido que todas las cosas que me diste, son de ti. Porque las palabras que me diste, les he dado; y ellos las recibieron, y han conocido verdaderamente que salí de ti, y han creído que tú me enviaste. 18",
      "El cual tendrá consigo, y leerá en él todos los días de su vida, para que aprenda a temer a Jehová su Dios, para guardar todas",
      "16 Grabación en youtube, con el siguiente URL: https://www.youtube.com/watch?v=uccam0guldw. Corresponde a una Conferencia por Alfredo Tepox Varela en Santiago de Chile el 23 de Julio de 2015. 17 Transcrito de la Conferencia por el Dr. Alfredo Tepox el 2 de Agosto del 2019 en el auditorio de la Sociedad Bíblica de México. URL: https://www.youtube.com/watch?v=ClZoIppHsiU 18 Juan 17:7-8 las palabras de aquesta ley, y estos estatutos para hacerlos; 19",
      "Maldito el que no confirmare las palabras de esta ley para hacerlas. Y dirá todo el pueblo: Amén. 20",
      "Y, he aquí que yo entro hoy por el camino de toda la tierra; sabed pues con todo vuestro corazón, y con toda vuestra alma, que no se ha perdido una palabra de todas las palabras buenas que Jehová vuestro Dios ha dicho de vosotros: todas os han venido, no se ha perdido de ellas ni una. 21",
      "Las palabras de Jehová, palabras limpias: plata refinada en horno de tierra: colada siete veces. 22",
      "Resulta, pues, que con toda su ciencia los señores eruditos del día de hoy desconocen la Escritura al desconocer (o negar, en realidad) el poder divino de CADA PALABRA que hay en ella.",
      "Se repite la condición espiritual de los escribas a quienes el Señor reprendió:",
      "Entonces respondiendo Jesús, les dijo: Erráis, ignorando las escrituras, y el poder de Dios. 23",
      "Ahora pasemos a hablar de la siguiente persona que Dios escogió para la magna tarea de la Biblia en español, quien fue Cipriano de Valera. Después de huir de Sevilla junto con Casiodoro de Reina, en 1588 publicó un libro sobre los engaños del catolicismo, especialmente en los asuntos del papado y de la misa. También publicó otros libros de similar estilo. Como resultado su efigie fue quemada en 1562, junto con la de Casiodoro, y los libros de Cipriano de Valera fueron colocados en el index de libros prohibidos por la Inquisición, llamándosele a él “el hereje español”.",
      "Siempre a una persona se le conoce por sus palabras, o sea por lo que él mismo dice. Si examinamos cuidadosamente el prefacio de la revisión de la Biblia de 1602 de Cipriano de Valera llamada “EXHORTACION Al Christiano",
      "19 Deuteronomio 17:19 20 Deuteronomio 27:26",
      "21 Josué 23:14 22 Salmos 12:6",
      "23 Mateo 22:29",
      "Lector…” etc., hallamos cosas muy importantes que él consigna y que nos muestran elocuentemente su manera de ser:",
      "Resta ahora dar cuenta que nos aya movido á hazer esta segunda Edicion. Cassiodoro de Reyna movido de un pio zelo de adelantar la gloria de Dios, y de hazer un señalado servicio á su nacion, en viendo se en tierra de libertad para hablar y tratar de las cosas de Dios, comenzó á darse á la traslación de la Biblia. La cual traduxo; y assi año de 1569 imprimió dos mil y seyscientos exemplares: Los quales por la misericordia de Dios se han repartido por muchas regiones. De tal manera q hoy casi no se hallan exemplares, si alguno los quiere comprar. Paraque pues nuestra nacion Española no careciesse de un tan gran thesoro, como es la Biblia en su lengua, avemos tomado la pena de leer la y releerla una y muchas vezes, y la avemos enriquecido con nuevas notas y aun algunas vezes avemos alterado el texto. Lo qual avemos hecho con maduro consejo y deliberacion: y no fiando nos de nosotros mismos (porque nuestra consciencia nos testifica quan pequeño sea nuestro caudal) lo avemos conferido con hombres doctos y pios, y con diversas traslaciones, que por la misericordia de Dios ay en diversas lenguas el dia de hoy. Quanto á lo demas, la version, [Nota: se refiere a la traducción de Reina de 1569] conforme á mi juyzio, y al juyzio de todos los que la entienden, es excelente: y assi la avemos seguido, quanto avemos podido, palabra por palabra. La palabra Por ventura, por saber á Gentilidad la avemos quitado, tambien avemos quitado el nombre Capullo, y en su lugar puesto Prepucio; que es vocablo admitido ya mucho tiempo ha, en la Iglesia Christiana. Tambien avemos quitado todo lo añidido de los 70 interpretes, ó de la vulgata, que no se halla en el texto Hebreo. Lo qual principalmente aconteció en los Proverbios de Salomon. Esto digo, paraque si alguno confiriere esta version con la que llaman vulgata, y no halláre en esta todo lo que ay en aquella, no se maraville. Porque nuestro intento no es trasladar lo que los hombres han añidido á la palabra de Dios, sino lo que Dios ha revelado en sus sanctas Escripturas.",
      "Entendemos por qué Dios se valió de instrumentos humanos como Cipriano de Valera, un hombre que comprendía -al igual que su antecesor Casiodoro de Reina- el valor altísimo de lo que llevaba entre las manos, el poder trabajar con cada palabra de Dios escrita en la Biblia.",
      "En las líneas anteriores Valera muestra algunas modificaciones de ciertas palabras. También quisiera mostrar un ejemplo de otra modificación. En muchos lugares donde aparece “Jesús el Cristo” en la Biblia de 1569, Cipriano de Valera lo simplifica a “Jesu Cristo”. ¿Por qué la modificación?",
      "● Cuando Casiodoro de Reina en 1569 consigna “Jesús el Cristo” eso es correcto porque la palabra “Cristo” no es el nombre del Señor Jesús, es más bien su título como Mesías (en realidad “Cristo” es la misma palabra “Mesías” pero en griego). De manera que decir “El Cristo” era comparable a decir “El Alcalde” o “El Magistrado”, aunque estos son títulos diferentes.",
      "● Cipriano de Valera decidió simplificar la frase, entonces cada vez que en la Biblia de 1569 decía “Jesús el Cristo” ahora en la revisión de 1602 llega a decir “Jesu Cristo”, y así se ha mantenido en la última revisión, la de 1865.",
      "● ¿Fue correcta la modificación? La respuesta es la siguiente: DIOS MISMO LE GUIÓ A REALIZAR ESTA MODIFICACIÓN COMO TAMBIÉN OTRAS QUE VALERA HIZO, ALGUNAS DE LAS CUALES ÉL MENCIONA EN EL PREFACIO QUE ACABAMOS DE CITAR. Este punto acerca de cómo el Espíritu Santo guió a los traductores y a los revisores, lo vamos a explicar en detalle más adelante.",
      "La tercera persona a quien Dios usó como instrumento escogido fue Ángel Herreros de Mora, para la revisión de 1865.",
      "Debemos explicar que al principio Ángel de Mora no fue el único a quien se le diera el encargo de esta revisión. La tarea había sido encomendada por la Sociedad Bíblica Americana a dos personas, y la segunda era Henry Barrington Pratt, Misionero enviado de Estados Unidos a Colombia.",
      "Sin embargo todo indica que la participación de Henry Pratt (cuyo idioma nativo no era el castellano) llegó a ser mínima. Los cuatro años que tomó la revisión, de 1861 a 1865, fueron los mismos cuatro años que duró la guerra civil, aquella guerra interna dentro de Estados Unidos, y Pratt se vio obligado a dejar la tarea tempranamente.",
      "Sabemos esto porque existe un documento en inglés titulado “ABS Historical Essay # 16, IV Text and Translation, 1860-1900” (Ensayo Histórico de la SBA",
      "# 16, IV Texto y Traducción, 1860-1900” cuya autora es Margaret T. Hills, fechado en Enero de 1966. (Las siglas ABS corresponden a “American Bible Society” - “Sociedad Bíblica Americana”). Transcribimos (traducido) un fragmento de las páginas 25 y 26:",
      "“…Temprano en 1860 al Comité de Versiones le fue solicitado otra vez acerca de nuevas y mejoradas Biblias en Español, en conformidad literal con el Hebreo y el Griego. Había la impresión de que existían eruditos Españoles que podrían poner en ropaje moderno la excelente versión de Cypriano de Valera de 1602, así que se recomendó que se tomaran medidas a tal objetivo (V 1.12.1860). En Marzo ellos recomendaron que los servicios del Sr. de Mora, de Madrid, y del Rev. H.B. Pratt de Bogota, trabajando junto con el Sr. Brigham, sean contratados para producir una Biblia en Español, cuya remuneración sería considerada más adelante y que toda modificación del texto u otras, se propone que sean sometidas al Comité de Versiones para su consideración y aprobación. (V 3.19, 9.24).",
      "(...) Los salarios del Sr. Pratt y del Sr. Mora fueron fijados en 1,200 dólares (C 2.22.1861) por año para cada uno. Entonces algunos problemas de la vista y la ruptura de las comunicaciones por la Guerra Civil hicieron necesario que el Sr. Pratt (En Carolina del Norte) se tuviera que retirar.",
      "Este retiro forzoso del Sr. Pratt había causado que el Comité de Versiones considerara por un tiempo dejar de lado el proyecto.”",
      "Sin embargo el proyecto siguió adelante a pesar del retiro temprano de Henry Pratt. Hay indicaciones (las cuales veremos más adelante) de que Pratt volvió a participar pero solo de forma accesoria. La casi totalidad de la tarea de revisión recayó en Ángel de Mora.",
      "De Mora había nacido en Madrid alrededor de 1815 en el seno de una importante familia. Leemos algunos fragmentos de su biografía, gracias a la recopilación de Gabino Fernández Campos:",
      "A los dieciséis años ingresó en los Dominicos de Ocaña (Toledo) y profesó en el Convento de Santo Tomás, de su ciudad natal. Ejerció como coadjutor en la Parroquia madrileña de San Sebastián y fue",
      "Profesor de Moral y Filosofía en el Colegio Hispano, privado, y en Instituciones reconocidas por la Universidad local. 24",
      "Más adelante conoció el evangelio y se convirtió a Cristo, dejando el catolicismo. William H. Rule fue alguien que tuvo mucha influencia en su conversión. En 1854 Mora publicó un libro titulado “La terrible y poderosa secta llamada la Sociedad de Jesús”, en donde desenmascaró valerosamente las muchas intrigas y artimañas de los Jesuitas. Por esa razón la Inquisición católica (que ya había sido abolida en España en 1834, pero pretendía seguir actuando) le puso en la mira y en Agosto de 1856 le capturaron en Madrid golpeándole cruelmente para luego dejarlo preso durante cuatro meses. Con ayuda de hermanos de Inglaterra consiguió escapar y así salvar la vida. 25",
      "Residió en Inglaterra y más adelante en Nueva York en los Estados Unidos y es allí donde participó en la revisión de la Biblia española durante cuatro años, de 1861 a 1865.",
      "Ángel de Mora también ejerció el Pastorado de Iglesias evangélicas durante muchos años y otra de sus obras, publicada en 1869, se titula “La Iglesia de Jesu-Cristo en España” la cual es de carácter histórico.",
      "Estos son solo algunos detalles destacados de la vida de este gran hombre de Dios que fue Ángel Herreros de Mora. Intentó volver a su natal España pero nunca lo consiguió, falleciendo en 1876 mientras era Pastor de la Iglesia Evangélica Española en Lisboa en Portugal. Un hecho muy de notar es que en la congregación que Mora pastoreaba llegaron a ser miembros de ella ocho ex-sacerdotes católicos convertidos al evangelio. 26",
      "Así que estos tres varones de Dios -Casiodoro de Reina, Cipriano de Valera y Ángel de Mora- fueron aquellos instrumentos que Dios usó para darnos su palabra en castellano. Como ya hemos visto, compartieron muchas cosas en común pero la más importante de todas fue que trabajaron con LAS",
      "24 Citado de un artículo de Gabino Fernández Campos en fecha de “Invierno de 2013” de la revista Puerta Abierta, el cual es una reseña biográfica de Ángel Herreros de Mora. Algunos datos biográficos los hemos tomado de esta revista. 25 Referencia del libro “A Narrative by Dn. Angel Herreros de Mora of his imprisonment by the “Tribunal of the Faith” and escape from Spain.” por W. H. Rule, London, 1856. Tomado de la versión digital del libro (Kindle) de Amazon. 26 Datos biográficos que se encuentran en la revista digital con el siguiente URL: https://protestantedigital.com/orbayu/1307/herreros-de-mora-una-vida-vinculada-a-la-iee de fecha 12 de Noviembre de 2012.",
      "PALABRAS DE DIOS en la Biblia conscientes de que tenían en sus manos una tarea divina y no humana.",
      "No podemos terminar esta sección referente a los hombres de la Biblia en español sin haber mencionado a algunos que pertenecen más bien a nuestra época. Uno de ellos fue Jeff McArdle, Misionero entre la gente hispana a quienes amaba con todo su corazón. El hermano Jeff partió al hogar del Padre Celestial de manera repentina en el año 2014 pero su profundo amor por la Biblia 1865 ha quedado como un legado indeleble.",
      "También es necesario mencionar que con la Biblia 1865 sucedió algo semejante a lo que aconteció en los días del rey Josías (2 Reyes 22:3-13) cuando la Biblia había desaparecido completamente de la vida de la nación de Israel, tanto que el mismo rey desconocía de su existencia. Fueron los sacerdotes y levitas quienes la “descubrieron” en los rincones del templo y se la mostraron a un asombradísimo rey Josías.",
      "A pesar de que esta versión había sido la única que tuvo enorme circulación en toda América Latina desde los inicios del campo misionero en nuestros países a partir de 1865 y durante más de 60 años, las Sociedades Bíblicas la dejaron al olvido. Por ejemplo en la versión Reina-Valera revisada de 1960, en la primera página se lee lo siguiente:",
      "“Antigua Versión de Casiodoro de Reina (1569). Revisada por Cipriano de Valera (1602). Otras Revisiones: 1862, 1909 y 1960.”",
      "Allí es mencionada solamente la revisión de 1862 cuyo autor fue Lorenzo Lucena Pedrosa, pero esta se publicó en Europa y no llegó a tener la enorme circulación de la de 1865, esta última auspiciada por la Sociedad Bíblica Americana de Nueva York debido a la gran demanda de Biblias en nuestros países que por primera vez recibían el evangelio desde los años de 1840 aproximadamente.",
      "Fue por esta razón (que la Biblia 1865 no era ni siquiera mencionada) que Jeff McArdle, buscando una Biblia fiel y verdadera que ya hubiera existido en idioma castellano, no tenía ni idea de la existencia de ella.",
      "Así que al igual que en los días de Josías rey de Israel, en las cercanías del año 2,000 nadie sabía que había existido durante más de 60 años una Biblia usada por Dios grandemente para la evangelización de todos los países de habla castellana en el continente americano.",
      "Para muchos Misioneros de Estados Unidos que trabajaban con gente hispanohablante, era una enorme pregunta aquella que también se planteaba Jeff McArdle. ¿Cuál es la Biblia fiel, la de Dios mismo en idioma español? ¿Existió alguna vez esa Biblia?",
      "Y es que tanto él como muchos otros Misioneros sabían a ciencia cierta que las Biblias modernas en castellano a partir de la revisión conocida como la de 1909 (que no se publicó en 1909 sino en 1923) estaban lejos de ser fieles al Textus Receptus y más bien se desviaban basándose en los Textos Alejandrinos. Por lo tanto ninguna de estas podía ser la palabra fiel de Dios en nuestro idioma.",
      "Pero el Hno. Jeff fue el único que comprendió cabalmente la respuesta de Dios. Ninguno como él había anhelado tanto resolver la gran pregunta de la Biblia verdadera en castellano. ¡Durante quince años estuvo pidiendo en oración que Dios se lo mostrara!!!: (1) Que si existía una Biblia en español -la verdadera, la de Dios- que el Señor se la mostrara. (2) Si nunca hubo una Biblia verdadera en castellano, entonces que Dios le diera una solución al problema. 27",
      "La respuesta divina llegó de la manera más inesperada. El hno. Jeff McArdle y algunos otros asistieron, casi por mera casualidad, en 1999 a una Conferencia Misionera en la Iglesia North Avenue Baptist Church en Whitesboro, Texas, del Pastor Ernest Sigrest. En el curso de la Conferencia un Misionero hispano que trabajaba en México tenía un muestrario de varias Biblias antiguas en castellano. Entonces el Hno. Jeff le preguntó directamente: “De todas estas que usted tiene aquí, ¿Cuál es la Biblia fiel y verdadera?” Y el Misionero contestó sin dudar ni un solo segundo: “Es esta”, señalando a la versión de 1865, un ejemplar que él tenía de la impresión de 1911. Varios de los asistentes a la Conferencia ni siquiera sabían el español pero Jeff McArdle y Paul García que le acompañaba sí lo hablaban.",
      "El hermano Jeff quedó absolutamente impresionado por la versión de 1865 (Igual que sucedió con el rey Josías cuando vio por primera vez el rollo de la",
      "27 Agradecemos al Dr. Philip Robinson por varios de estos datos históricos que él dio a conocer en una Conferencia que impartió en la Iglesia Bíblica Bautista de Hialeah en Miami, FL, USA, en Marzo de 2024.",
      "Biblia) y de allí en adelante cambió del todo el asunto de la incertidumbre acerca de la Biblia de Dios en español. ¡Dios había contestado su oración en la que había perseverado por quince años!. Por supuesto el Hno. Jeff y varios otros con él comenzaron a investigar la Biblia que recién acababa de conocer, y después de escudriñar concienzudamente y examinar las evidencias llegaron a la conclusión de que, efectivamente esa era (la única) que Dios entregó para el pueblo hispanohablante en medio del mundo.",
      "A partir del año 2001 se han realizado varias reimpresiones de la Bibla 1865, siendo la última la de 2019, y al presente (2026) se encuentra en proyecto una nueva reimpresión que se hace muy necesaria.",
    ],
  },
  {
    slug: "tercera-evidencia-las-fuentes",
    number: 4,
    title: "Tercera evidencia: las fuentes originales de la Biblia",
    summary: "Antes de hablar de los manuscritos, establece dos conceptos: la preservación divina de las Escrituras y la necesidad de creerla, en un tiempo de incredulidad.",
    readingTimeMinutes: 15,
    content: [
      "Querido hermano Lugardo: cuando llegamos a este punto referido a los manuscritos originales de la Biblia, necesitamos entender previamente algunos conceptos.",
      "EL PRIMER CONCEPTO ES LA PRESERVACIÓN DIVINA DE LAS ESCRITURAS.",
      "Es sumamente importante entenderlo, y más que entenderlo es asunto de CREERLO. Como ya hemos visto, nos encontramos en el siglo de la incredulidad y la época en la que estamos nunca enfatiza la necesidad de creer, de TENER FE EN LO QUE DIOS HA DICHO. Por lo contrario, y especialmente en los círculos de “erudición” de la Biblia, la actitud general que ellos despliegan hacia la Biblia no es la fe sino la ANTI-FE (la incredulidad) y esta incredulidad está disfrazada con palabras rimbombantes como la “alta crítica”, la “baja crítica” y otras por el estilo.",
      "Mucho se habla acerca de los errores que se produjeron en el proceso de copiar y volver a copiar y volver a copiar -a mano- los pergaminos, los rollos de la Biblia durante largos siglos antes de la invención de la imprenta hacia 1440.",
      "Sin embargo en medio de todo esto hay un hecho que no se puede negar aunque los enemigos de la Biblia lo quieran hacer: DIOS TOMÓ EN SUS PROPIAS MANOS LA PRESERVACIÓN DE SU PALABRA a pesar de los errores de copiado, a pesar de los intentos diabólicos de destruir la Biblia, a pesar de la prohibición de leerla que implantó el catolicismo bajo pena de muerte y a pesar de la incredulidad de los eruditos actuales.",
      "LA PRESERVACIÓN DIVINA DE LAS ESCRITURAS puede ser demostrada en el pasaje de 2 Timoteo 3:14-17:",
      "Así que tú está firme en lo que has aprendido, y de que has sido persuadido, sabiendo de quién has aprendido; Y que desde la niñez has sabido las sagradas Escrituras, las cuales te pueden hacer sabio para la salud por medio de la fe que es en Cristo Jesús. Toda la Escritura es inspirada divinamente, y es útil para enseñar, para reprender, para corregir, para instituir en justicia, Para que el hombre de Dios sea perfecto, perfectamente instruido para toda buena obra.",
      "Las Escrituras de las que aprendió Timoteo desde su niñez eran copias-de-copias-de-copias-de-copias-de-copias-de-copias. Los originales del Antiguo Testamento ya en el tiempo de Timoteo provenían de miles de años atrás y ¡hacía muchos siglos que aquellos manuscritos originales ya no existían, cuando Timoteo manejaba las Escrituras!.",
      "Pero notemos cómo Dios les llama A LAS COPIAS EN MANOS DE TIMOTEO Toda la Escritura es inspirada divinamente. ¡No está refiriéndose a los manuscritos originales!. Sin embargo allí tenemos a los eruditos de las ciencias bíblicas del tiempo de Laodicea afirmando llenos de incredulidad que la Biblia es inspirada divinamente y sin errores “Únicamente en los manuscritos originales”. Es por eso que el Espíritu Santo les reprende con toda dureza: unge tus ojos con colirio, para que veas. Yo reprendo y castigo a todos los que amo: sé pues zeloso, y arrepiéntete. 28",
      "También Dios nos asegura la integridad, la exactitud y la fidelidad de la Biblia a lo largo de los siglos:",
      "El cielo y la tierra perecerán, mas mis palabras no perecerán. 29",
      "Hermano Lugardo, tome nota de esto: el Señor Jesús no dice “mi palabra” sino mis palabras, es decir cada una de las aproximadamente 800,000 palabras que están escritas en la Biblia.",
      "EL SEGUNDO CONCEPTO ES LA EXISTENCIA DE MANUSCRITOS FIELES Y DE MANUSCRITOS CORRUPTOS.",
      "La historia de adulterar y cambiar las palabras de Dios no es nada nuevo. Es algo tan antiguo como el hombre mismo. El primer adulterador de lo que Dios había dicho fue Satanás en persona, desde los primeros días de la habitación de Adán y Eva en el huerto de Edén. Veamos lo que Dios pronunció y cómo el diablo cambió perversamente las palabras divinas:",
      "Dios había dicho exactamente lo siguiente:",
      "28 Revelación (Apocalipsis) 3:18c-19",
      "29 Mateo 24:35",
      "Y mandó Jehová Dios al hombre, diciendo: De todo árbol del huerto comerás: Mas del árbol de ciencia de bien y de mal, no comerás de él: porque el día que de él comieres, morirás. 30",
      "Ahora Satanás pervierte las palabras de Dios:",
      "Empero la serpiente era astuta más que todos los animales del campo, que Jehová Dios había hecho: la cual dijo a la mujer: Cuanto más que Dios dijo: No comáis de todo árbol del huerto.",
      "Así que no es nada extraño lo que ha sucedido a lo largo de los siglos, o sea ADULTERAR la Biblia agregando, quitando o cambiando. Pero entonces aquí recordamos que Dios en persona se ha encargado de la preservación fiel de sus Escrituras, por lo tanto SIEMPRE SE PUEDE IDENTIFICAR LOS TEXTOS FIELES Y VERDADEROS PARA DISTINGUIRLOS DE LOS TEXTOS CORRUPTOS.",
      "En cuanto al texto griego en el cual fue escrito el Nuevo Testamento, hay dos tipos principales de manuscritos antiguos (Es decir aquellos escritos a mano antes de la invención de la imprenta). Estos son los siguientes:",
      "1. Los del Texto Mayoritario, también llamado la familia textual de tipo Bizantino. El nombre “mayoritario” proviene del hecho de que existen más de 5,500 manuscritos antiguos de este tipo, que van desde pequeños fragmentos hasta copias enteras o casi completas del Nuevo Testamento en su idioma original. Generalmente su antigüedad proviene desde el siglo cuarto en adelante.",
      "2. Los textos Alejandrinos, nombrados así por la ciudad egipcia de Alejandría. Los manuscritos que pertenecen a este tipo son muy pocos, algunos autores dicen que apenas hay “unos cuantos” de ellos, otros autores les atribuyen ser hasta 200.",
      "Aparte de estas dos familias de manuscritos hay algunos otros también pero los dos mencionados son los más importantes.",
      "Ahora bien, aunque algunos estudiosos pretenden mantenerse “neutrales” en cuanto a defender o el uno o el otro de estas familias de manuscritos,",
      "30 Génesis 2:16-17 delante de LA VERDAD no existe nada parecido a la neutralidad. O estamos con la verdad o estamos en contra de ella. ¡No existe un punto medio, un punto neutral! Y el Señor Jesús así lo dice:",
      "El que no es conmigo, contra mí es; y el que conmigo no coge, derrama. 31",
      "Como siempre sucede en el campo de la verdad, es necesario preguntarse: ¿Cuál de estas dos familias de manuscritos es la que se mantuvo fiel a la palabra de Dios? Y la respuesta no es nada complicada de encontrarla. Analizaremos las diferencias.",
      "Empezando por el nombre, los manuscritos relacionados a la ciudad de Alejandría inmediatamente nos encienden una luz roja dentro de la misma Biblia. Alejandría era la capital de Egipto en el tiempo antiguo. A través de toda la Biblia Egipto figura en la Biblia identificada como el mundo enemigo de Dios. Tanto era así que después que los israelitas salieron de Egipto hacia la tierra prometida, Dios les prohibió terminantemente que volvieran a Egipto de donde habían salido.",
      "Y existe un principio del estudio bíblico que no es muy conocido pero que no por eso deja de ser real. Es el principio de “la primera mención”. Significa que cuando Dios menciona en la Biblia algún asunto por primera vez, esa primera mención traza un patrón que permanece inalterable en toda la Biblia. Por ejemplo, la primera mención de la serpiente se encuentra en Génesis capítulo 3 (el diablo engañando a Eva) y a partir de allí SIEMPRE que la Biblia menciona a la serpiente lo hace relacionándola con Satanás.",
      "¡En la Biblia ningún detalle es de casualidad!!! Y resulta que la primera mención bíblica a la ciudad de Alejandría está ligada directamente a los enemigos de la palabra de Dios:",
      "Empero Esteban, lleno de fe y de poder, hacía prodigios y milagros grandes entre el pueblo. Levantáronse entonces unos de la sinagoga que se llama de los Libertinos, y Cireneos, y Alejandrinos, y de los que eran de Cilicia, y de Asia, disputando con Esteban. Mas no podían resistir a la sabiduría, y al Espíritu con que él hablaba. Entonces sobornaron a unos que dijesen que",
      "31 Lucas 11:23 le habían oído hablar palabras de blasfemia contra Moisés, y contra Dios. Y conmovieron al pueblo, y a los ancianos, y a los escribas; y arremetiendo, le arrebataron, y le trajeron al concilio. Y pusieron testigos falsos que dijesen: Este hombre no cesa de hablar palabras de blasfemia contra este lugar santo, y contra la ley; Porque le hemos oído decir: Que este Jesús Nazareno destruirá este lugar, y mudará las costumbres que nos dio Moisés. Entonces todos los que estaban sentados en el concilio, puestos los ojos en él, vieron su rostro como el rostro de un ángel. 32",
      "Esos judíos de Alejandría junto con otros más disputaban con Esteban pero no podían vencer la sabiduría del mensaje de Dios que él proclamaba. Entonces trajeron testigos falsos para acusarle, y Esteban termina apedreado y muerto. Así pues, el nombre de la ciudad de Alejandría lleva en la Biblia un significado ligado directamente a los enemigos de la palabra de Dios, lo mismo que el nombre Egipto, país del cual Alejandría era la antigua capital.",
      "Los manuscritos de origen Alejandrino, entre ellos los llamados “Códice Vaticano” y “Códice Sinaítico” están plagados de adulteraciones y de errores en el texto bíblico que supuestamente transmiten.",
      "Tampoco es difícil saber la razón de tales corrupciones. Uno de los hombres a quien se le podría llamar el padre de la gran mayoría de cambios, omisiones y adulteraciones en los manuscritos bíblicos fue Orígenes Adamantius, también conocido como Orígenes de Alejandría. Nacido hacia el año 185 después de Cristo, Orígenes fue alguien que profesaba ser cristiano pero que en lugar de creer las Escrituras lo que seguía, amaba y creía era la filosofía de los griegos. De ahí su intento de “concordar” la Biblia con la filosofía griega.",
      "La antigua ciudad de Alejandría en Egipto llegó a ser famosa por su gran biblioteca. La ciudad era un enorme centro “cultural” y de ahí el objetivo de reunir todo el saber y el conocimiento en aquella biblioteca llena de miles de libros (manuscritos). Era el equivalente exacto de las grandes universidades del día de hoy que supuestamente reúnen todo el saber humano.",
      "Fue en base a ambas familias de manuscritos, que se originaron dos ramas",
      "32 Actos (Hechos) 6:8-15 del texto griego del Nuevo Testamento.",
      "La primera de ellas es la que se basa en gran medida en los manuscritos de tipo bizantino, que también se llama el texto mayoritario. En este caso para el cristiano estudioso de la Biblia no es difícil distinguir que al hablar del texto mayoritario estamos hablando de los manuscritos FIELES A LA PALABRA DE DIOS. Y la razón es que aquí (en la trasmisión y copiado de estos textos) no intervinieron los académicos, los doctores de aquel tiempo, sino que se fueron copiando y transmitiendo por mano de los creyentes de las Iglesias locales (Y recuerde hermano Lugardo, en realidad lo que intervino en este caso fue la mano de Dios mismo para preservar fielmente su palabra).",
      "Más de 5,500 manuscritos antiguos del tipo bizantino han quedado como aquellos numerosísimos testigos de la fidelidad del texto del Nuevo Testamento (por eso su nombre también: texto mayoritario) mientras en la otra familia de textos llamados Alejandrinos, el número de ellos es sumamente pequeño en comparación, aparte del hecho de que se desvían completamente de la fidelidad, estando llenos de corrupciones en el texto.",
      "Fue en base a este texto mayoritario o bizantino que Erasmo de Rotterdam, gran erudito de idiomas bíblicos y un hombre realmente temeroso de Dios, hizo la compilación por primera vez en forma de libro, del texto griego del Nuevo Testamento. Su primera edición vio la luz en 1516 aunque luego hubo varias ediciones posteriores. Más adelante el texto compilado por Erasmo quedó con el nombre de Textus Receptus (que significa Texto Recibido).",
      "Durante varios siglos, hasta antes del siglo XIX, el Textus Receptus fue la base de las traducciones de la Biblia a muchos idiomas en el mundo, entre ellas la realizada por Casiodoro de Reina al español en 1569, como también la conocida como King James Bible en inglés, en el año 1611.",
      "¡Estaba transcurriendo en esos tiempos toda la época histórica de Filadelfia a la que Dios felicita por haber guardado su palabra!.",
      "Pero llegando al inicio de la época apóstata de la Iglesia, la de Laodicea, los llamados doctores de la Biblia dejaron de lado la verdad del Textus Receptus y se volcaron a las fábulas (2 Timoteo 4:4) de los textos Alejandrinos.",
      "Casi se puede marcar con exactitud el inicio de Laodicea con la publicación del Nuevo Testamento en griego (adulterado, basado en los manuscritos de Alejandría) elaborado por dos hombres apellidados Westcott y Hort. Esto fue en 1881.",
      "A partir del Nuevo Testamento corrupto de Westcott y Hort, TODO el campo de los traductores bíblicos, dejando de lado la verdad, se inclinaron a seguir la falsedad de ese texto y a publicar las nuevas traducciones (versiones) de la Biblia basándose en los textos Alejandrinos, lo cual CONTINÚA DE LA MISMA MANERA HASTA EL DÍA DE HOY. Es por eso exactamente que Dios califica al cristianismo del tiempo actual de Laodicea como cuitado, y miserable, y pobre, y ciego, y desnudo. 33",
      "También a partir de Westcott y Hort, o un poco antes de ellos, se comenzó a usar el término “crítico” que no es otra cosa que la incredulidad y la apostasía disimulada con un nombre atractivo. Es por eso que en contraposición al Textus Receptus (basado en el texto bizantino o mayoritario) comenzaron a usar ahora el “Texto Crítico” compilado en base al corrupto texto Alejandrino.",
      "Las versiones en castellano posteriores a la de 1865 comenzaron a inclinarse invariablemente hacia el “Texto Crítico”. Pero para el tiempo de nuestra Biblia la Sociedad Bíblica Americana todavía no había tomado ese camino. Eso se puede distinguir claramente porque la revisión de 1865 no tiene nada que ver con los Textos Alejandrinos ni con Westcott y Hort que vinieron después.",
      "Las actas de reuniones de la Sociedad Bíblica Americana durante el proceso de la revisión así lo muestran, por ejemplo (párrafos traducidos):",
      "“…Temprano en 1860 al Comité de Versiones le fue solicitado otra vez acerca de nuevas y mejoradas Biblias en Español, en conformidad literal con el Hebreo y el Griego. (Subrayado nuestro).",
      "Más adelante las actas registran incluso que la revisión en español se había adherido a no apartarse del texto en inglés de la Biblia King James, la cual era considerada como un importantísimo referente en lo que concierne a la fidelidad de los manuscritos en los cuales se basaba:",
      "33 Revelación (Apocalipsis) 3:17c",
      "“Ellos habían seguido el texto en Inglés tanto como el estilo idiomático lo permitiera. El Comité agradeció al Sub-Comité, especialmente al Dr. Schmidt, y recomendó una gratificación de 1,000 dólares a De Mora, y el agradecimiento y una Biblia hermosamente encuadernada al Dr. Schmidt con una copia de la resolución. El libro fue publicado en 1865 con grandes esperanzas de su amplio uso a través de América Hispana.” (Subrayado nuestro).",
      "Y en realidad fue Dios quien apartó de la tarea principal a Henry Barrington Pratt (recordando de nuevo el principio de la Preservación Divina de las Escrituras). Decimos esto porque Henry Pratt se había comenzado a inclinar a usar las herramientas de la “crítica” en cuanto a la Biblia, y más adelante en 1893 publicó su propia revisión de la Biblia a la cual llamó “La Versión Moderna” y en ella Pratt se basó en los Textos Alejandrinos, aquellos conocidos como el “Texto Crítico”.",
      "Henry Pratt se quejó de que Ángel De Mora “no tenía una clara noción de la exactitud crítica” pero ¡Todo esto fue controlado por Dios! teniendo como principal participante a De Mora, alejado del todo de las pretensiones de la corriente de la “crítica” que no es otra cosa que la incredulidad disfrazada. En los párrafos siguientes transcribimos las quejas de Pratt acerca de que De Mora no sabía nada del “estudio crítico” de las Escrituras.",
      "Mi buen amigo Mora, tal como mi larga e íntima familiaridad con él me permite saberlo, era más que un ordinario experto del Español, pero no había tenido ni podría tener una clara noción de la exactitud crítica en cuanto concierne al sentido. En nuestra propia división del trabajo, él era el responsable del lenguaje, y yo de la exactitud crítica de la revisión.",
      "Después se lee unos párrafos más adelante:",
      "(...) Él (Henry Pratt) hizo notar que la versión de Valera original había sido publicada nueve años antes de la Biblia King James, y que el Sr. Mora no tenía conocimiento crítico de la Escritura, ni siquiera en referencia a la presente versión en Inglés. (Nota: se refiere a la Biblia King James). 34",
      "34 Las cuatro últimas citas son tomadas (traducidas) del documento ya mencionado titulado “ABS Historical Essay # 16, IV Text and Translation, 1860-1900” por Margaret T. Hills, Enero de 1966, de las páginas 26 y 27.",
      "¡Está muy bien registrado que Ángel Herreros de Mora, el principal revisor de la Biblia 1865, no sabía nada de las artimañas de la “crítica” de la Biblia! Lo cual es, una vez más, motivo de agradecimiento a Dios aunque ni Pratt ni los otros lo entendieran así.",
    ],
  },
  {
    slug: "cuarta-evidencia-la-fidelidad",
    number: 5,
    title: "Cuarta evidencia: la fidelidad del texto",
    summary: "Plantea que ninguna traducción transmite con exactitud todo el significado del original, y defiende la fidelidad de cada palabra de la Biblia Reina-Valera de 1865.",
    readingTimeMinutes: 14,
    content: [
      "Al entrar a hablar del texto, de las palabras y de cada palabra escrita en la Biblia Reina-Valera 1865, se plantea algo muy importante en cuanto a las traducciones en general.",
      "Es el hecho de que ninguna traducción es perfecta en el sentido de poder trasladar de un idioma a otro el cien por ciento del significado original, incluyendo los matices especiales del significado de la palabra o frase original, las connotaciones culturales, etc. En ese sentido es completamente cierto que ninguna traducción es perfecta.",
      "Notemos, querido hermano Lugardo, que es por esa razón que la abrumadora mayoría ¿O todas? las Confesiones de Fe de las diversas denominaciones cristianas rehúsan reconocer que las palabras de la Biblia TRADUCIDAS sean consideradas divinas, inspiradas por Dios, perfectas e infalibles.",
      "Hasta el momento yo no he podido encontrar una Declaración de Fe (aparte de la de nosotros como Creyentes de la Biblia) en donde ellos confiesen que NO SOLAMENTE los manuscritos originales son inspirados por Dios sino también una Biblia traducida.",
      "¡Claro! Una de las razones principales de no querer reconocer que una Biblia traducida es inspirada por Dios y por lo tanto perfecta y sin errores, es que al hacerlo NECESARIAMENTE DEBEN RECONOCER Y CREER QUE HAY UNA SOLA VERSIÓN VENIDA DE DIOS MISMO EN CADA IDIOMA. Porque si una sola de las traducciones es inspirada por Dios, ¡TODAS LAS DEMÁS VERSIONES QUEDAN EXCLUIDAS!!!",
      "Es por eso que para el idioma español o castellano nosotros como Creyentes de la Biblia creemos y proclamamos que la revisión de 1865 de la traducción de Reina y Valera es precisamente aquella que fue inspirada por Dios EN LA TRADUCCIÓN AL CASTELLANO y no únicamente en los manuscritos originales. Esto excluye a toda otra versión como inspirada por Dios.",
      "Bueno, hermano Lugardo, examinaremos con cuidado los dos conceptos que estamos manejando aquí. Uno de ellos es acerca de la traducción, y el otro acerca de la doble inspiración de la Biblia.",
      "Pues estábamos diciendo primero que ninguna traducción es perfecta. Entonces ¿Cómo podemos decir que las palabras de Dios de la Biblia 1865 en castellano son perfectas y divinas, si la traducción del hebreo y el griego al español (o a cualquier idioma) no puede ser perfecta?",
      "La respuesta es sencilla de entender: una vez que Dios ha usado como instrumento divino a los mejores hombres que Él ha tenido para dicha tarea, generando una traducción lo más fiel que sea posible a los originales en hebreo y en griego, entonces ESAS PALABRAS TRADUCIDAS SON LAS MISMAS Y EXACTAS PALABRAS DE DIOS, INSPIRADAS POR EL ESPÍRITU SANTO PERO ESTA VEZ EN UN IDIOMA DIFERENTE.",
      "Al llegar a este punto se marca la diferencia entre la fe verdadera de un cristiano y los conceptos “académicos” que manejan, llenos de soberbia, los señores de la ciencia bíblica contemporánea. Cualquier erudito del día de hoy, tal como lo califica Dios en Revelación (Apocalipsis) 3:17c y 18c es cuitado, y miserable, y pobre, y ciego, y desnudo. (...) y unge tus ojos con colirio, para que veas.",
      "Ya hemos hablado de cómo los líderes del pueblo cristiano, los eruditos y doctores, confiesan ellos mismos que no hay ninguna Biblia perfecta. En la enseñanza de ellos al pueblo evangélico, nosotros tenemos LA CASI-BIBLIA pero no tenemos LA BIBLIA. Según proclaman ellos, nuestra Biblia (cualquier versión) es CONFIABLE (¿Qué porcentaje tiene de confiabilidad? ¿Tal vez 90 por ciento confiable? ¿O tal vez 95 por ciento?) Pero no es PERFECTA. Es por eso que podrían llamarle LA CASI-BIBLIA. Porque nunca entienden y nunca lo creen, que Dios no es como el hombre que hace las cosas imperfectas e incompletas.",
      "Se confirma pues, exactamente como Dios lo diagnostica, a los creyentes del tiempo de Laodicea (nuestro tiempo) como cristianos que no conocen en absoluto el poder de Dios, y la razón de no conocerlo es por su incredulidad.",
      "A continuación vamos a mostrar un ejemplo palpable de aquella incredulidad de los grandes líderes cristianos del tiempo actual de Laodicea.",
      "Mencionaremos lo que afirma Samuel Escobar, connotado Autor y Conferencista cristiano y uno de los fundadores de la FTL (Fraternidad Teológica Latinoamericana), en una pequeña entrevista que dio en el año 2013: 35",
      "(Pregunta de la entrevistadora): “Y dígame en cuanto a esto que hacía referencia también hace unos momentos de que en realidad todo esto que la ciencia va descubriendo ¿No diverge tanto de lo que la Biblia explica en cuanto a la sucesión y al orden de aparición en la tierra de vida, no?”",
      "(Respuesta de Samuel Escobar): “Sí, eso es algo notable que la ciencia, vamos a decir, nos ha permitido entender cómo se formó la tierra, cómo ha evolucionado, cómo hemos ido pasando de la materia inorgánica a la materia viva y luego a las diferentes especies y el relato que nos ofrece la Biblia, digamos, sigue el mismo orden pero es un relato que tiene 2,000 años, más de 2,000 años de antigüedad antes que existiera la ciencia y todo eso, el relato bíblico nos da una idea que no entra en contradicción abierta con lo que sostiene la ciencia.”",
      "Aunque la pregunta que le hacen no es directamente acerca de qué es la Biblia, la respuesta de Samuel Escobar, líder muy conocido en el campo evangélico, nos muestra su posición y la de muchos otros: que lo que está narrado en los primeros capítulos de Génesis acerca de la creación en realidad es algo parecido a una “historia mitológica” porque Dios no creó el mundo en siete días, ya que eso fue escrito (dice) miles de años atrás cuando todavía no existía la ciencia. ¿Se da cuenta hermano Lugardo? Pueden creer a pie juntillas el cuento fantasioso y engañador de la evolución pero son incrédulos respecto a lo que Dios ha escrito en su palabra. ¡No creen la Biblia, por lo tanto no conocen al Dios de la Biblia!!!. Se cumple en ellos las palabras del Señor Jesús:",
      "En aquel tiempo respondiendo Jesús, dijo: Gracias te doy, Padre, Señor del cielo y de la tierra, porque escondiste estas cosas a los sabios y entendidos, y las has revelado a los niños. Así, Padre, pues que así agradó a tus ojos. 36",
      "35 Entrevista grabada en el siguiente URL: https://www.youtube.com/watch?v=xRKkWbnun70&t=307s",
      "36 Mateo 11:25-26",
      "Quienes nos llamamos Creyentes de la Biblia somos objeto de burla de los demás cristianos. ¡Gloria a Dios por eso!. Somos iguales a los niños a quienes menciona el Señor en este pasaje: llenos de fe en la palabra de Dios, entendiendo cabalmente sus misterios mientras los “CREYENTES INCRÉDULOS” del tiempo de Laodicea, que se consideran a sí mismos sabios y entendidos, no comprenden nada de las maravillas de Dios.",
      "De manera, pues, que acabamos de hablar acerca de que, no obstante que al traducir del hebreo y el griego al castellano no se puede traspasar el cien por ciento del significado original de esos idiomas al español, sin embargo las palabras que quedaron traducidas CONSTITUYEN LAS MISMAS Y EXACTAS PALABRAS DE DIOS, PERFECTAS E INFALIBLES, PERO ESTA VEZ EN IDIOMA CASTELLANO.",
      "Eso nos lleva a definir lo que a veces se conoce como la DOBLE INSPIRACIÓN DE LAS ESCRITURAS. Significando que al igual que los manuscritos originales fueron inspirados por Dios (en griego y en hebreo) de la misma manera DIOS INSPIRÓ DIRECTAMENTE A LOS FIELES TRADUCTORES QUE ÉL MISMO ESCOGIÓ, EN EL PROCESO DE TRASLADAR DE UN IDIOMA AL OTRO.",
      "Por supuesto es necesario explicar que hay una diferencia entre los dos niveles de inspiración: porque en el segundo caso (Dios inspiró la traducción) el proceso no consistió en generar nuevas revelaciones ni nuevas palabras sino en TRASPASAR DE LA MANERA MÁS FIEL Y EXACTA POSIBLE LAS PALABRAS QUE YA ERAN INSPIRADAS POR DIOS EN HEBREO Y EN GRIEGO, AL IDIOMA CASTELLANO.",
      "También entendemos que las palabras originales de Dios, que constituyen la base para toda traducción a cualquier idioma, han sido y seguirán siendo aquellas que Dios nos reveló por medio de los idiomas originales: hebreo en el Antiguo Testamento, y griego en el caso del Nuevo Testamento.",
      "Ahora bien, quisiera decirle a continuación hermano Lugardo algo que verdaderamente va a sacudir bastante una tradición grandemente arraigada en el campo cristiano, y es el uso de los idiomas originales en el estudio de la Biblia.",
      "Entendemos y creemos que Dios sabe hablar perfectamente bien el idioma español y que por eso nos habla directamente en nuestro idioma. Y que cada palabra en la Biblia 1865 es exacta, es perfecta, es divina, es infalible.",
      "Entonces la conclusión es bastante lógica: si Dios nos ha hablado directamente en castellano, ¿CUÁL ES LA NECESIDAD DE RECURRIR A LOS IDIOMAS ORIGINALES HEBREO Y GRIEGO CON TAL DE ENTENDER PROFUNDAMENTE LA BIBLIA???",
      "Los originales de la Biblia en hebreo y griego seguirán siendo la base para nuevas traducciones (en idiomas que aún no tienen la Biblia). Pero ¿qué necesidad tenemos nosotros de recurrir al hebreo y al griego??? ¿O es que no creemos realmente que Dios nos ha hablado en español???",
      "En realidad romper con las tradiciones “cristianas” es tan duro ahora como lo fue en los días del Señor Jesús. Los estudiosos de los idiomas bíblicos (que no lleva nada de malo el serlo) han hecho creer a los creyentes que NO SE PUEDE ENTENDER REALMENTE LAS ESCRITURAS SI NO ES POR EL DOMINIO DEL HEBREO Y DEL GRIEGO.",
      "Entonces la tradición ha continuado durante años y años. Cada predicador se esmera en analizar la raíz original de cierta palabra, explicando la conjugación del verbo en griego, etc., y lo hace así en cada predicación, de manera que la impresión que deja en todos los oyentes es la siguiente: que estudiar la Biblia en español (o en inglés, o en cualquier idioma) es como estudiar una Biblia “de segunda categoría” ya que en realidad NO SE COMPRENDE CABALMENTE LA BIBLIA, SUPUESTAMENTE, SI NO ES POR ACUDIR (RETROCEDER) A LOS IDIOMAS ORIGINALES.",
      "¡Nosotros queremos romper esa larga tradición, hermano Lugardo!!! A mí personalmente me encanta romper las tradiciones cuando encuentro que no concuerdan con la Biblia. Si Dios nos ha hablado EN ESPAÑOL hay que estudiar las conjugaciones, los matices de significado de cada palabra en castellano, no en griego ni en hebreo.",
      "Otro punto necesario de tratar aquí es en cuanto a una de las líneas prevalecientes más destacadas en medio del mundo en la época de Laodicea: EL RELATIVISMO, el cual influye en todas las áreas de pensamiento actualmente. El concepto es el siguiente: que LA VERDAD NO EXISTE, y por lo tanto todo lo que hay es relativo, NADA ES ABSOLUTO, NADA ES VERDADERO.",
      "Según el relativismo, como la verdad no existe, entonces tú tienes tu propia verdad, mi vecino tiene la suya, y yo la mía. Cada uno inventa su propia verdad. La clave está en que nos respetemos unos a otros, y no interesa en qué creamos, da lo mismo que creamos en cualquier cosa, porque LA VERDAD QUE ES UNA SOLA PARA TODOS, LA VERDAD ABSOLUTA, simplemente no existe.",
      "Los eruditos bíblicos de nuestra época pueden afirmar que ellos creen en la palabra de Dios, y ante el pueblo cristiano aparentan ser fieles a la Biblia, pero en términos reales NO LA CREEN. Han sido ganados completamente por el relativismo.",
      "La persona que más ha influenciado en la filosofía de los traductores bíblicos del tiempo presente ha sido Eugenio (Eugene) Nida. Hacia los inicios de los años 60 Eugenio Nida comenzó a enseñar un concepto de su creación llamado la Equivalencia Dinámica en el campo de la lingüística y de la traducción. De tal manera que la enorme mayoría de las versiones bíblicas modernas se han elaborado siguiendo los conceptos de la Equivalencia Dinámica de Eugenio Nida.",
      "EL RELATIVISMO ES LA BASE Y EL CIMIENTO DE LA EQUIVALENCIA DINÁMICA. Como “No existe ninguna verdad absoluta” entonces esto se aplica en el campo de la lingüística restándole valor a las palabras individuales del idioma (porque si no hay verdad absoluta, tampoco las palabras tienen valor absoluto). Históricamente los traductores en el mundo entero aplicaban durante muchos siglos el concepto de EQUIVALENCIA FORMAL hasta la llegada de Eugenio Nida quien trastocó el entendimiento de la ciencia de la traducción. La Equivalencia Formal significaba traducir “palabra por palabra” de un idioma a otro. Es decir, encontrar la palabra más fiel y exacta posible equivalente a la palabra original, en el idioma que se traduce. Por supuesto que no en todos los casos es esto posible, ya que por ejemplo a veces una sola palabra en el idioma original equivale a dos o tres palabras en el idioma traducido si se trata de ser fiel al significado.",
      "Nida cambió totalmente las cosas RELATIVIZANDO EL VALOR DE CADA PALABRA. Según su Equivalencia Dinámica, no hay que traducir palabra por palabra sino idea por idea, o concepto por concepto. Es decir, NO IMPORTA MUCHO QUÉ PALABRAS SE USEN PORQUE LO QUE INTERESA REALMENTE NO SON LAS PALABRAS SINO LAS IDEAS.",
      "¿Cómo es posible que nadie se dé cuenta de que la Equivalencia Dinámica es una simple falacia? Porque si hablamos de las ideas o conceptos, estos conceptos o ideas no flotan sueltos en el aire. CADA IDEA DEPENDE ABSOLUTAMENTE DE LA PALABRA QUE SE USE. ¿Cómo entonces se puede trasladar de un idioma al otro la idea exacta si no es por una palabra que conlleve la misma idea de la manera más fiel posible???",
      "Finalmente, vamos a mostrar varios ejemplos de la exactitud y fidelidad de las palabras que Dios nos ha dado en la Biblia de 1865.",
      "Uno de ellos es el texto de Actos (Hechos) 20:28:",
      "Por tanto mirad por vosotros, y por todo el rebaño sobre el que el Espíritu Santo os ha puesto por sobreveedores, para apacentar la iglesia de Dios, la cual él ganó con su propia sangre.",
      "La palabra Dios en este caso en varias de las versiones modernas ha sido reemplazada por la palabra “Señor” lo cual es una abierta adulteración de la palabra original en griego. Como vemos, este versículo está afirmando de manera enfática la divinidad del Señor Jesús.",
      "También lo vemos en Lucas 2:22-23, después del nacimiento del Señor Jesús:",
      "Y como se cumplieron los días de la purificación de María conforme a la ley de Moisés, le trajeron a Jerusalem para presentarle al Señor,",
      "La Biblia 1865 es también aquí sumamente fiel y exacta porque la que debía purificarse era LA MADRE, después del parto, y no el marido ni tampoco el recién nacido. Pero la versión Reina-Valera de 1960 (y también varias otras versiones) lo cambian sin ningún temor de Dios poniendo lo siguiente:",
      "Y cuando se cumplieron los días de la purificación de ellos, conforme a la ley de Moisés, le trajeron a Jerusalén para presentarle al Señor.",
      "Aunque no lo sabemos a ciencia cierta, tal vez el catolicismo influyó en adulterar este versículo de manera descarada, ya que los católicos no pueden aceptar el hecho de que María tenía que purificarse. Si así fuera cierto no sería de extrañar ya que Eugenio Nida, uno de los responsables de la revisión de 1960, tenía amistad con los católicos.",
      "Otro ejemplo de la falta de temor de Dios alterando las palabras de la Biblia es el de Actos (Hechos) 23:5 que dice lo siguiente:",
      "Y Pablo dijo: No sabía yo, hermanos, que era el sumo sacerdote; porque escrito está: No hablarás mal del gobernador de tu pueblo.",
      "La versión Reina-Valera de 1960 y con ella otras también, ponen lo siguiente:",
      "Pablo dijo: No sabía, hermanos, que era el sumo sacerdote; pues escrito está: No maldecirás a un príncipe de tu pueblo.",
      "Si nos atenemos a la cita del Antiguo Testamento, en Éxodo 22:28, efectivamente allí se usa la palabra “maldecirás”. Pero en Actos 23:5 NO ES LA PALABRA MALDECIRÁS (En el original griego) sino tal como se encuentra en la Biblia 1865 No hablarás mal. Quienes hicieron la revisión de 1960 trataron de “corregir” las palabras que Dios usa en Actos 23:5 para hacerlas concordar con Éxodo 22:28.",
    ],
  },
  {
    slug: "quinta-evidencia-el-fruto",
    number: 6,
    title: "Quinta evidencia: el fruto de la Biblia 1865",
    summary: "Repasa la historia de la Biblia de 1865 en América Latina: su llegada con Diego Thomson en 1822 y la gran demanda de Biblias que impulsó la Sociedad Bíblica Americana desde 1840.",
    readingTimeMinutes: 2,
    content: [
      "Como ya hemos mencionado anteriormente, la Biblia 1865 fue prácticamente borrada de la memoria, es decir de la historia de los primeros años del evangelio en América Latina. Pero borrar su memoria no es lo mismo que poder negar los frutos evidentes de esta Biblia en todos los países de habla española en el continente americano.",
      "Cuando Diego Thomson llegó al Perú en 1822 como colportor de la Biblia y fue bienvenido por el libertador José de San Martín, no existía una versión “protestante” de la Biblia en castellano. Se sabe que Diego Thomson trajo en su labor de colportor una versión producida por el catolicismo que era la de Scío de San Miguel, la cual ha sido calificada por muchos como una traducción pésima, y una de las razones fue que no había sido traducida del hebreo y el griego sino de la vulgata latina.",
      "Fue recién a partir más o menos de 1840 que comenzó a activarse el gran campo misionero que constituía América Latina, y efectivamente por la gran demanda de Biblias es que la Sociedad Bíblica Americana se preocupó en producir una versión actualizada de aquella que había quedado desde la revisión de Valera de 1602, la que ya no circulaba en nuevas impresiones. Entonces entre 1861 y 1865 se produjo la nueva revisión destinada para toda América Hispana.",
      "Cuando Francisco Penzotti, otro colportor bíblico vino al Perú en 1888, indudablemente trajo la Biblia de 1865. Existe el siguiente testimonio sobre la obra de Penzotti, quien había recorrido muchos lugares y países en América del Sur:",
      "Penzotti en sus distintas giras por los países latinoamericanos, vendió personalmente 125.000 libros, y bajo su dirección se distribuyeron en América Hispana más de dos millones de ejemplares de Biblias. 37",
      "Así que hasta los años de 1920 (La última impresión conocida de la Biblia 1865 fue en 1912) la Biblia Reina-Valera de 1865 fue la única usada como instrumento de Dios para la evangelización de toda Latinoamérica.",
      "37 Citado del libro “Los Colportores, los Evangelistas Olvidados de las Sociedades Bíblicas” por Calvin George, 2026, y él a su vez ha citado este párrafo del libro “Semblanzas Evangélicas” por Pereira Alves, A., Casa Bautista de Publicaciones, El Paso, Texas, 1963, pag. 96.",
    ],
  },
  {
    slug: "sexta-evidencia-la-expresividad",
    number: 7,
    title: "Sexta evidencia: la poderosa expresividad de la Biblia 1865",
    summary: "Muestra cómo las revisiones modernas han perdido la fuerza de las expresiones de 1865; por ejemplo, la palabra \"carga\" en los profetas, reemplazada por \"profecía\" en 1960.",
    readingTimeMinutes: 2,
    content: [
      "Con las traducciones modernas se ha perdido muchísimo de la fuerza de las expresiones con que el Espíritu Santo habla en la antigua revisión de ese año. Y en muchos casos no ha sido solamente reemplazar palabras antiguas con palabras modernas sino también ha sido TRASTOCAR las palabras por otras que no corresponden con el mismo significado.",
      "Un claro ejemplo de esto es la palabra carga, que bastantes veces es usada en los libros de los profetas, pero que a partir de la revisión de 1960 ha sido reemplazada por la palabra “profecía”. Veamos algunos casos:",
      "Carga de Babilonia, que vio Isaías, hijo de Amós. 38",
      "En el año que murió el rey Acaz fue esta carga: 39",
      "Y cuando te preguntare este pueblo, o el profeta, o el sacerdote, diciendo: ¿Qué es la carga de Jehová? decirles has: ¿Qué carga? Dejaros he, dijo Jehová. 40",
      "En todos estos casos, desviando el significado de la palabra, se ha reemplazado con otro término muy diferente: “profecía”.",
      "Otro caso semejante es el de una expresión bastante fuerte que Dios utiliza pero la cual ha sido “suavizada” en las versiones modernas:",
      "Así haga Dios, y así añada a los enemigos de David, que no tengo de dejar de todo lo que fuere suyo de aquí a mañana meante a la pared. 41",
      "He aquí, yo traigo mal sobre ti, y barreré tu posteridad, y talaré de Acab todo meante a la pared, al guardado, y al desamparado en Israel. 42",
      "38 Isaías 13:1 39 Isaías 14:28",
      "40 Jeremías 23:33 41 1 Samuel 25:22",
      "42 1 Reyes 21:21",
      "En estos y otros casos de la forma divina de la expresión: meante a la pared, esta ha sido cambiada por simplemente “varón” y claro, eso es lo que significa, pero el Espíritu Santo no escogió poner “varón” sino meante a la pared. ¡Dios sabe perfectamente bien por qué usa una expresión tan fuerte, pero los traductores del tiempo de Laodicea quieren “corregir” las palabras del Espíritu Santo!!!",
    ],
  },
  {
    slug: "septima-evidencia-la-evidencia-milagrosa",
    number: 8,
    title: "Sétima evidencia: la evidencia milagrosa",
    summary: "Presenta como evidencia milagrosa los patrones que el autor atribuye a la King James en inglés, según investigaciones con software que él mismo remite a un canal de video en inglés.",
    readingTimeMinutes: 2,
    content: [
      "Al llegar a esta evidencia diremos que es una prueba milagrosa y divina de que hay una versión traducida de la Biblia, la King James en inglés, la cual contiene a través de todo su texto pruebas absolutamente innegables de su procedencia divina.",
      "Al encontrar tales evidencias nos llenamos de un asombro gigantesco al ver la mano misma de Dios en la Biblia King James. Por supuesto, estas pruebas efectuadas por medio de software no han sido aplicadas a la Biblia 1865. ¡No es necesario!. Es suficiente que Dios haya puesto su sello milagroso en la King James. Si sucede o no lo mismo con la Biblia 1865, no tiene importancia porque es suficiente con que Dios nos lo haya mostrado en la versión King James.",
      "Estas investigaciones se encuentran (en inglés) en el canal de youtube llamado Truth is Christ (La verdad es Cristo). Aunque hay innumerables muestras del sello milagroso de Dios en la King James, mostraremos solo una de ellas, que se llama “La anomalía de Elton”.",
      "La anomalía de Elton consiste en el conteo total de números y palabras en la Biblia King James, la cual arroja con total precisión el numero 7 elevado a la potencia 7 (Como sabemos, el número 7 en la Biblia es el número de Dios mismo). Así que el total de palabras y números en la Biblia King James es la siguiente multiplicación: 7 x 7 x 7 x 7 x 7 x 7 x 7 que es lo mismo que decir 7 elevado a la sétima potencia, y el resultado exactísimo es el número 823,543.",
      "Usted puede investigar mucho más en el canal mencionado de youtube, porque las “coincidencias” matemáticas encontradas en la Biblia King James no son tales: son el sello incontrovertible que Dios ha dejado en su palabra, y como para que NO QUEDE NINGUNA DUDA, EL SELLO DE DIOS LO LLEVA UNA BIBLIA TRADUCIDA, LA KING JAMES EN IDIOMA INGLÉS.",
      "Hemos llegado hasta aquí querido hermano Lugardo, y tengo la esperanza de que muchísimos hermanos junto con usted hayan podido discernir y sobre todo LLEGAR A CREER (Lo cual es lo que Dios quiere) que él nos entregó una Biblia perfecta e infalible en idioma español. DIOS LE BENDIGA.",
    ],
  },
  {
    slug: "conclusion",
    number: 9,
    title: "Conclusión pastoral",
    summary: "Conclusión pastoral: la Biblia de 1865 es, según el autor, la palabra inspirada de Dios en castellano. Invita al lector a estudiar las siete evidencias y comprobarlo por sí mismo. Incluye la biografía del autor.",
    readingTimeMinutes: 1,
    content: [
      "En medio de innumerables versiones de la Biblia en idioma castellano, hay una sola que lleva el sello de Dios porque ha salido de la boca de Dios mismo.",
      "Cada palabra que está escrita en ella, en la Biblia Reina-Valera revisión de 1865, es la respiración de Dios; cada palabra de ella lleva la vida que le impartió el Espíritu Santo porque fue inspirada por el Espiritu de Dios.",
      "Este libro lo demuestra a través de siete evidencias de la inspiración divina y de la infalibilidad de la Biblia de 1865. El desafío es que usted las estudie y lo compruebe por sí mismo.",
      "El Pastor Enrique Ginocchio lleva más de cuarenta años ejerciendo la labor Pastoral, y actualmente dirige la Iglesia Bautista ubicada en San Fernando en Chosica - Lima, Perú.",
    ],
  },
  ],
};

export function getChapterBySlug(slug: string): Chapter | undefined {
  return LIBRO_1865.chapters.find((c) => c.slug === slug);
}
