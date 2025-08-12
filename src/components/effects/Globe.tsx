import { Globe, GLOBE_CONFIG } from "../magicui/globe";

export function GlobeDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative flex items-center justify-center w-full h-full">
        <Globe
          config={{
            ...GLOBE_CONFIG,
          }}
        />
      </div>
    </div>
  );
}
