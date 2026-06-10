"use client";
import { useEffect, useMemo, useState,useRef } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Heart, X, Skull, Flame } from "lucide-react";
import { generateDay, type DayProfile } from "./profiles";
import { Undo2 } from "lucide-react";
import { FINAL_DAY_PROFILES } from "./profiles";
import { Input } from "./components/ui/input";

type Phase =
  | "story"
  | "intro"
  | "swiping"
  | "verdict"
  | "match" 
  | "result"
  | "jumpscare"
  | "reward"
  | "systemError"
  | "won";

const STORAGE_KEY = "tindeath::v1";
type Save = { day: number; runSeed: string };
function loadSave(): Save {
  if (typeof window === "undefined") return { day: 1, runSeed: "seed-1" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Save;
  } catch {}
  return { day: 1, runSeed: `seed-${Date.now()}` };
}

function saveSave(s: Save) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

export default function TindeathGame() {
 const [save, setSave] = useState<Save>({
  day: 1,
  runSeed: `seed-${Date.now()}`,
});
  const [phase, setPhase] = useState<Phase>("story");
  const [index, setIndex] = useState(0);
  const [swipes, setSwipes] = useState<("match" | "reject")[]>([]);
  const [lastWrong, setLastWrong] = useState<string | null>(null);
  const [pendingDeath, setPendingDeath] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const JUMPSCARES = [
  "/monstro.png",
];

const [matchedAnomaly, setMatchedAnomaly] = useState<DayProfile | null>(null);
const profileIndex = Number(
  matchedAnomaly?.id.replace(/[pf]/g, "") ?? 1
) - 1;
const finalProfile = FINAL_DAY_PROFILES[profileIndex];
const [anomalyMessage, setAnomalyMessage] = useState("");
const [typing, setTyping] = useState(false);
function restartAudio() {
  if (audioRef.current) {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }
}

  const profiles = useMemo<DayProfile[]>(
    () => generateDay(save.runSeed, save.day),
    [save.runSeed, save.day],
  );
  const anomaliesExist = profiles.some((p) => p.hasAnomaly);
  const startedAudioRef = useRef(false);
useEffect(() => {
  const audio = new Audio("/haha2.mp3");
  audio.loop = true;
  audio.volume = 0.2;
  audioRef.current = audio;
  audioRef.current.play();
  return () => {
    audio.pause();
  };
}, []);
 function startDay() {
  setIndex(0);
  setSwipes([]);
  setLastWrong(null);
  setPhase("swiping");

  if (!startedAudioRef.current) {
    restartAudio();
    startedAudioRef.current = true;
  }
}
  function goBack() {
  if (index > 0) {
    setIndex(index - 1);
    setSwipes((prev) => prev.slice(0, -1));
  }
}
const [userMessage, setUserMessage] = useState("");
const [sentMessage, setSentMessage] = useState("");
useEffect(() => {
  if (phase !== "match") return;

  const timer = setTimeout(() => {
    if (!userMessage.trim() && matchedAnomaly) {
      sendMessage();
    }
  }, 10000);

  return () => clearTimeout(timer);
}, [phase, userMessage, matchedAnomaly]);
 function swipe(dir: "match" | "reject") {
  const next = [...swipes, dir];
  setSwipes(next);
  const current = profiles[index];
  if (
    dir === "match" &&
    current?.hasAnomaly &&
    save.day !== 1 &&
    save.day !== 10
  ) {
    setMatchedAnomaly(current);
    setAnomalyMessage("");
    setTyping(false);
    setPhase("match");
    return;
  }
  if (index + 1 >= profiles.length) {
    setPhase("verdict");
  } else {
    setIndex(index + 1);
  }
}
const creepyMessages = [
  "oi... eu já tô na sua porta haha",
  "valeu pelo match agora... não se vire.",
  "vc mora no número {n}, certo? to subindo.",
  "te vi pela janela agora. continua deslizando.",
  "vc não devia ter dado match comigo...",
  "gostei da blusa que vc tá usando agora.",
  "oi cheguei...abre a porta, tá frio"
];
function sendMessage() {
  if (!matchedAnomaly) return;

  setSentMessage(userMessage);
  setUserMessage("");

  setTimeout(() => {
    setTyping(true);

    const msg =
      creepyMessages[
        Math.floor(Math.random() * creepyMessages.length)
      ].replace(
        "{n}",
        String(Math.floor(Math.random() * 999))
      );

    let i = 0;

    const interval = setInterval(() => {
      i++;
      setAnomalyMessage(msg.slice(0, i));

      if (i >= msg.length) {
        clearInterval(interval);

        setTimeout(() => {
          const reset = {
            day: 1,
            runSeed: `seed-${Date.now()}`
          };

          setSave(reset);
          saveSave(reset);

          setLastWrong(
            `Você deu match com ${matchedAnomaly.name}. Era uma anomalia.`
          );

          restartAudio();
          setPendingDeath(true);
          setPhase("jumpscare");
        }, 1800);
      }
    }, 60);
  }, 1000);
}
 function Jumpscare({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [image] = useState(
    () =>
      JUMPSCARES[
        Math.floor(Math.random() * JUMPSCARES.length)
      ]
  );
  useEffect(() => {
   
    const timer = setTimeout(() => {
      onFinish();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-black animate-pulse">
      <img
        src={image}
        alt="Jumpscare"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

 function answer(foundAnomaly: boolean) {
  // Dia 1: nunca mata o jogador
  if (save.day === 1) {
    const next = { ...save, day: 2 };
    setSave(next);
    saveSave(next);
    setPhase("result");
    return;
  }
  if (save.day === 10) {
  setPhase("won");
  return;
}
  const correct = foundAnomaly === anomaliesExist;

 if (!correct) {
  const next = { day: 1, runSeed: `seed-${Date.now()}` };
  setSave(next);
  saveSave(next);

  setLastWrong(
    anomaliesExist
      ? "Havia anomalia. Você não percebeu. Ela já está em sua casa..."
      : "Ele te encontrou. Você não percebeu. É tarde demais..."
  );
 restartAudio();
  setPendingDeath(true);
  setPhase("jumpscare");
  return;
}
  if (save.day == 9) {
    restartAudio();
    setPhase("reward");
    return;
  }
  const next = { ...save, day: save.day + 1 };
  setSave(next);
  saveSave(next);
  setPhase("result");
}
  function resetRun() {
    const next = { day: 1, runSeed: `seed-${Date.now()}` };
    setSave(next);
    saveSave(next);
    setPhase("intro");
    restartAudio();
  }

 function RewardIntro({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [step, setStep] = useState(0);
  const texts = [
     "...",
    "Parabens Você sobreviveu.",
    "Ninguém chegou tão longe...",
    "Eles estao felizes por voce.",
    "Voce se comportou tão bem",
    "agora eles estao te esperando...",
    "",
    "para receber sua recompensa :)"
  ];
  useEffect(() => {
    if (step < texts.length - 1) {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [step]);
  
  return (
    <Card className="p-8 bg-black border-0 text-center">
      <div className="min-w-[300px] min-h-[250px] flex items-center justify-center">
<p
  key={`text-${step}`}
  className="text-lg text-red-100 animate-in fade-in duration-1000"
>
  {texts[step]}
</p>
      </div>

      {step === texts.length - 1 && (
        <Button
          onClick={onContinue}
          className="w-full bg-red-700 hover:bg-red-800"
        >
          Receber recompensa
        </Button>
      )}
    </Card>
  );
}

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-6">
       {phase !== "story" && <Header day={save.day} />}
      <div className="w-full max-w-md flex-1 flex flex-col items-stretch justify-center">
        {phase === "story" && (
  <StoryIntro onContinue={() => setPhase("intro")} />
)}

{phase === "systemError" && (
  <SystemError
    onFinish={() => {
      const next = {
        ...save,
        day: 10,
      };

      setSave(next);
      saveSave(next);

      setPhase("intro");
    }}
  />
)}
{phase === "intro" && (
  <Intro onStart={startDay} day={save.day} />
)}
        {phase === "swiping" && (
          <SwipeView
  profile={profiles[index]}
  index={index}
  total={profiles.length}
  onSwipe={swipe}
  onBack={goBack}
  day={save.day}
/>
        )}
        
    {phase === "match" && matchedAnomaly && (() => {
  const profileIndex = Number(
    matchedAnomaly.id.replace(/[pf]/g, "")
  ) - 1;
  const finalProfile = FINAL_DAY_PROFILES[profileIndex];
  return (
   <div className="  fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-rose-500 via-red-500 to-red-800 p-6 animate-in fade-in duration-500">
    <h1 className="text-5xl font-bold mb-2 tracking-wider drop-shadow-lg">
      It's a Match!
    </h1>
    <Heart></Heart>
    <p className="text-white/90 mb-8 text-center">
      Você e {matchedAnomaly.name} curtiram um ao outro
    </p>

    <div className="flex items-center gap-4 mb-8">
  <img
  src={finalProfile?.photos[0] ?? matchedAnomaly.photos[1]}
  alt={matchedAnomaly.name}
  className="w-70 h-70 rounded-full object-cover shadow-2xl"
/>
    </div>
    <Card className=" border-2 border-red-800 w-full max-w-sm p-4 mb-4 min-h-[80px] bg-white">
     {sentMessage && (
    <div className="mb-3 text-right">
      <span className="text-xs text-gray-500">Você</span>
      <p className="text-black">{sentMessage}</p>
    </div>
  )}
  

  {anomalyMessage && (
    <div>
      <span className="text-xs text-gray-500">
        {matchedAnomaly.name}
      </span>
      <p className="text-black">
        {anomalyMessage}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  )}
      {anomalyMessage ? (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-black text-muted-foreground">
            {matchedAnomaly.name}
          </span>
        </div>
      ) : (  
       
 <Input
  value={userMessage}
  onChange={(e) => setUserMessage(e.target.value)}
  placeholder="Digite uma mensagem..."
  className="w-full !bg-white max-w-sm !border-red-800 placeholder:text-zinc-400 text-black"
/>

      )}
    </Card>

    <Button
      onClick={sendMessage}
      disabled={typing}
      size="lg"
      className=" border border-white/40 w-full max-w-sm bg-red-400 text-white hover:bg-white/90 font-bold"
    >
      {typing ? "Digitando..." : "Enviar mensagem"}
    </Button>
  </div>

  );
})()}


        {phase === "reward" && (
  <RewardIntro
    onContinue={() => {
      const next = {
        ...save,
        day: 10,
      };

      setSave(next);
      saveSave(next);

      setPhase("systemError");
    }}
  />
)}
        {phase === "verdict" && <Verdict onAnswer={answer} day={save.day} />}
        {phase === "jumpscare" && (
  <Jumpscare
    onFinish={() => {
      setPhase("result");
    }}
  />
)}
        {phase === "result" && (
          <ResultView
            died={!!lastWrong}
            message={lastWrong}
            nextDay={save.day}
            onNext={() => setPhase("intro")}
            onReset={resetRun}
          />
        )}
        {phase === "won" && <WonView onReset={resetRun} />}
      </div>
      <Footer />
    </main>
  );
}
function StoryIntro({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [step, setStep] = useState(0);

  const texts = [
    "ultimos dias de junho de 2026...",
    "Há três semanas surgiu um aplicativo de relacionamento chamado Tindeath.",
    "Ninguém sabe quem o criou.",
    "Pessoas começaram a desaparecer após usar.",
    "Os perfis aparecem durante 9 dias e...",
    "mudam durante a noite.",
    "Às vezes... nada muda.",
    "Identifique as anomalias. Recuse o match.",
    "se sobreviver a 9 dias... Voce vence!",
    "Mas se você errar...",
    "Eles encontram você.",
    " haha! boa sorte :)"
  ];

 useEffect(() => {
  if (step < texts.length - 1) {
    const timer = setTimeout(() => {
      setStep((s) => s + 1);
    }, 2100);

    return () => clearTimeout(timer);
  }
  const redirectTimer = setTimeout(() => {
    onContinue();
  }, 1000);

  return () => clearTimeout(redirectTimer);
}, [step, onContinue]);


 return (
  
  <Card className="p-8 bg-black border-0 text-center min-h-[350px] flex flex-col justify-between">
    <div className="flex-1 flex items-center justify-center">
      <p
        key={step}
        className="text-lg text-red-100 animate-in fade-in duration-1000"
      >
        {texts[step]}
      </p>
    </div>

    <div className="flex justify-end">
      <button
        onClick={onContinue}
        className="px-4 py-2 text-sm text-white/40 hover:text-gray-300 transition-colors"
      >
        Pular introdução
      </button>
    </div>
  </Card>
);
}
function SystemError({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [showErrorScreen, setShowErrorScreen] = useState(false);

  const texts = [
    "Inicializando sistema...",
    "Verificando integridade dos perfis...",
    "Nenhuma anomalia encontrada.",
    "ERRO DE IDENTIFICAÇÃO.",
    "USUÁRIO NÃO RECONHECIDO.",
    "REANALISANDO...",
  ];

  // Passa pelos textos
  useEffect(() => {
    if (step < texts.length - 1) {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Terminou os textos
    const timer = setTimeout(() => {
      setShowErrorScreen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [step]);

  // Tela de erro final
  useEffect(() => {
    if (!showErrorScreen) return;

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [showErrorScreen, onFinish]);

  if (!showErrorScreen) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p
          key={step}
          className="text-red-500 text-2xl font-bold animate-in fade-in duration-500"
        >
          {texts[step]}
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-red-500">
      <h1 className="text-6xl font-black animate-pulse">
        SYSTEM ERROR
      </h1>

      <p className="mt-6 text-xl">
        Falha ao carregar recompensa...
      </p>

      <p className="mt-2 text-sm opacity-70">
        Código: 0x0000A-NOMALY
      </p>
    </div>
  );
}

function Header({ day }: { day: number }) {
  return (
    <header className="w-full max-w-md flex items-center justify-between pb-4">
      <div className="flex items-center gap-2">
        <Flame className="size-6 text-primary" />
        <span className="font-black tracking-tight text-xl">
          tin<span className="text-primary">death</span>
        </span>
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Dia <span className="text-primary font-bold">{day}</span> / 9
      </div>
    </header>
  );
}

function Footer() {
  return (
    <p className="pt-6 text-[10px] uppercase tracking-widest text-muted-foreground">
      9 dias. 7 perfis. Uma chance.
    </p>
  );
}

function Intro({ onStart, day }: { onStart: () => void; day: number }) {
 useEffect(() => {
  if (day > 1 && day !== 10) {
    onStart();
  }
}, [day, onStart]);
  function FinalDayIntro({
  onStart,
}: {
  onStart: () => void;
}) {
  const [step, setStep] = useState(0);

  const texts = [
    "voce acordou...dia 10",
  ];

  useEffect(() => {
    if (step < texts.length - 1) {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, 2500);
        return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onStart();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, onStart]);

  return (
     <Card className="p-8 bg-black text-center border-0">
      <div className="min-w-[300px] min-h-[250px] flex items-center justify-center">
        <h2
          key={step}
          className="flex align-center text-center text-2xl font-black text-primary animate-in fade-in duration-1000"
        >
          {texts[step]}
        </h2>
      </div>
    </Card>
  );
}
 if (day === 10) {
  return <FinalDayIntro onStart={onStart} />;
}

  return (
    <Card className="p-6 space-y-4 border border-white/10">
      <h1 className="text-3xl font-black leading-tight">
        {day === 1 ? "Bem-vindo ao Tindeath." : `Dia ${day}.`}
        
      </h1>

      {day === 1 && (
        <>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hoje você verá os 7 perfis na forma original. Memorize cada nome,
            foto e bio. Nos próximos dias, algo pode mudar — ou não. Encontre as
            anomalias e recuse o match.
          </p>

          <Button onClick={onStart} className="w-full bg-white text-black hover:bg-gray-200" size="lg">
            Entrar no app
          </Button>
        </>
      )}
    
    </Card>
  );
  
}
function SwipeView({
  profile,
  index,
  total,
  onSwipe,
  onBack,
  day,
}: {
  profile: DayProfile;
  index: number;
  total: number;
  onSwipe: (d: "match" | "reject") => void;
  onBack: () => void;
  day: number;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);
  // Reset photo when profile changes
  useEffect(() => {
    setPhotoIdx(0);
  }, [day, index]);
  const photoCount = profile.photos.length;
  return (
    <div className="space-y-1">
      <div className="flex justify-center">
      <Card
        key={`${day}-${index}`}
        className="overflow-hidden border border-white/30 bg-card animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="relative w-full bg-muted">
           <img
    className="h-110 sm:h-20 md:h-120 lg:h-150 w-full object-cover"
    src={profile.photos[photoIdx]}
    alt=""
  />
          {/* Tinder-style photo segments */}
          <div className="absolute top-2 inset-x-2 flex gap-1">
            {Array.from({ length: photoCount }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i === photoIdx ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
          {/* Left / right tap zones */}
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() =>
              setPhotoIdx((p) => (p - 1 + photoCount) % photoCount)
            }
            className="absolute left-0 top-0 h-full w-1/2 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={() => setPhotoIdx((p) => (p + 1) % photoCount)}
            className="absolute right-0 top-0 h-full w-1/2 focus:outline-none"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/80 to-transparent p-4">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-black">{profile.name}</h2>
              <span className="text-xl font-light text-muted-foreground">
                {profile.age}
              </span>
            </div>
          </div>
        </div>
        {/* Thumbnail strip */}
        <div className="p-4">
          <p className="text-sm leading-relaxed text-foreground/90 h-15">
            {profile.bio}
          </p>
        </div>
      </Card>
      </div>
      <div className="flex items-center justify-center gap-20 pt-2">
          <button
    onClick={onBack}
    disabled={index === 0}
    className="size-16 rounded-full border-2 border-white bg-yellow-600 flex items-center justify-center"
  >
    <Undo2 className="" />
  </button>
        <button
          onClick={() => onSwipe("reject")}
          aria-label="Recusar"
          className="size-16 rounded-full border-2 border-destructive bg-card text-destructive flex items-center justify-center text-white transition-colors active:scale-95 bg-red-700"
        >
          <X className="size-7" />
        </button>
        <button
          onClick={() => onSwipe("match")}
          aria-label="Match"
          className="size-16 rounded-full border-2  flex items-center justify-center transition-colors active:scale-95 bg-green-700"
        >
          <Heart className="bg-green-700 text-white" />
        </button>
      </div>
    </div>
  );
}

function Verdict({
  onAnswer,
  day,
}: {
  onAnswer: (foundAnomaly: boolean) => void;
  day: number;
}) {
  return (
    <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Fim do dia {day}
        </p>
        <h2 className="text-2xl font-black mt-1">
          Você notou alguma anomalia hoje?
        </h2>
      <br></br>
      <div className="grid grid-cols-2 gap-3">
        <Button
         
          size="lg"
          onClick={() => onAnswer(true)}
          className=" bg-black font-bold border border-red-700 hover:bg-red-700"
        >
          Sim, havia
        </Button>
        <Button
          size="lg"
          onClick={() => onAnswer(false)}
          className=" bg-black font-bold border border-green-700 hover:bg-green-700"
        >
          Tudo normal
        </Button>
      </div>
      </div>
  );
}

 function ResultView({
  died,
  message,
  nextDay,
  onNext,
  onReset,
}: {
  died: boolean;
  message: string | null;
  nextDay: number;
  onNext: () => void;
  onReset: () => void;
}) {
  useEffect(() => {
    if (!died) {
      const timer = setTimeout(() => {
        onNext();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [died, onNext]);

  if (died) {
    return (
  <div>
        <div className="flex items-center gap-3 bg-red-600">
          <Skull className="size-8  " />
          <h2 className="text-3xl font-black ">Você morreu.</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-10 ml-5">
          {message}
        </p>
        <Button onClick={onReset} size="lg" className="w-full bg-black  hover:bg-black">
          Tentar de novo
        </Button>
     </div>
    );
  }
  return (
    <div>
      <h2 className=" flex align-center text-center text-2xl font-black text-primary ml-20"> Você acordou...Dia {nextDay}</h2>
 </div>
  );
}

function WonView({ onReset }: { onReset: () => void }) {
  const [step, setStep] = useState(0);

  const texts = [
  "",
  "Reiniciando sistema...",
  "Restabelecendo conexão...",
  "System success: Anomalias removidas.Perfis corrompidos apagados.",
  "voce conseguiu.",
  "As notificações finalmente pararam.",
  "Mas algumas perguntas continuam sem resposta.",
  "Talvez seja melhor não descobrir.",
  "Você sobreviveu.",
  "Isso deveria ser suficiente.",
  "...",
  "Adeus.",
  ""
];

  useEffect(() => {
    if (step < texts.length - 1) {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <Card className="p-8 bg-black border-0 text-center">
      <div className="min-w-[300px] min-h-[250px] flex items-center justify-center">
        <p
          key={step}
          className="text-lg text-red-100 animate-in fade-in duration-1000"
        >
          {texts[step]}
        </p>
      </div>

      {step === texts.length - 1 && (
        <Button
          onClick={onReset}
          size="lg"
          className="w-full bg-black text-white"
        >
          Recomeçar
        </Button>
      )}
    </Card>
  );
}