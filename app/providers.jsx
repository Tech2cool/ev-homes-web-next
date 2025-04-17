// app/providers.tsx
"use client";

import { UserProvider } from "@/context/UserContext";
import { DataProvider } from "@/context/dataContext";

export function Providers({ children }) {
  return (
    <UserProvider>
      <DataProvider>{children}</DataProvider>
    </UserProvider>
  );
}
