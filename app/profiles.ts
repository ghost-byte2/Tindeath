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
    bio: "Dev.software, eu ja tomei 6 litros de café, introvertido nao muito sociavel,mas pode me chama ai... 👨‍💻😅.",
  },
  {
    id: "p3",
    name: "Maria luiza",
    age: 20,
    photos: [
        "/profiles/meg3.png",
        "/profiles/meg2.png",
        "/profiles/meg.png",
    ],
    bio: "Uma pessoa que tem amor propio e sou feliz do jeito que sou, estudante de teatro, e stremer na roxinha nas horas vagas...",
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
    name: "Vanessa",
    age: 27,
    photos: [
        "/profiles/vanessa.png",
        "/profiles/vanessa2.png",
        "/profiles/vanessa3.png",
    ],
    bio: "Professora de estetica.Alguem cuja a personalidade intensa a viver com amor. Amo SOAD. gosto de jogar video game",
  },
   {
    id: "p8",
    name: "Beatriz",
    age: 45,
    photos: [
        "/profiles/beatriz1.png",
        "/profiles/beatriz2.png",
        "/profiles/beatriz3.png",
    ],
    bio: "Estudante de cinema. Apaixonada por livros de ficção científica, um bom filme e por noites longas.",
  },
];
export const FINAL_DAY_PROFILES: Profile[] = [
 {
  id: "f1",
  name: "ANOMALIE",
  age: 10,
  photos: [
    "/anomalies/mulher3.png",
    "/anomalies/mulher3.png",
    "/anomalies/mulher3.png",
  ],
  bio: "ANOMALIA-087 Ocupação:ERR_LOG_anomalie .User Error_GET-OUT Aviso: SORRIA...  "
},
  {
    id: "f2",
    name: "DOn't LOOCK",
    age: 10,
    photos: [
      "/anomalies/felipe2.png",
      "/anomalies/felipe2.png",
      "/anomalies/felipe2.png",
    ],
    bio: " Anomalie-450 Ocupaçao:ERROR_[USER] Falha. IDENTIDADE SUBSTITUÍDA - Aviso: Caso voce encontrar nao perca o foco fique de olho nele"
  },  
   {
    id: "f3",
    name: "HELP US",
    age: 10,
   photos: [
      "/anomalies/meg2.png",
      "/anomalies/meg2.png",
      "/anomalies/meg2.png"
    ],
    bio: " Anomalie-250 Ocupaçao:ERROR_CRITICAL.ANOMALIES as null AVISO: Caso receba uma mensagem dela, não responda.A entidade pode solicitar ajuda, fazer perguntas costumam preceder falhas críticas."
  },  
    {
    id: "f4",
    name: "USER.FOUND(anomalie)",
    age: 10,
    photos: [
      "/anomalies/lucas4.png",
      "/anomalies/lucas4.png",
      "/anomalies/lucas4.png"
    ],
    bio: " Anomalie-0 ocupaçao: ERROR_[ANOMALIA_HOST] as find user() aviso: ele sabera te ajudar Siga as regras do jogo e ficara bem "
  },  
    {
    id: "f5",
    name: "THE TRUTH",
    age: 10,
    photos: [
      "/anomalies/camila2.png",
      "/anomalies/camila2.png",
      "/anomalies/camila2.png"
    ],
    bio: "Anomalie-333 | ERRO_FATAL: ANOMALIE_TEXT.REPORT> AVISO: Caso voce a encontre voce podera fazer uma pergunta | ela exigira o preço "
  },  
   {
    id: "f6",
    name: "Continue... |ERRO_USER",
    age: 10,
    photos: [
      "/anomalies/marlon1.png",
      "/anomalies/marlon1.png",
      "/anomalies/marlon1.png"
    ],
    bio: "ANOMALIA-087Ocupação:ERR_LOG_anomalie Médica.Entidades associadas: 3 pessoas.Comportamento: Hostil a mentiras.Aviso: Não encare seus olhos por mais de 10 segundos."
  }, 
    {
    id: "f7",
    name: "ANOMALIA_?|ERRO_USER",
    age: 10,
    photos: [
      "/anomalies/vanessa2.png",
      "/anomalies/vanessa2.png",
      "/anomalies/vanessa2.png"
    ],
    bio: "ANOMALIA-56 ERROR_ANOMALIES:LOG:DEAD - AVISO: Caso voce a encontre voce foi liberto nao se desespere Testemunhas relatam uma sensação de paz antes da manifestação da anomalia"
  },  
   {
    id: "f8",
    name: "ERRO_USER | Continue...",
    age: 10,
    photos: [
      "/anomalies/beatriz1.png",
      "/anomalies/beatriz1.png",
      "/anomalies/beatriz1.png"
    ],
    bio: "ANOMALIA-087Ocupação:ERR_LOG_anomalie Médica.Entidades associadas: 3 pessoas.Comportamento: Hostil a mentiras.Aviso: Se voce encontrar ele sinta se em casa."
  },  
];


export const ANOMALY_NAMES = [
  "Marisa",
];
export const ANOMALY_AGE = [
  60,22,27,41,32,100
]

export const PROFILE_BIO_ANOMALIES: Record<string, string[]> = {
  p1: [
    "Estudante de Biologia, amante da natureza e do mundo, sempre em busca de novas aventuras. Principalmente à noite.",
    "Estudante de Biologia. Sempre em busca de novas aventuras. A próxima começa quando você apagar a luz."
  ],

  p2: [
   "Dev.software, eu ja tomei 6 litros de café, introvertido nao muito sociavel, mas pode me chamar ai... 👨‍💻😅 Ultimo acesso: agora.",
   "Dev.software, eu ja tomei 6 litros de café, introvertido nao muito sociavel, mas pode me chamar ai Você deixou sua câmera ligada... 👨‍💻😅."
  ],

  p3: [
   "Alguem cuja mente conturbada precisa de uma ancora pra ficar em pe, atriz, e stremer na roxinha nas horas vagas..."
  ],
   p4: [
    "Guitarrista nas horas vagas, Sinto que ja nos falamos antes,Toco em bandas de rock indie.",
    "Guitarrista nas horas vagas, programador no resto. Toco em bandas de rock indie,Alguém continua cantando quando o palco fica vazio."
  ],
   p5: [
    "Médica veterinária. Tenho 3 gatos e zero paciência para mentiras. Gosto de um bom vinho e de um bom papo sobre filmes de terror.Eles ficaram olhando para a porta a noite toda..",
  ],
   p6: [
    "Tatuador há 10 anos.Gosto de academia e  de correr. Procuro conversa boa prefiro conversar pessoalmente em um lugar qualquer a noite."
  ],
    p7: [
    "Professora de estetica. cuja personalidade Ai professora que materia dificil😅. Amo SOAD. gosto de video games.",
  ],
   p8: [
    "Estudante de Matematica. Apaixonada por livros de algoritimos, um bom filme e por noites longas.",
  ],
  
};
export const PROFILE_NAME_ANOMALIES: Record<string,string[]> = {
  p1: [
    "Marisa"
  ],
  p2: [
    "Lipe"
  ],
  p3: [
    "MegLuuh"
  ],
  p4: [
    "Luck"
  ],
  p5: [
    "Carolina"
  ],
  p6: [
    "MATHEUS"
  ],
  p7 : [
    "Vanessinhaww"
  ],
  p8: [
    "Bianca"
  ],
}
type PhotoSlot = 0 | 1 | 2;


export const PROFILE_ANOMALIES: Record<
  string,
  Partial<Record<PhotoSlot, string[]>>
> = {
   p1: {
    0: [
      "/anomalies/marina2.png",  
    ],
    2: [
      "anomalies/marina.png",
    ],
  },
     p2: {
    2: [
      "/anomalies/felipe1.png",
    ],
  },
    p3: {
    2: [
      "/anomalies/juliana4.png",
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
     "/anomalies/marlon1.png"
    ],
    2: [
       "/anomalies/marlon2.png", 
    ],
  },
  p7 : {
    1:[
      "/anomalies/vanessa.png"
    ],
  },
     p8: {
    2: [
       "/anomalies/beatriz2.png",
    ],
  },

};

export type AnomalyKind = "name" | "photo" | "bio" |"age";

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
  if (day === 10) {
  return FINAL_DAY_PROFILES.map((p) => ({
    ...p,
    hasAnomaly: true,
  }));
}

  const rand = mulberry32(hashStr(`${runSeed}::day-${day}`));

  // 75% chance the day has a single anomaly hidden among the 7 profiles.
  // The other 25%, the day is completely clean — the player must trust nothing.
  const dayHasAnomaly = rand() < 0.75;
  const baseline = CANONICAL_PROFILES.map((p) => ({ ...p, hasAnomaly: false }));
  if (!dayHasAnomaly) return baseline;

 const targetIdx = Math.floor(rand() * CANONICAL_PROFILES.length);

let kind: AnomalyKind;
if (day <= 4) {
  kind = ["name", "age", "bio","photo"][
    Math.floor(rand() * 4)
  ] as AnomalyKind;
} else if (day <= 5) {
  kind = "bio";
} else if (day === 6) {
  kind = ["age", "bio"][
    Math.floor(rand() * 2)
  ] as AnomalyKind;
} else {
  kind = "photo";
}

const p = CANONICAL_PROFILES[targetIdx];


const modified: DayProfile = {
  ...p,
  hasAnomaly: true,
  anomalyKind: kind,
};
if (kind === "name") {
   const nameAnomalies = PROFILE_NAME_ANOMALIES[p.id];
   if(nameAnomalies?.length){
    modified.name =
    nameAnomalies[
      Math.floor(rand() * nameAnomalies.length)
    ];
   }

} else if (kind === "bio") {
  const bioAnomalies = PROFILE_BIO_ANOMALIES[p.id];
  if (bioAnomalies?.length) {
    modified.bio =
      bioAnomalies[
        Math.floor(rand() * bioAnomalies.length)
      ];
  }

} else if (kind === "age") {
  modified.age =
    ANOMALY_AGE[Math.floor(rand() * ANOMALY_AGE.length)];

} else if (kind === "photo") {
  const profileAnomalies = PROFILE_ANOMALIES[p.id];

  if (profileAnomalies) {
    const availableSlots = Object.keys(profileAnomalies).map(
      (k) => Number(k) as 0 | 1 | 2
    );

    if (availableSlots.length > 0) {
      const slot =
        availableSlots[Math.floor(rand() * availableSlots.length)];

      const anomalyOptions = profileAnomalies[slot];

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
}
baseline[targetIdx] = modified;
return baseline;
}