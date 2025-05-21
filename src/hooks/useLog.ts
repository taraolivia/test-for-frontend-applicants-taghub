// src/hooks/useLog.ts
import { useState, useCallback } from "react";

export function useLog() {
  const [logs, setLogs] = useState<string[]>([]);

  const log = useCallback((message: string) => {
    setLogs((prev) => [...prev.slice(-99), message]); // max 100 logs
  }, []);

  return { logs, log };
}
