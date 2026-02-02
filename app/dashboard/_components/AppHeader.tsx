"use client"
import React from "react"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import Image from 'next/image'

export default function AppHeader() {
  // Use a state to check if the SidebarProvider is active
  const [hasSidebar, setHasSidebar] = React.useState(false);
  
  // This internal component safely checks for sidebar context
  const SidebarElement = () => {
    try {
      const context = useSidebar();
      // If we are here, we are inside a SidebarProvider
      React.useEffect(() => setHasSidebar(true), []);
      return <SidebarTrigger />;
    } catch (e) {
      // If we are here, we are on the landing page
      return null;
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 w-full bg-white dark:bg-slate-950 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Render the toggle trigger safely */}
        <SidebarElement />
        
        {/* CONDITIONAL LOGO: 
          Only show this if we are NOT in the dashboard (no sidebar context) 
          This prevents the "double logo" in the second picture
        */}
        {!hasSidebar && (
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="MetaFlow Logo" width={30} height={30} />
            <span className="font-bold text-lg text-slate-800 dark:text-white">MetaFlow</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}