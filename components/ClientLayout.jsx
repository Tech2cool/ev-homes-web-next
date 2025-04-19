'use client';

import { usePathname } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLayoutRequired = !pathname.startsWith("/project");

  return isLayoutRequired ? <AppLayout>{children}</AppLayout> : children;
}
