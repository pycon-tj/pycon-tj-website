/**
 * 04 — Speakers.
 * ⚠️ All entries are PLACEHOLDERS. Replace them with confirmed speakers only.
 * `photo` is optional: add a path in /public to show a real portrait in the arch.
 */
export type Speaker = {
  name: string;
  role: string;
  topic: string;
  bio: string;
  photo?: string;
};

export const speakersSection = {
  eyebrow: "04 — Speakers",
  title: { before: "Voices of the ", em: "first", after: " stage" },
  badge: "Lineup announced soon",
  lead: "The programme committee will select talks through an open call for proposals. Cards below are placeholders.",
};

export const speakers: Speaker[] = [
  {
    name: "Speaker Name",
    role: "Role · Company",
    topic: "Core Python",
    bio: "Placeholder bio. A talk on the language itself — typing, performance or what is new in recent releases.",
  },
  {
    name: "Speaker Name",
    role: "Role · Company",
    topic: "Web & APIs",
    bio: "Placeholder bio. Building and running web services in Python, from first endpoint to production.",
  },
  {
    name: "Speaker Name",
    role: "Role · Company",
    topic: "Data",
    bio: "Placeholder bio. Working with real-world data: cleaning, analysis and telling the story behind the numbers.",
  },
  {
    name: "Speaker Name",
    role: "Role · Company",
    topic: "Machine Learning",
    bio: "Placeholder bio. Practical machine learning — models that ship, and the engineering around them.",
  },
  {
    name: "Speaker Name",
    role: "Role · Company",
    topic: "Education",
    bio: "Placeholder bio. Teaching Python in schools, universities and bootcamps across Central Asia.",
  },
];

export const cfp = {
  kicker: "Call for proposals",
  title: { before: "Your talk could be", em: "here" },
  text: "Have something to share — a library, a lesson learned, a project from Tajikistan? The call for proposals opens soon.",
  status: "Opens soon",
  cta: { label: "Contact the organisers", href: "#contact" },
};
