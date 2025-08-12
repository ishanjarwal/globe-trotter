import { Globe, GLOBE_CONFIG } from "../magicui/globe";

export function GlobeDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[450px] flex items-center justify-center h-[450px]">
        <Globe
          config={{
            ...GLOBE_CONFIG,
          }}
        />
      </div>
    </div>
  );
}
