import DevCard from "./DevCard";
import type { ProcessedProfile, ThemeName } from "@/lib/types";

interface Sample {
  profile: ProcessedProfile;
  theme: ThemeName;
}

const SAMPLES: Sample[] = [
  {
    theme: "dark",
    profile: {
      login: "torvalds",
      name: "Linus Torvalds",
      avatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
      bio: "Creator of Linux and Git.",
      location: "Portland, OR",
      publicRepos: 8,
      followers: 220000,
      following: 0,
      memberSince: "2011",
      totalStars: 184000,
      topRepos: [
        { name: "linux", stars: 174000 },
        { name: "subsurface-for-dirk", stars: 2900 },
        { name: "test-tlb", stars: 540 },
      ],
      languages: [
        { name: "C", percentage: 78, color: "#555555" },
        { name: "Shell", percentage: 12, color: "#89e051" },
        { name: "Assembly", percentage: 6, color: "#6E4C13" },
        { name: "Makefile", percentage: 4, color: "#427819" },
      ],
    },
  },
  {
    theme: "midnight",
    profile: {
      login: "gaearon",
      name: "Dan Abramov",
      avatarUrl: "https://avatars.githubusercontent.com/u/810438?v=4",
      bio: "Working on React. Open source enthusiast.",
      location: "London, UK",
      publicRepos: 251,
      followers: 86000,
      following: 170,
      memberSince: "2011",
      totalStars: 124000,
      topRepos: [
        { name: "redux", stars: 60500 },
        { name: "react-hot-loader", stars: 12300 },
        { name: "overreacted.io", stars: 7200 },
      ],
      languages: [
        { name: "JavaScript", percentage: 58, color: "#f7df1e" },
        { name: "TypeScript", percentage: 26, color: "#3178c6" },
        { name: "HTML", percentage: 9, color: "#e34c26" },
        { name: "CSS", percentage: 5, color: "#563d7c" },
        { name: "Other", percentage: 2, color: "#8b8b8b" },
      ],
    },
  },
  {
    theme: "ocean",
    profile: {
      login: "sindresorhus",
      name: "Sindre Sorhus",
      avatarUrl: "https://avatars.githubusercontent.com/u/170270?v=4",
      bio: "Full-Time Open-Sourcerer. Maker of things.",
      location: "Norway",
      publicRepos: 1100,
      followers: 71000,
      following: 12,
      memberSince: "2009",
      totalStars: 920000,
      topRepos: [
        { name: "awesome", stars: 320000 },
        { name: "awesome-nodejs", stars: 56000 },
        { name: "got", stars: 14100 },
      ],
      languages: [
        { name: "TypeScript", percentage: 49, color: "#3178c6" },
        { name: "JavaScript", percentage: 38, color: "#f7df1e" },
        { name: "Swift", percentage: 7, color: "#F05138" },
        { name: "Shell", percentage: 4, color: "#89e051" },
        { name: "Other", percentage: 2, color: "#8b8b8b" },
      ],
    },
  },
];

export default function ExampleCards() {
  return (
    <section className="border-t border-[#21262d] bg-[#010409] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#e6edf3] sm:text-3xl">
            See what your card could look like
          </h2>
          <p className="mt-2 text-sm text-[#7d8590]">
            Try it with your own username above.
          </p>
        </div>
        <div className="flex flex-col items-center gap-12">
          {SAMPLES.map((s) => (
            <div key={s.profile.login} className="w-full overflow-x-auto">
              <div className="mx-auto" style={{ width: 800 }}>
                <DevCard profile={s.profile} theme={s.theme} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
