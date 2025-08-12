export function GlobeDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative flex items-center justify-center w-full h-full">
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
