"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "hintro-user-id";
const DEFAULT_USER = "u1";

export function useUserId() {
  const [userId, setUserIdState] = useState<string>(DEFAULT_USER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUserIdState(stored);
    setMounted(true);
  }, []);

  const setUserId = useCallback((id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setUserIdState(id);
  }, []);

  return { userId, setUserId, mounted };
}
