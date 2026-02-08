"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(now);
        setTime(timeString);
      } catch (e) {
        setTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  if (!time) return null;

  return (
    <span className="text-muted-foreground ml-2">
      • My current time:{" "}
      <span className="font-mono text-foreground font-medium">{time}</span>
    </span>
  );
}
