/** 02 — About PyCon */
export const about = {
  eyebrow: "02 — About PyCon",
  statement: {
    before: "A conference made by the community, ",
    em: "for",
    middle: " the community. Now its first edition comes to ",
    em2: "Dushanbe.",
  },
  blocks: [
    {
      kicker: "What it is",
      text: "PyCon is the name Python communities around the world give to their conferences. They are run largely by volunteers, built around talks, hands-on workshops and hallway conversations, and open to everyone from first-time programmers to the maintainers of libraries the world runs on.",
    },
    {
      kicker: "Why it exists",
      text: "So that people who write Python can learn from each other in person. Ideas travel faster in a room than in a repository: beginners find mentors, teams find talent, and local projects find contributors.",
    },
    {
      kicker: "Why Tajikistan, why now",
      text: "Tajikistan has never had a PyCon. Its developer community has grown through universities, coding schools, startups and remote work — mostly without a shared stage. The first edition gives that community a meeting point in Dushanbe and connects it to the global Python network. It sets the tone for every edition after it: welcoming, technically serious and unmistakably Tajik.",
    },
  ],
  repl: {
    title: "python3 — dushanbe",
    // [prompt, code, output?]
    lines: [
      { in: [["k", "from"], ["t", " tajikistan "], ["k", "import"], ["t", " dushanbe"]] },
      { in: [["t", "pycon = dushanbe.host("], ["s", '"PyCon"'], ["t", ", edition="], ["n", "1"], ["t", ")"]] },
      { in: [["t", "pycon.audience"]], out: "['developers', 'engineers', 'educators', 'students']" },
      { in: [["t", "pycon.languages"]], out: "('Tajik', 'Russian', 'English')" },
      { in: [["t", "pycon.status"]], out: "'the beginning'" },
    ] as { in: [kind: "k" | "t" | "s" | "n", text: string][]; out?: string }[],
  },
  pillars: [
    {
      icon: "globe",
      title: "Global standard",
      text: "A programme shaped the way PyCons run worldwide: an open call for proposals, community review and a code of conduct.",
    },
    {
      icon: "chorkhona",
      title: "Local roots",
      text: "Talks and workshops in Tajik, Russian and English, with speakers who build software here.",
    },
    {
      icon: "gate",
      title: "Open doors",
      text: "Students, career changers, teachers and senior engineers share the same rooms — and the same tea.",
    },
  ] as { icon: "globe" | "chorkhona" | "gate"; title: string; text: string }[],
};
