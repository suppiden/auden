export interface CraftPoint {
  heading: string;
  body: string;
}

export interface CaseStudyLocale {
  dek: string;
  body: string[][];
  closing: string;
  platformLine: string;
  craft: CraftPoint[];
  deliverableItems: string;
  deliverableCta: string;
  aboutLabel: string;
  aboutBody: string;
  backLabel: string;
  craftLabel: string;
  creditsLabel: string;
  deliverablesLabel: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  category: string;
  videoId: string;
  credits: Credit[];
  deliverableLink?: string;
  content: {
    en: CaseStudyLocale;
    es: CaseStudyLocale;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "bandit-grand-prix",
    client: "Bandit",
    title: "BANDIT GRAND PRIX",
    category: "Sonic Branding",
    videoId: "boZns6DvLl8",
    credits: [
      { role: "Film direction", name: "Anjelica Florendo" },
      { role: "Sonic branding & score", name: "Auden" },
      { role: "Sound design", name: "Auden" },
      { role: "Mix", name: "Auden" },
      { role: "Client", name: "Bandit" },
    ],
    content: {
      en: {
        metaTitle: "Bandit Grand Prix — Sonic Branding Case Study | Auden",
        metaDescription:
          "Auden built the sonic identity for Bandit Grand Prix — a 45-second film by Anjelica Florendo. Electronic score, sound design, and mix for a race that happens inside your head.",
        backLabel: "← Work",
        craftLabel: "Behind the craft",
        creditsLabel: "Credits",
        deliverablesLabel: "Deliverables",
        dek: "Sonic branding for a film by Anjelica Florendo. 45 seconds. The race inside her head.",
        body: [
          [
            "The Bandit Grand Prix runs on a closed 1km circuit — the same street, lap after lap, never the same race. Anjelica moved that idea somewhere else: into the runner's head, where a sports commentator narrates every doubt out loud, as if the race were being broadcast from inside.",
          ],
          [
            "The commentator was the center of the film. Our work: everything around her. The viewer had to know what 8km in feels like — when your own head starts running against you — and for that, the world around her had to fold in on itself: two broadcasts of the same moment, one from the asphalt, one from inside, holding each other up and tearing at each other.",
          ],
          [
            "The 45-second arc opens grounded in reality: steps, breath, traffic, and a track playing softly as if leaking from her headphones. Hard cut. We enter the loop, in black and white, and that same track rises — from background layer to full score, like a drop. The commentator appears. Breath and stride sync to the electronic pulse, until a bench appears in her path. The music cuts dead.",
            "Slow motion. She looks at the bench, then forward. Into that silence drop the pitched tone, the dizziness, the vacuum pulling the viewer inward. She decides to keep going, and the sound climbs back: color, city, the watch beeping the end of the lap. A breath of relief. Bandit.",
          ],
        ],
        closing:
          "One contrast carries the whole piece: internal chaos, external calm. The real race was never on the road. It was inside her.",
        platformLine: "The loop doesn't change. You do.",
        craft: [
          {
            heading: "The music as transport.",
            body: "The track starts as if leaking from her headphones — small, compressed, distant. At the cut to the loop, it doesn't change: it rises. From ambient layer to full score, like a drop. The music moves from diegetic to non-diegetic without transition and becomes the engine of the entire piece. It's the music — not the edit — that carries the viewer from outside to inside.",
          },
          {
            heading: "Electronic pulse synced to the body.",
            body: "Inside the loop, the electronic base locks to the BPM of breath and stride. Steps, breath and pulse work as a single rhythmic organism — the piece feels organic, even though the music is synthetic.",
          },
          {
            heading: "The bench as floor drop.",
            body: "The moment of doubt isn't carried by more sound, but by less. When she sees the bench, the music cuts dead. Onto that silence drop the pitched tone, the dizziness, the vacuum. The temptation to stop has its own texture — the sound of losing your footing. Only when she decides to keep going does the sound start to climb again.",
          },
        ],
        deliverableItems: "Original electronic score & production · Sound design · Mix",
        deliverableCta: "Listen to the score →",
        aboutLabel: "About Bandit",
        aboutBody:
          "Brooklyn-born running brand, founded in 2020. Performance apparel and community for people who race themselves. Its own event, the F1-inspired Bandit Grand Prix, runs on a 1km warehouse loop in Brooklyn — the real circuit behind the film.",
      },
      es: {
        metaTitle: "Bandit Grand Prix — Case Study de Sonic Branding | Auden",
        metaDescription:
          "Auden creo la identidad sonora del Bandit Grand Prix — un film de 45 segundos de Anjelica Florendo. Score electronico, diseno sonoro y mezcla para una carrera que ocurre dentro de tu cabeza.",
        backLabel: "← Trabajo",
        craftLabel: "Detras de la pieza",
        creditsLabel: "Creditos",
        deliverablesLabel: "Entregables",
        dek: "Sonic branding para un film de Anjelica Florendo. 45 segundos. La carrera dentro de su cabeza.",
        body: [
          [
            "El Bandit Grand Prix se corre sobre un circuito cerrado de 1 km — la misma calle, vuelta tras vuelta, el mismo trazado y nunca la misma carrera. Anjelica traslado esa idea a otro lugar: la cabeza de la corredora, donde una comentarista deportiva narra cada duda en voz alta, como si la carrera se retransmitiera por dentro.",
          ],
          [
            "La comentarista era el centro del film. Nuestro trabajo, todo lo que la rodea. El espectador tenia que sentirse como cuando llevas 8 km y la cabeza empieza a competir contigo — y para eso el mundo alrededor tenia que doblarse: dos retransmisiones del mismo momento, una desde el asfalto, otra desde la cabeza, sosteniendose a la vez y en conflicto.",
          ],
          [
            "El arco de 45 segundos arranca pegado a la realidad: pasos, respiracion, trafico, y una musica de fondo que suena como si saliera de sus cascos. Corte seco. Entramos al loop, en blanco y negro, y esa misma musica se eleva — pasa de fondo a primer plano, como un drop. La comentarista aparece. Aliento y zancada se sincronizan al pulso electronico hasta que, sin previo aviso, aparece un banco en el camino. La musica se corta de golpe.",
            "Slow motion. Ella mira al banco, luego al frente. En ese vacio entran el tono pitcheado, el vertigo y el vacuum que tiran del espectador hacia dentro. Decide seguir, y el sonido remonta: vuelve el color, vuelve la ciudad, el reloj pita el final de la vuelta. Una respiracion de alivio. Bandit.",
          ],
        ],
        closing:
          "Toda la pieza descansa sobre un solo contraste: caos interior, calma exterior. La verdadera carrera nunca estuvo en la calle. Estaba dentro.",
        platformLine: "The loop doesn't change. You do.",
        craft: [
          {
            heading: "La musica hace el transporte.",
            body: "El tema arranca como si saliera de sus cascos — pequeno, comprimido, lejos. En el corte al loop no se cambia: se eleva. De fondo ambiental a score completo, como un drop. La musica pasa de diegetica a no-diegetica sin transicion y se convierte en el motor del resto de la pieza. Es ella la que lleva al espectador del exterior al interior, no el montaje.",
          },
          {
            heading: "La pulsacion electronica sincronizada al cuerpo.",
            body: "Una vez dentro del loop, la base electronica se ancla al BPM de la respiracion y la zancada. Pasos, aliento y pulso musical funcionan como un mismo organismo ritmico — la pieza se siente organica aunque la musica sea sintetica.",
          },
          {
            heading: "El banco como caida del fondo.",
            body: "El momento de duda no se acompana con mas sonido, sino con menos. Cuando ella ve el banco, la musica se corta de golpe. Sobre ese silencio aterrizan el tono pitcheado, el vertigo y el vacuum. La tentacion de parar tiene su propia textura, y es la de quedarse sin suelo. Solo cuando ella decide seguir, el sonido empieza a remontar.",
          },
        ],
        deliverableItems: "Banda sonora electronica original · Diseno sonoro · Mezcla",
        deliverableCta: "Escuchar el score →",
        aboutLabel: "Sobre Bandit",
        aboutBody:
          "Marca de running nacida en Brooklyn, fundada en 2020. Ropa tecnica y comunidad para quien corre contra si mismo. Su propio evento, el Bandit Grand Prix — inspirado en la Formula 1 —, se corre sobre un circuito de 1 km dentro de un almacen de Brooklyn: el trazado real detras del film.",
      },
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
