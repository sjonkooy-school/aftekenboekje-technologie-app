export type ModuleTask = {
  title: string;
  category?: string;
};

export type ModuleDefinition = {
  title: string;
  description: string;
  tasks: ModuleTask[];
};

export const moduleCatalog: ModuleDefinition[] = [
  {
    title: "Robomind",
    description: "Programmeeroefeningen uit het Robomind-deel van het aftekenboekje.",
    tasks: [
      { title: "RoboMind openen en werk opslaan", category: "Start" },
      { title: "Robot vooruit en achteruit laten rijden", category: "Bewegen" },
      { title: "Robot links en rechts laten draaien", category: "Bewegen" },
      { title: "Robot naar noord, oost, zuid en west sturen", category: "Richting" },
      { title: "Een pad schilderen of markeren", category: "Schilderen" },
      { title: "Stoppen met schilderen", category: "Schilderen" },
      { title: "Een eenvoudig programma in juiste volgorde maken", category: "Programmeren" },
      { title: "Herhaling gebruiken", category: "Programmeren" },
      { title: "Voorwaarden gebruiken", category: "Programmeren" },
      { title: "Een doolhof of route oplossen", category: "Uitdaging" },
      { title: "Een procedure/functie gebruiken", category: "Programmeren" },
      { title: "Eigen RoboMind-opdracht laten zien", category: "Eindopdracht" }
    ]
  },
  {
    title: "Virtual Reality",
    description: "VR Basics en losse VR-opdrachten.",
    tasks: [
      { title: "De blokkentafel", category: "VR Basics" },
      { title: "Schieten", category: "VR Basics" },
      { title: "Dansen", category: "VR Basics" },
      { title: "De plank", category: "VR Basics" },
      { title: "Vliegen", category: "VR Basics" },
      { title: "Branden blussen", category: "VR Basics" },
      { title: "Kleur headset genoteerd" },
      { title: "Profiel genoteerd" }
    ]
  },
  {
    title: "Cubism",
    description: "Levels uit Cubism.",
    tasks: [
      { title: "Titel scherm indelen" },
      { title: "Flatlands" },
      { title: "Folds" },
      { title: "Pyramids" },
      { title: "Stacks" },
      { title: "Three by three" },
      { title: "Verdere levels" },
      { title: "Kleur headset genoteerd" },
      { title: "Profiel genoteerd" }
    ]
  },
  {
    title: "Gadgeteer",
    description: "Gadgeteer-levels uit het boekje.",
    tasks: [
      { title: "De startlevels: domino" },
      { title: "Stijgen en dalen: alle kanten op draaien" },
      { title: "Vliegen en vallen" },
      { title: "Lange wegen" },
      { title: "De finales" },
      { title: "Kleur headset genoteerd" }
    ]
  },
  {
    title: "Gravity Lab",
    description: "Basic, Advanced, Professional en Experimental levels.",
    tasks: [
      { title: "Run program", category: "Basic" },
      { title: "Inventory", category: "Basic" },
      { title: "Electronics", category: "Basic" },
      { title: "Outside the box", category: "Basic" },
      { title: "Upwards", category: "Basic" },
      { title: "Gravity modifier", category: "Basic" },
      { title: "Target practice", category: "Basic" },
      { title: "Modifier II", category: "Basic" },
      { title: "The chimney", category: "Basic" },
      { title: "3 Bins", category: "Advanced" },
      { title: "The lid", category: "Advanced" },
      { title: "Up and down", category: "Advanced" },
      { title: "Gravity pump", category: "Advanced" },
      { title: "Gravity pump II", category: "Advanced" },
      { title: "Color mixing", category: "Advanced" },
      { title: "Complex I", category: "Advanced" },
      { title: "Conveyer belt", category: "Advanced" },
      { title: "The ravine", category: "Advanced" },
      { title: "Ratio sensor", category: "Professional" },
      { title: "Target practice 2", category: "Professional" },
      { title: "The web", category: "Professional" },
      { title: "Momentum", category: "Professional" },
      { title: "Windmill", category: "Professional" },
      { title: "The pipeline", category: "Professional" },
      { title: "Experimental level 1", category: "Experimental" },
      { title: "Experimental level 2", category: "Experimental" },
      { title: "Experimental level 3", category: "Experimental" },
      { title: "Experimental level 4", category: "Experimental" },
      { title: "Experimental level 5", category: "Experimental" },
      { title: "Experimental level 6", category: "Experimental" },
      { title: "Experimental level 7", category: "Experimental" },
      { title: "Experimental level 8", category: "Experimental" },
      { title: "Experimental level 9", category: "Experimental" }
    ]
  },
  {
    title: "Multibrush",
    description: "Ontwerp vastleggen in Multibrush.",
    tasks: [
      { title: "Ontwerpnaam ingevuld" },
      { title: "Beschreven wat ik heb gemaakt" },
      { title: "Kleur headset genoteerd" }
    ]
  },
  {
    title: "Arkio",
    description: "Ontwerp vastleggen in Arkio.",
    tasks: [
      { title: "Ontwerpnaam ingevuld" },
      { title: "Beschreven wat ik heb gemaakt" },
      { title: "Kleur headset genoteerd" }
    ]
  },
  {
    title: "Robots",
    description: "Robotopdrachten met Dash, Cue, Photon, Mbot en Bluebot.",
    tasks: [
      { title: "Welke iPad genoteerd", category: "Dash robot" },
      { title: "Welke robot genoteerd", category: "Dash robot" },
      { title: "Scrollquest afgerond", category: "Dash robot" },
      { title: "Welke iPad genoteerd", category: "Cue robot" },
      { title: "Welke robot genoteerd", category: "Cue robot" },
      { title: "Profielnaam genoteerd", category: "Photon" },
      { title: "Naam robot genoteerd", category: "Photon" },
      { title: "Opdracht volgorde", category: "Mbot" },
      { title: "Snelheid", category: "Mbot" },
      { title: "Lus", category: "Mbot" },
      { title: "Stop", category: "Mbot" },
      { title: "Wacht", category: "Mbot" },
      { title: "Vertakking", category: "Mbot" },
      { title: "Voorwaarde", category: "Mbot" },
      { title: "Vergelijken", category: "Mbot" },
      { title: "Helderheid", category: "Mbot" },
      { title: "Getallen", category: "Mbot" },
      { title: "Aftekenkaartnummer ingevuld", category: "Bluebot" },
      { title: "Wat moest je doen ingevuld", category: "Bluebot" },
      { title: "Voldaan ingevuld", category: "Bluebot" }
    ]
  },
  {
    title: "3D ontwerpen",
    description: "Ontwerpnaam en resultaat vastleggen.",
    tasks: [
      { title: "Ontwerpnaam ingevuld" },
      { title: "Beschreven wat ik heb gemaakt" }
    ]
  },
  {
    title: "Coaster Mania",
    description: "Coaster Mania werelden en bestandsnamen.",
    tasks: [
      { title: "Naam van het bestand ingevuld" },
      { title: "Medieval" },
      { title: "Western" },
      { title: "Atlantis" },
      { title: "Sci fi" }
    ]
  },
  {
    title: "Some Assembly Required",
    description: "Levels uit Some Assembly Required.",
    tasks: [
      { title: "Same day delivery", category: "Level 1" },
      { title: "Roborepairs", category: "Level 2" },
      { title: "Kaiju catastrophe", category: "Level 3" },
      { title: "Chatterbox and seat", category: "Level 4" },
      { title: "Roborepairs 2", category: "Level 5" },
      { title: "Sandwich server", category: "Level 6" },
      { title: "Level 7" },
      { title: "Level 8" },
      { title: "Kleur headset genoteerd" }
    ]
  },
  {
    title: "Drone VR",
    description: "Training, industrial en castle run.",
    tasks: [
      { title: "Checkpoint race", category: "Training" },
      { title: "Foto's maken", category: "Training" },
      { title: "Checkpoint race", category: "Industrial" },
      { title: "Foto's maken", category: "Industrial" },
      { title: "Checkpoint race", category: "Castle run" },
      { title: "Foto's maken", category: "Castle run" },
      { title: "Kleur headset genoteerd" }
    ]
  },
  {
    title: "Virtual Techlab",
    description: "Computeronderdelen en opdrachten uit Virtual Techlab.",
    tasks: [
      { title: "Tutorial" },
      { title: "Veiligheid" },
      { title: "Voeding" },
      { title: "Moederbord" },
      { title: "Processor" },
      { title: "Koeler" },
      { title: "Geheugen" },
      { title: "Opslag" },
      { title: "Videokaart" },
      { title: "Afronden" },
      { title: "Defect zoeken" },
      { title: "Sandbox" },
      { title: "Kleur headset genoteerd" }
    ]
  },
  {
    title: "We Are One",
    description: "Levels uit We Are One.",
    tasks: [
      { title: "Basics" },
      { title: "Basics intermediate" },
      { title: "Basics advanced" },
      { title: "Playground" },
      { title: "2 clones one gun" },
      { title: "Stair down" },
      { title: "Magzine pistol twist 1" },
      { title: "Mirror clone" },
      { title: "Yeet" }
    ]
  },
  {
    title: "Programmer VR",
    description: "Programmer VR levels uit het boekje.",
    tasks: [
      { title: "Level 1" },
      { title: "Level 2" },
      { title: "Level 3" },
      { title: "Level 4" },
      { title: "Level 5" }
    ]
  }
];

export const technologyModules = moduleCatalog.map((module) => module.title);

export function slugifyModule(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
