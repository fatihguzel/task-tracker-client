"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function TaskManagerPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home/task-manager/list");
  }, []);
  return null;
}
