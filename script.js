const memories = [
  "First night at hostel 1 — excited but subtly chill.",
  "Got lost on my way to the Lecture Hall Complex on Day 1.",
  "Played UNO till 4 AM with wingmates during fresher week.",
  "Pulled my first all-nighter after fresher's night.",
  "Saw a snake lurking in the hostel hallway.",
  "ENT101 — Presented my first project in front of 100+ students.",
  "Danced like no one was watching during pre-Holi party.",
  "Played Holi with mud and water for the first time, one night before Holi.",
  "Visited boat house with my friends for the first time during the first week of arrival.",
  "Built my first website during the summer break.",
  "Paricipated in Freshiesta basketball team, my first competition in the institute. "
];

function revealMemory() {
  const randomIndex = Math.floor(Math.random() * memories.length);
  document.getElementById("memoryBox").textContent = memories[randomIndex];
}
