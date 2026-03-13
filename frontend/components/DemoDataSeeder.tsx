"use client";

import { useEffect } from "react";
import { AUSHADH_STORAGE_KEY, getDemoPatients } from "@/scripts/seedDemoData";

export default function DemoDataSeeder() {
  useEffect(() => {
    let parsed: any[] = [];
    try {
      const existing = localStorage.getItem(AUSHADH_STORAGE_KEY);
      parsed = existing ? JSON.parse(existing) : [];
    } catch {
      parsed = [];
    }

    const hasDemoData = (parsed || [])?.some((p: any) => p?.id?.startsWith?.("PAT-DEMO"));

    if (!hasDemoData) {
      const demoPatients = getDemoPatients();
      const merged = [...demoPatients, ...(parsed || [])];
      localStorage.setItem(AUSHADH_STORAGE_KEY, JSON.stringify(merged));
      console.log("Demo data seeded!");
    }
  }, []);

  return null;
}
