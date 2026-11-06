/**
 * 06 — Workshops.
 * Topics are proposed placeholders. Duration and seats stay "TBA" until confirmed.
 */
export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Workshop = {
  title: string;
  level: Level;
  icon: "seed" | "bolt" | "table" | "graph" | "check" | "gear";
  text: string;
  install: string;
  duration: string;
  seats: string;
};

export const workshopsSection = {
  eyebrow: "06 — Workshops",
  title: { before: "Bring a laptop. ", em: "Leave", after: " with code." },
  badge: "Topics are placeholders",
  lead: "Small groups, mentors in the room and real projects. Final topics, durations and seat counts will be announced with the programme.",
};

export const workshops: Workshop[] = [
  {
    title: "Python from zero",
    level: "Beginner",
    icon: "seed",
    text: "Variables, loops and functions — then your first useful script, with mentors at every table.",
    install: "python -m venv .venv",
    duration: "TBA",
    seats: "TBA",
  },
  {
    title: "Web APIs with FastAPI",
    level: "Intermediate",
    icon: "bolt",
    text: "Design, validate and document a small REST API, then test it end to end.",
    install: 'pip install "fastapi[standard]"',
    duration: "TBA",
    seats: "TBA",
  },
  {
    title: "Data analysis with pandas",
    level: "Beginner",
    icon: "table",
    text: "Load, clean and explore a real dataset, and turn it into charts people can read.",
    install: "pip install pandas jupyterlab",
    duration: "TBA",
    seats: "TBA",
  },
  {
    title: "Machine learning foundations",
    level: "Intermediate",
    icon: "graph",
    text: "Train, evaluate and honestly compare models with scikit-learn.",
    install: "pip install scikit-learn matplotlib",
    duration: "TBA",
    seats: "TBA",
  },
  {
    title: "Testing with pytest",
    level: "Intermediate",
    icon: "check",
    text: "Fixtures, parametrisation and coverage — make refactoring boring in the best way.",
    install: "pip install pytest pytest-cov",
    duration: "TBA",
    seats: "TBA",
  },
  {
    title: "Automate the boring stuff",
    level: "Beginner",
    icon: "gear",
    text: "Files, spreadsheets and web requests: scripts that give you your afternoons back.",
    install: "pip install requests openpyxl",
    duration: "TBA",
    seats: "TBA",
  },
];
