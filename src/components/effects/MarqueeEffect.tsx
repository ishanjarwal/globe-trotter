import { cn } from "../../lib/utils";
import { Marquee } from "../magicui/marquee";

const reviews = [
  {
    name: "React.js",
    body: "Powerful front-end library used to build fast, interactive user interfaces.",
    img: "https://skillicons.dev/icons?i=react",
  },
  {
    name: "Node.js",
    body: "JavaScript runtime for building fast and scalable server-side applications.",
    img: "https://skillicons.dev/icons?i=nodejs",
  },
  {
    name: "Express.js",
    body: "Minimal and flexible Node.js web application framework for building APIs.",
    img: "https://skillicons.dev/icons?i=express",
  },
  {
    name: "MongoDB",
    body: "NoSQL database used for flexible, JSON-like document storage.",
    img: "https://skillicons.dev/icons?i=mongodb",
  },
  {
    name: "Tailwind CSS",
    body: "Utility-first CSS framework used for designing responsive, modern UIs.",
    img: "https://skillicons.dev/icons?i=tailwind",
  },
  {
    name: "TypeScript",
    body: "Typed superset of JavaScript used to improve code quality and scalability.",
    img: "https://skillicons.dev/icons?i=typescript",
  },
  {
    name: "Vite",
    body: "Fast build tool and dev server for modern front-end development.",
    img: "https://skillicons.dev/icons?i=vite",
  },
  {
    name: "Clerk",
    body: "User authentication and management used for seamless auth integration.",
    img: "https://avatars.githubusercontent.com/u/66987818?s=200&v=4",
  },
  {
    name: "OpenAI API",
    body: "Integrated AI for intelligent features and automation in the app.",
    img: "https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png", // PNG fallback
  },
  {
    name: "Zod",
    body: "TypeScript-first schema validation library for robust data validation.",
    img: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4",
  },
  {
    name: "Shadcn/UI",
    body: "Modern UI components built with Radix and Tailwind for flexible design.",
    img: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  bgColor,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  bgColor?: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 min-h-[12rem] cursor-pointer overflow-hidden rounded-xl text-left border p-6",
        "border-gray-950/[.1] bg-white/5 hover:bg-white/10",
        "dark:border-white/10 dark:hover:bg-white/15",
        bgColor
      )}
    >
      <div className="flex items-center gap-3">
        <img className="rounded-full w-10 h-10" src={img} />
        <div>
          <figcaption className="text-base font-semibold dark:text-white">
            {name}
          </figcaption>
          <p className="text-sm font-medium dark:text-white/50">{username}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-base dark:text-white">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="mt-20">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="wrap mt-3">
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
    </div>
  );
}
