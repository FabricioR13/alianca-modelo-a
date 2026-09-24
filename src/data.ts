const px = (id: number, w = 1000, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const COLORS = {
  lilac: "#b377a8",
  aqua: "#9fe0e6",
  coral: "#f2956a",
  sun: "#fbd684",
  tomato: "#f0613e",
  berry: "#d4467c",
  ink: "#2b2445",
};

export const PHOTOS = {
  heroFamily: px(8297589, 900, 900),
  heroMom: px(3905791, 700, 900),
  heroBlocks: px(12956020, 700, 700),
  reveal: px(4589456, 1200, 900),
  about: px(8298525, 900, 1100),
};

export const WHATSAPP = "https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Alian%C3%A7a.";

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  color: string;
  tint: string;
  photo: string;
  icon: string;
};

export const SERVICES: Service[] = [
  {
    id: "aba",
    title: "Terapia ABA",
    short: "Análise do Comportamento Aplicada",
    description:
      "Intervenção baseada em evidências para desenvolver habilidades sociais, de comunicação e autonomia, com planos individualizados e metas mensuráveis.",
    bullets: ["Plano de intervenção individual", "Supervisão por analista do comportamento", "Relatórios de evolução mensais"],
    color: "#b377a8",
    tint: "#f3e4ef",
    photo: px(7117502),
    icon: "🧩",
  },
  {
    id: "psico",
    title: "Psicologia",
    short: "Infantil, adolescente e adulto",
    description:
      "Acolhimento emocional com Terapia Cognitivo-Comportamental, ajudando a lidar com ansiedade, regulação emocional, TDAH e desafios do dia a dia.",
    bullets: ["Terapia Cognitivo-Comportamental", "Regulação emocional", "Habilidades sociais em grupo"],
    color: "#3fb0bd",
    tint: "#dcf4f6",
    photo: px(6255656),
    icon: "💭",
  },
  {
    id: "fono",
    title: "Fonoaudiologia",
    short: "Linguagem e comunicação",
    description:
      "Estimulação da fala, linguagem e comunicação alternativa (CAA), respeitando o jeito único de cada criança se expressar.",
    bullets: ["Comunicação Alternativa (CAA)", "Atraso de fala e linguagem", "Seletividade alimentar"],
    color: "#de6e3e",
    tint: "#fde6d9",
    photo: px(7296367),
    icon: "🗣️",
  },
  {
    id: "to",
    title: "Terapia Ocupacional",
    short: "Integração sensorial",
    description:
      "Sala sensorial equipada para trabalhar coordenação motora, processamento sensorial e as atividades de vida diária com autonomia.",
    bullets: ["Integração Sensorial Ayres®", "Coordenação motora fina e grossa", "Autonomia nas AVDs"],
    color: "#e9b040",
    tint: "#fdf0cf",
    photo: px(8435790),
    icon: "🤸",
  },
  {
    id: "psicoped",
    title: "Psicopedagogia",
    short: "Aprendizagem e escola",
    description:
      "Apoio no processo de aprendizagem, com estratégias personalizadas e parceria próxima com a escola para uma inclusão real.",
    bullets: ["Avaliação psicopedagógica", "Adaptação curricular", "Parceria com a escola"],
    color: "#d4467c",
    tint: "#f9dde7",
    photo: px(7269503),
    icon: "📚",
  },
  {
    id: "pais",
    title: "Orientação Parental",
    short: "A família no centro",
    description:
      "Treinamento e acolhimento para pais e cuidadores, levando as estratégias da terapia para a rotina da casa. Porque a aliança começa em família.",
    bullets: ["Treinamento parental em ABA", "Grupos de apoio a famílias", "Orientação para rotina em casa"],
    color: "#8b4f82",
    tint: "#efe0ec",
    photo: px(4934149),
    icon: "👨‍👩‍👧",
  },
];

export const STEPS = [
  { title: "Acolhimento", text: "Uma conversa sem pressa para conhecer sua família, suas dúvidas e sua história.", color: "#9fe0e6" },
  { title: "Avaliação", text: "Avaliação multidisciplinar para entender as habilidades e necessidades da criança.", color: "#fbd684" },
  { title: "Plano sob medida", text: "Construímos juntos um plano terapêutico individual, com metas claras.", color: "#f2956a" },
  { title: "Intervenção", text: "Sessões lúdicas e afetivas, com equipe integrada e supervisão constante.", color: "#b377a8" },
  { title: "Evolução", text: "Acompanhamento de resultados e reuniões periódicas com a família e escola.", color: "#d4467c" },
];

export const TEAM = [
  { name: "Dra. Marina Alves", role: "Analista do Comportamento · BCBA", photo: px(6749762, 600, 750), color: "#b377a8" },
  { name: "Dra. Juliana Costa", role: "Fonoaudióloga · CAA", photo: px(5998467, 600, 750), color: "#9fe0e6" },
  { name: "Dra. Camila Reis", role: "Terapeuta Ocupacional", photo: px(17829429, 600, 750), color: "#f2956a" },
  { name: "Dr. Rafael Lima", role: "Psicólogo · TCC", photo: px(7578806, 600, 750), color: "#fbd684" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Quando chegamos na Aliança, meu filho não falava. Hoje ele me chama de mamãe e conta como foi o dia na escola. Não tenho palavras para agradecer essa equipe.",
    name: "Patrícia M.",
    detail: "Mãe do Theo, 5 anos",
    color: "#b377a8",
  },
  {
    quote:
      "Nos sentimos acolhidos desde o primeiro dia. A orientação parental mudou completamente a nossa rotina em casa. Somos uma família mais leve.",
    name: "Eduardo e Carla",
    detail: "Pais da Laura, 7 anos",
    color: "#3fb0bd",
  },
  {
    quote:
      "O cuidado com cada detalhe, os relatórios e a parceria com a escola fazem toda a diferença. Minha filha ama vir para as terapias!",
    name: "Renata S.",
    detail: "Mãe da Alice, 4 anos",
    color: "#de6e3e",
  },
];

export const FAQ = [
  {
    q: "Preciso de laudo para iniciar o atendimento?",
    a: "Não. Você pode nos procurar mesmo sem diagnóstico. Realizamos avaliação multidisciplinar e orientamos a família sobre os próximos passos.",
  },
  {
    q: "Vocês atendem por convênio?",
    a: "Sim, trabalhamos com os principais planos de saúde e também oferecemos atendimento particular com emissão de nota para reembolso.",
  },
  {
    q: "Qual a faixa etária atendida?",
    a: "Atendemos bebês a partir de 1 ano, crianças, adolescentes e também oferecemos suporte a adultos e às famílias.",
  },
  {
    q: "Como funciona a participação da família?",
    a: "A família é parte da equipe! Oferecemos orientação parental, reuniões periódicas e estratégias para aplicar no dia a dia.",
  },
  {
    q: "Vocês fazem acompanhamento escolar?",
    a: "Sim. Nossa equipe realiza visitas e reuniões com a escola, auxilia na adaptação curricular e orienta profissionais de apoio.",
  },
];

export const GALLERY = [
  { src: px(8435801, 700, 900), label: "Sala sensorial", color: "#9fe0e6" },
  { src: px(18990732, 900, 700), label: "Brincar é aprender", color: "#fbd684" },
  { src: px(6692961, 700, 900), label: "Materiais lúdicos", color: "#f2956a" },
  { src: px(8435792, 900, 700), label: "Habilidades sociais", color: "#b377a8" },
  { src: px(6692843, 700, 900), label: "Foco e atenção", color: "#d4467c" },
  { src: px(12788489, 700, 900), label: "Família presente", color: "#3fb0bd" },
  { src: px(7296465, 900, 700), label: "Coordenação motora", color: "#e9b040" },
];
