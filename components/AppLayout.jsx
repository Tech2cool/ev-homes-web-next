// components/AppLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import Navbar from "@/components/NavBar/Navbar";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const paddingTop = pathname === "/" ? 0 : isMobile ? 30 : 60;

  return (
    <div className="container" style={{ paddingTop }}>
      <Navbar />
      {children}
    </div>
  );
}
