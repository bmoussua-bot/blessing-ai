// Blessing AI — données statiques (v1, hors-ligne)
// Traduction : Louis Segond 1910 — domaine public.
// Ce fichier est fait pour être étendu facilement : ajoute simplement de
// nouvelles entrées dans VERSES ou PRAYERS, aucune autre modif nécessaire.

const VERSES = {
  reveil: [
    { text: "C'est de l'Éternel que viennent chaque matin de nouvelles compassions ; grande est ta fidélité.", ref: "Lamentations 3:23" },
    { text: "Ceci est le jour que l'Éternel a fait ; livrons-nous à l'allégresse et à la joie.", ref: "Psaume 118:24" }
  ],
  etudes: [
    { text: "Que la sagesse entre dans ton cœur, et que la science fasse les délices de ton âme.", ref: "Proverbes 2:10" },
    { text: "Si quelqu'un manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement.", ref: "Jacques 1:5" }
  ],
  travail: [
    { text: "Tout ce que ta main trouve à faire avec ta force, fais-le.", ref: "Ecclésiaste 9:10" },
    { text: "Travaillez de tout votre cœur, comme pour le Seigneur et non pour des hommes.", ref: "Colossiens 3:23" }
  ],
  sport: [
    { text: "Je puis tout par celui qui me fortifie.", ref: "Philippiens 4:13" },
    { text: "Ceux qui se confient en l'Éternel renouvellent leur force.", ref: "Ésaïe 40:31" }
  ],
  stress: [
    { text: "Ne vous inquiétez de rien ; mais en toute chose faites vos besoins connaître à Dieu.", ref: "Philippiens 4:6" },
    { text: "Je te laisse la paix, je te donne ma paix... Que ton cœur ne se trouble point.", ref: "Jean 14:27" }
  ],
  examen: [
    { text: "Fortifie-toi et prends courage, ne t'effraie point et ne t'épouvante point.", ref: "Josué 1:9" },
    { text: "L'Éternel est ma lumière et mon salut : de qui aurais-je crainte ?", ref: "Psaume 27:1" }
  ],
  anniversaire: [
    { text: "Il y a un temps pour tout... un temps pour chaque chose sous les cieux.", ref: "Ecclésiaste 3:1" },
    { text: "Béni soit l'Éternel, qui chaque jour porte notre fardeau.", ref: "Psaume 68:20" }
  ],
  maladie: [
    { text: "L'Éternel le soutient sur son lit de douleur ; tu le rétablis quand il est malade.", ref: "Psaume 41:4" },
    { text: "Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures.", ref: "Psaume 147:3" }
  ]
};

const CONTEXTS = [
  { key: "reveil", label: "🌅 Réveil" },
  { key: "etudes", label: "📚 Études" },
  { key: "travail", label: "💼 Travail" },
  { key: "sport", label: "🏃 Sport" },
  { key: "stress", label: "😮‍💨 Stress" },
  { key: "examen", label: "📝 Examen" },
  { key: "anniversaire", label: "🎂 Anniversaire" },
  { key: "maladie", label: "🩹 Maladie" }
];

const PRAYERS = [
  {
    key: "matin",
    title: "Prière du matin",
    text: "Seigneur, je te remercie pour ce nouveau jour. Garde mon cœur proche de toi, guide mes pas et donne-moi la force d'avancer avec foi. Amen."
  },
  {
    key: "soir",
    title: "Prière du soir",
    text: "Seigneur, merci pour ce jour passé sous ta grâce. Pardonne mes manquements, apaise mon esprit et veille sur mon repos. Amen."
  },
  {
    key: "examen",
    title: "Prière avant un examen",
    text: "Seigneur, donne-moi clarté d'esprit et calme intérieur. Que je me souvienne de ce que j'ai appris et que ta paix garde mon cœur. Amen."
  },
  {
    key: "travail",
    title: "Prière avant le travail",
    text: "Seigneur, bénis le travail de mes mains aujourd'hui. Donne-moi discipline, excellence et intégrité en tout ce que je fais. Amen."
  },
  {
    key: "gratitude",
    title: "Prière de reconnaissance",
    text: "Seigneur, merci pour tes bienfaits innombrables. Je me souviens aujourd'hui de tout ce que tu as fait, et mon cœur déborde de gratitude. Amen."
  },
  {
    key: "guerison",
    title: "Prière de guérison",
    text: "Seigneur, toi qui guéris les cœurs brisés, je te confie ce corps et cet esprit fatigués. Apporte réconfort, force et guérison. Amen."
  }
];

const THEMES = ["Joie", "Foi", "Paix", "Espérance", "Amour", "Sagesse", "Pardon", "Guérison", "Gratitude", "Courage", "Persévérance"];

const MEDITATIONS = [
  {
    verse: { text: "Je puis tout par celui qui me fortifie.", ref: "Philippiens 4:13" },
    reflection: "Il ne s'agit pas de compter sur nos propres forces, mais de puiser chaque jour dans une force qui nous dépasse. Quel que soit le défi devant toi aujourd'hui, tu n'y fais pas face seul(e).",
    prayer: "Seigneur, rappelle-moi aujourd'hui que ta force se manifeste dans ma faiblesse. Aide-moi à avancer avec confiance.",
    challenge: "Note une situation où tu comptes trop sur tes propres forces, et confie-la consciemment à Dieu aujourd'hui."
  },
  {
    verse: { text: "Recommande à l'Éternel tes œuvres, et tes projets réussiront.", ref: "Proverbes 16:3" },
    reflection: "Planifier est sage, mais remettre nos plans entre les mains de Dieu change la manière dont on avance : avec moins d'anxiété, plus de confiance.",
    prayer: "Seigneur, je te confie mes projets du jour. Guide mes décisions et corrige mes pas si je m'égare.",
    challenge: "Choisis une décision en attente et prends un moment pour la présenter en prière avant d'agir."
  },
  {
    verse: { text: "Ne t'inquiète de rien... la paix de Dieu... gardera vos cœurs et vos pensées.", ref: "Philippiens 4:6-7" },
    reflection: "L'inquiétude rétrécit notre regard sur le présent. La prière l'élargit vers quelqu'un de plus grand que nos soucis.",
    prayer: "Seigneur, prends mes inquiétudes de ce jour. Remplace-les par ta paix qui dépasse toute intelligence.",
    challenge: "Chaque fois qu'une inquiétude surgit aujourd'hui, transforme-la en une courte prière silencieuse."
  }
];
