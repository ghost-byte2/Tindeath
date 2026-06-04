export type Profile = {
  id: string;
  name: string;
  age: number;
  photos: [string, string, string]; // 3photo seeds
  bio: string;
};

// The canonical (Day 1) version of the 7 profiles. The player must memorize these.
export const CANONICAL_PROFILES: Profile[] = [
  {
  id: "p1",
  name: "Marina",
  age: 19,
  photos: [
    "/profiles/mulher3.png",
    "/profiles/mulher2.png",
    "/profiles/mulher1.png",
  ],
  bio: "estudante de Biologia, amante da natureza e do mundo, sempre em busca de descorbertas e novas aventuras..."
},
  {
    id: "p2",
    name: "Felipe",
    age: 25,
    photos: [
        "/profiles/homem1.png",
        "/profiles/homem2.png",
        "/profiles/homem3.png",
    ],
    bio: "Dev.software,ja tomei 6 litros de café, introvertido nao muito sociavel,mas pode me chama ai :p.",
  },
  {
    id: "p3",
    name: "Juliana",
    age: 20,
    photos: [
        "/profiles/juliana.png",
        "/profiles/juliana1.png",
        "/profiles/juliana2.png",
    ],
    bio: "Professora de ioga.amo a natureza. Apaixonada em viajar pelo mundo...🌍.",
  },
  {
    id: "p4",
    name: "Lucas",
    age: 29,
    photos: [
        "/profiles/lucas.png",
        "/profiles/lucas2.png",
        "/profiles/lucas3.png",
    ],
    bio: "Guitarrista nas horas vagas, programador no resto. Toco em bandas de rock indie.",
  },
  {
    id: "p5",
    name: "Camila",
    age: 21,
    photos: [
        "/profiles/camila1.png",
        "/profiles/camila2.png",
        "/profiles/camila3.png",
    ],
    bio: "Médica veterinária. Tenho 3 gatos e zero paciência para mentiras.gosto de um bom vinho e de um bom papo sobre filmes de terror.",
  },
  {
    id: "p6",
    name: "Marlon",
    age: 25,
    photos: [
        "/profiles/marlon1.png",
        "/profiles/marlon2.png",
        "/profiles/marlon3.png",
    ],
    bio: "Tatuador há 10 anos.Gosto de academia e fisiculturismo. Procuro conversa boa prefiro conversar pessoalmente em um lugar qualquer.",
  },
  {
    id: "p7",
    name: "Beatriz",
    age: 45,
    photos: [
        "/profiles/beatriz1.png",
        "/profiles/beatriz2.png",
        "/profiles/beatriz3.png",
    ],
    bio: "Estudante de cinema. Apaixonada por livros de ficção científica e um bom filme e por noites longas.",
  },
];


export const ANOMALY_NAMES = [
  "Marisa",
];

export const ANOMALY_BIOS = [
 "estudante de Biologia, voce e meu Eu te vejo dormindo. Você nunca fecha a janela.",
  "Estudante de cinema. Apaixonada por alguém para nunca mais ir embora.", 
     "Médica veterinária. Tenho 3 gatos e zero paciência para mentiras. Eu já estive aí. Você não percebeu.",
];
type PhotoSlot = 0 | 1 | 2;


export const PROFILE_ANOMALIES: Record<
  string,
  Partial<Record<PhotoSlot, string[]>>
> = {
   p1: {
    2: [
      "/anomalies/mulher4.png",
      "/anomalies/mulher2.png",
      
    ],
  },
    p3: {
    0: [
      "/anomalies/juliana1.png",
      "/anomalies/juliana2.png",
    ],
  },
    p4: {
    1: [
      "/anomalies/lucas2.png",
    ],
    2: [
       "/anomalies/lucas3.png",
      
    ],
  },
    p5: {
    1: [
       "/anomalies/camila1.png",
    ],
  },
   p6: {
    1: [
       "/anomalies/marlon1.png", 
    ],
  },
   p7: {
    2: [
       "/anomalies/beatriz1.png",
    ],
  },

};

export type AnomalyKind = "name" | "photo" | "bio";

export type DayProfile = Profile & {
  hasAnomaly: boolean;
  anomalyKind?: AnomalyKind;
  anomalyPhotoIndex?: number; // index 0-2 when anomalyKind === "photo"
};

// Deterministic PRNG so each (run, day) is stable
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function generateDay(runSeed: string, day: number): DayProfile[] {
  // Day 1: always pristine
  if (day === 1) {
    return CANONICAL_PROFILES.map((p) => ({ ...p, hasAnomaly: false }));
  }

  const rand = mulberry32(hashStr(`${runSeed}::day-${day}`));

  // 75% chance the day has a single anomaly hidden among the 7 profiles.
  // The other 25%, the day is completely clean — the player must trust nothing.
  const dayHasAnomaly = rand() < 0.75;
  const baseline = CANONICAL_PROFILES.map((p) => ({ ...p, hasAnomaly: false }));
  if (!dayHasAnomaly) return baseline;

 const targetIdx = Math.floor(rand() * CANONICAL_PROFILES.length);
  const kinds: AnomalyKind[] = ["name", "photo", "bio"];
  const kind = kinds[Math.floor(rand() * kinds.length)];
  const p = CANONICAL_PROFILES[targetIdx];
  const modified: DayProfile = { ...p, hasAnomaly: true, anomalyKind: kind };
  if (kind === "name") {
    modified.name = ANOMALY_NAMES[Math.floor(rand() * ANOMALY_NAMES.length)];
  } else if (kind === "photo") {
const profileAnomalies = PROFILE_ANOMALIES[p.id];

if (profileAnomalies) {
  const availableSlots = Object.keys(profileAnomalies).map(
    (k) => Number(k) as 0 | 1 | 2
  );

  if (availableSlots.length > 0) {
    const slot =
      availableSlots[Math.floor(rand() * availableSlots.length)];

    const anomalyOptions =
      profileAnomalies[slot];

    if (anomalyOptions?.length) {
      const chosenAnomaly =
        anomalyOptions[
          Math.floor(rand() * anomalyOptions.length)
        ];

      const newPhotos = [...p.photos] as [
        string,
        string,
        string
      ];

      newPhotos[slot] = chosenAnomaly;

      modified.photos = newPhotos;
      modified.anomalyPhotoIndex = slot;
    }
  }
}
  } else {
    modified.bio = ANOMALY_BIOS[Math.floor(rand() * ANOMALY_BIOS.length)];
  }
  baseline[targetIdx] = modified;
  return baseline;
}

