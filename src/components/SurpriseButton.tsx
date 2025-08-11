"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SurpriseMeButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trip/generate/surprise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create surprise trip");
      }

      const data = await res.json();
      if (data.id) {
        router.push(`/trip/${data.id}`);
      } else {
        throw new Error("Trip ID missing in response");
      }
    } catch (err: any) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        disabled={loading}
        className="h-10 rounded-full cursor-pointer active:scale-90 duration-100"
      >
        {loading ? <Loader2 className="animate-spin" /> : "🎉 Surprise Me!"}
      </Button>
    </div>
  );
}
