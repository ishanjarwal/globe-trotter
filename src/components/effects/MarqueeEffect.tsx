import { cn } from "../../lib/utils";
import { Marquee } from "../magicui/marquee";

const techstacks = [
  {
    name: "React.js",
    body: "Powerful front-end library for building fast, interactive UIs.",
    img: "https://skillicons.dev/icons?i=react",
  },
  {
    name: "Node.js",
    body: "JavaScript runtime for scalable server-side apps.",
    img: "https://skillicons.dev/icons?i=nodejs",
  },
  {
    name: "Express.js",
    body: "Minimal Node.js framework for APIs.",
    img: "https://skillicons.dev/icons?i=express",
  },
  {
    name: "MongoDB",
    body: "NoSQL database for JSON-like document storage.",
    img: "https://skillicons.dev/icons?i=mongodb",
  },
  {
    name: "Tailwind CSS",
    body: "Utility-first CSS framework for responsive UI.",
    img: "https://skillicons.dev/icons?i=tailwind",
  },
  {
    name: "TypeScript",
    body: "Typed superset of JavaScript for better scalability.",
    img: "https://skillicons.dev/icons?i=typescript",
  },
  {
    name: "Vite",
    body: "Fast build tool and dev server for modern web apps.",
    img: "https://skillicons.dev/icons?i=vite",
  },
  {
    name: "Clerk",
    body: "User authentication & management solution.",
    img: "https://avatars.githubusercontent.com/u/66987818?s=200&v=4",
  },
  {
    name: "OpenAI API",
    body: "AI integration for intelligent app features.",
    img: "https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png",
  },
  {
    name: "Zod",
    body: "TypeScript-first schema validation library.",
    img: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4",
  },
  {
    name: "Shadcn/UI",
    body: "Modern UI components with Radix & Tailwind.",
    img: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4",
  },
];

const firstRow = techstacks.slice(0, Math.ceil(techstacks.length / 2));
const secondRow = techstacks.slice(Math.ceil(techstacks.length / 2));

const TechStackCard = ({
  img,
  name,
  body,
  bgColor,
}: {
  img: string;
  name: string;
  body: string;
  bgColor?: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 min-h-[8rem] cursor-pointer overflow-hidden rounded-xl text-left border p-4 flex flex-col items-start justify-center",
        "border-gray-950/[.1] bg-white/5 hover:bg-white/10",
        "dark:border-white/10 dark:hover:bg-white/15",
        bgColor
      )}
    >
      <div className="flex items-center gap-3">
        <img className="w-10 h-10 rounded" src={img} alt={name} />
        <figcaption className="text-base font-semibold dark:text-white">
          {name}
        </figcaption>
      </div>
      <blockquote className="mt-2 text-sm dark:text-white/70">
        {body}
      </blockquote>
    </figure>
  );
};

export function TechStackMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="mt-10">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((tech) => (
            <TechStackCard key={tech.name} {...tech} />
          ))}
        </Marquee>
      </div>
      <div className="mt-3">
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((tech) => (
            <TechStackCard key={tech.name} {...tech} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
    </div>
  );
}

export default TechStackMarquee;
