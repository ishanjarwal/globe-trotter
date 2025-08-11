import { cn } from "../../lib/utils";
import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
export function AnimatedShinyTextDemo() {
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "group rounded-full border border-stone-100/10 bg-white/10 text-base text-white transition-all ease-in w-fit hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center gap-x-2 px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-accent">
          <span>✨ TripSage</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />{" "}
        </AnimatedShinyText>
      </div>
    </div>
  );
}
