/**
 * 05 — Schedule.
 * ⚠️ SAMPLE AGENDA — every time, room, title and speaker is a placeholder.
 * Replace with the official programme once published.
 */
export type Track = "Keynote" | "Core" | "Web" | "Data" | "ML" | "Community" | "Workshop";

export type Slot =
  | { kind: "break"; time: string; title: string }
  | {
      kind: "session";
      time: string;
      end: string;
      room: string;
      title: string;
      track: Track;
      speaker: string;
      description: string;
    };

export const scheduleSection = {
  eyebrow: "05 — Conference Schedule",
  title: { before: "From the first ", em: "chai", after: " to the last commit" },
  badge: "Sample agenda — placeholders",
  lead: "Times, rooms, titles and speakers below are placeholders until the programme committee publishes the official schedule. Open a session for details.",
};

export const days: { label: string; date: string; slots: Slot[] }[] = [
  {
    label: "Day 01",
    date: "Date TBA",
    slots: [
      { kind: "break", time: "09:00", title: "Registration & green tea" },
      {
        kind: "session",
        time: "10:00",
        end: "10:45",
        room: "Main Hall",
        title: "Opening keynote",
        track: "Keynote",
        speaker: "Speaker TBA",
        description: "Welcome to the first PyCon Tajikistan — why we are here, and where the community goes next.",
      },
      {
        kind: "session",
        time: "11:00",
        end: "11:40",
        room: "Hall A",
        title: "Modern Python: what changed and why it matters",
        track: "Core",
        speaker: "Speaker TBA",
        description: "Sample talk. A tour of recent language features and how they change everyday code.",
      },
      {
        kind: "session",
        time: "11:50",
        end: "12:30",
        room: "Hall B",
        title: "From notebook to dashboard",
        track: "Data",
        speaker: "Speaker TBA",
        description: "Sample talk. Turning exploratory analysis into something your whole team can use.",
      },
      { kind: "break", time: "12:30", title: "Lunch · osh" },
      {
        kind: "session",
        time: "14:00",
        end: "14:40",
        room: "Hall A",
        title: "APIs that survive production",
        track: "Web",
        speaker: "Speaker TBA",
        description: "Sample talk. Validation, testing, observability and the boring parts that keep services alive.",
      },
      {
        kind: "session",
        time: "14:50",
        end: "16:20",
        room: "Workshop Room",
        title: "Hands-on workshop block",
        track: "Workshop",
        speaker: "Mentors TBA",
        description: "Sample slot. Pick a workshop from the list below and bring a laptop.",
      },
      { kind: "break", time: "16:20", title: "Afternoon chai & sweets" },
      {
        kind: "session",
        time: "16:50",
        end: "17:40",
        room: "Main Hall",
        title: "Lightning talks",
        track: "Community",
        speaker: "Open to attendees",
        description: "Five minutes each, sign-up on the day. The fastest way to share a project.",
      },
    ],
  },
  {
    label: "Day 02",
    date: "Date TBA",
    slots: [
      { kind: "break", time: "09:30", title: "Morning tea & hallway track" },
      {
        kind: "session",
        time: "10:00",
        end: "10:45",
        room: "Main Hall",
        title: "Day two keynote",
        track: "Keynote",
        speaker: "Speaker TBA",
        description: "Sample keynote. Python, open source and the Central Asian tech scene.",
      },
      {
        kind: "session",
        time: "11:00",
        end: "11:40",
        room: "Hall A",
        title: "Machine learning without the hype",
        track: "ML",
        speaker: "Speaker TBA",
        description: "Sample talk. Choosing the simplest model that works, and proving that it does.",
      },
      {
        kind: "session",
        time: "11:50",
        end: "12:30",
        room: "Hall B",
        title: "Testing as a design tool",
        track: "Core",
        speaker: "Speaker TBA",
        description: "Sample talk. How pytest shapes better interfaces, not just safer releases.",
      },
      { kind: "break", time: "12:30", title: "Lunch · osh" },
      {
        kind: "session",
        time: "14:00",
        end: "15:00",
        room: "Main Hall",
        title: "Panel: growing Tajikistan's developer community",
        track: "Community",
        speaker: "Panellists TBA",
        description: "Sample panel. Universities, companies and meetups on what the local ecosystem needs next.",
      },
      {
        kind: "session",
        time: "15:10",
        end: "15:50",
        room: "Hall A",
        title: "Python in the classroom",
        track: "Community",
        speaker: "Speaker TBA",
        description: "Sample talk. Teaching programming in Tajik and Russian — materials, mistakes and wins.",
      },
      { kind: "break", time: "16:00", title: "Closing chai" },
      {
        kind: "session",
        time: "16:30",
        end: "17:15",
        room: "Main Hall",
        title: "Closing session & sprints announcement",
        track: "Keynote",
        speaker: "Organising team",
        description: "Thanks, numbers, and how to stay involved until the next edition.",
      },
    ],
  },
];
