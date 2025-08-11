import { Globe, GLOBE_CONFIG } from "../../components/magicui/globe";

export function GlobeDemo() {
  return (
    <div className="w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center">
      <Globe
        config={{
          ...GLOBE_CONFIG,
          baseColor: [0.6, 0.6, 0.6],
        }}
      />
    </div>
  );
}
