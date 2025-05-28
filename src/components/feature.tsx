import { motion } from "motion/react";
import { Spotlight } from "@/components/motion-primitives/spotlight";
const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};
export const WORK_EXPERIENCE = [
  {
    company: "Reglazed Studio",
    title: "CEO",
    start: "2024",
    end: "Present",
    link: "https://ibelick.com",
    id: "work1",
  },
  {
    company: "Freelance",
    title: "Design Engineer",
    start: "2022",
    end: "2024",
    link: "https://ibelick.com",
    id: "work2",
  },
  {
    company: "Freelance",
    title: "Front-end Developer",
    start: "2017",
    end: "Present",
    link: "https://ibelick.com",
    id: "work3",
  },
];
export default function Feature() {
  return (
    <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
      <h3 className="mb-5 text-lg font-medium">Work Experience</h3>
      <div className="flex flex-col space-y-2">
        {WORK_EXPERIENCE.map((job) => (
          <a
            className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            key={job.id}
          >
            <Spotlight
              className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
              size={64}
            />
            <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
              <div className="relative flex w-full flex-row justify-between">
                <div>
                  <h4 className="font-normal dark:text-zinc-100">
                    {job.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {job.company}
                  </p>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {job.start} - {job.end}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </motion.section>
  );
}
