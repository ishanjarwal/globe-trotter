export function GlobeDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[450px] flex items-center justify-center h-[450px]">
        <Globe
          config={{
            ...GLOBE_CONFIG,
          }}
          style={{
            position: "relative", // ensure it's positioned in the flex container
            display: "block",     // remove inline alignment issues
          }}
        />
      </div>
    </div>
  );
}
