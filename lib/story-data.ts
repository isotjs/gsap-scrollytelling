export type StoryScene = {
  id: "pain" | "product" | "automation" | "insights";
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

export const storyScenes: StoryScene[] = [
  {
    id: "pain",
    eyebrow: "The Problem",
    title: "Most tee drops die in tabs, chats, and late-night guesswork.",
    description:
      "Manual launch ops crush momentum. Teams spend more time syncing spreadsheets than shipping products people want.",
    bullets: [
      "Scattered design feedback loops",
      "No single source for campaign timing",
      "Slow reaction when demand starts to spike",
    ],
  },
  {
    id: "product",
    eyebrow: "The Build",
    title: "Turn an idea into a launch-ready shirt in one guided flow.",
    description:
      "Design, approve, and publish from one workspace. Your next drop moves from concept to storefront without friction.",
    bullets: [
      "Fast mockup and variant setup",
      "Built-in team approvals",
      "One-click product publishing",
    ],
  },
  {
    id: "automation",
    eyebrow: "The Engine",
    title: "Automate the steps between checkout and doorstep.",
    description:
      "ThreadPilot syncs orders, inventory, and fulfillment so your team can focus on creative direction, not repetitive ops.",
    bullets: [
      "Storefront + inventory sync",
      "Print and fulfillment routing",
      "Live status updates for every order",
    ],
  },
  {
    id: "insights",
    eyebrow: "The Signal",
    title: "Know what to restock and what to retire before the next drop.",
    description:
      "Real-time demand insights show which designs, sizes, and channels convert best, so every campaign gets smarter.",
    bullets: [
      "Demand heatmaps by design",
      "Cohort-level repeat purchase tracking",
      "Performance alerts before inventory gaps hit",
    ],
  },
];
