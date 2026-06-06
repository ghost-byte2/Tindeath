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
    bio: "Estudante de cinema. Apaixonada por livros de ficção científica, um bom filme e por noites longas.",
  },
];
export const FINAL_DAY_PROFILES: Profile[] = [
 {
  id: "f1",
  name: "ANOMALIA",
  age: 10,
  photos: [
    "/anomalies/mulher3.png",
    "/anomalies/mulher3.png",
    "/anomalies/mulher3.png",
  ],
  bio: "GET-OUT Isso e uma anomalia em nosso sistema GET OUT. ERRO: Perfil não encontrado. [ANOMALIA_DETECTADA]"
},
  {
    id: "f2",
    name: "NAO OLHE",
    age: 10,
    photos: [
      "/anomalies/felipe1.png",
      "/anomalies/felipe1.png",
      "/anomalies/felipe1.png"
    ],
    bio: "Carregando informações do usuário... ERROR_[USER] Falha. IDENTIDADE SUBSTITUÍDA."
  },  
   {
    id: "f3",
    name: "NAO CHORE",
    age: 10,
    photos: [
      "/anomalies/juliana3.png",
      "/anomalies/juliana3.png",
      "/anomalies/juliana3.png"
    ],
    bio: " ME AJUDA... userSendMessage() ERROR_CRITICAL.ANOMALIES >A mensagem nao foi entregue"
  },  
    {
    id: "f4",
    name: "CONTINUE",
    age: 10,
    photos: [
      "/anomalies/marlon1.png",
      "/anomalies/marlon1.png",
      "/anomalies/marlon1.png"
    ],
    bio: "Nao olhe para tras.| ERRO_[ANOMALIA] Você ignorou algo importante."
  },  
    {
    id: "f5",
    name: "CONTINUE",
    age: 10,
    photos: [
      "/anomalies/beatriz1.png",
      "/anomalies/beatriz1.png",
      "/anomalies/beatriz1.png"
    ],
    bio: "deslize um pouco mais...| ERRO_FATAL: Não existem mais perfis válidos."
  },  
   {
    id: "f6",
    name: "Quem sou eu?.|ERRO_USER",
    age: 10,
    photos: [
      "/anomalies/camila1.png",
      "/anomalies/camila1.png",
      "/anomalies/camila1.png"
    ],
    bio: "Sou Marina. Sou Felipe. Sou Juliana. Sou Lucas. Sou Camila. Sou Marlon. Sou Beatriz."
  }, 
   {
    id: "f7",
    name: "Quem sou eu? Continue...",
    age: 10,
    photos: [
      "/anomalies/lucas2.png",
      "/anomalies/lucas3.png",
      "/anomalies/lucas4.png"
    ],
    bio: "Você notou alguma anomalia hoje?.| ERROR_ANOMALIES: ANOMALIA_CRÍTICA > O usuário começou a fazer parte do sistema..."
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
    "Professora de ioga. Amo a natureza. Apaixonada em viajar pelo mundo Mas ultimamente tenho ficado no mesmo lugar...",
    "Professora de ioga. Amo a natureza. Apaixonada em viajar pelo mundo...🌍Olhe para trás quando terminar de ler"
  ],
   p4: [
    "Guitarrista nas horas vagas, artista e musica,Toco em bandas de rock indie.",
    "Guitarrista nas horas vagas, programador no resto. Toco em bandas de rock indie,Alguém continua cantando quando o palco fica vazio."
  ],
   p5: [
    "Médica veterinária. Tenho 3 gatos e zero paciência para mentiras. Gosto de um bom vinho e de um bom papo sobre filmes de terror.Eles ficaram olhando para a porta a noite toda..",
  ],
   p6: [
    "Tatuador há 10 anos.Gosto de academia e  de correr. Procuro conversa boa prefiro conversar pessoalmente em um lugar qualquer a noite."
  ],
   p7: [
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
    "Juju do pix"
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
  p7: [
    "Bianca"
  ],
}
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
     p2: {
    2: [
      "/anomalies/felipe1.png",
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

