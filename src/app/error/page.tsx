import { FileWarning } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background flex-col space-y-6">
      <FileWarning className="size-32" />
      <h1 className="text-6xl font-bold">Error</h1>
      <h2 className="text-3xl font-semibold">
        Something unexpectedly went wrong
      </h2>
      <p className="text-muted-foreground">
        The resource you are trying to access might not be available or
        permanently moved to some other place.
      </p>
    </div>
  );
};

export default page;
