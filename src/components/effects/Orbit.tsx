import { OrbitingCircles } from "../../components/magicui/orbiting-circles";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex items-center justify-center h-full w-full mx-auto">
      {/* Outer orbit */}
      <OrbitingCircles iconSize={50} radius={140} path>
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="logo"
            className="w-full h-full object-contain rounded-full"
          />
        ))}
      </OrbitingCircles>

      {/* Inner orbit */}
      <OrbitingCircles iconSize={30} radius={90} reverse speed={2} path>
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="logo"
            className="w-full h-full object-contain rounded-full"
          />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
  "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png",
];

