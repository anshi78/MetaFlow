import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "./_components/AppSidebar"
import AppHeader from "./_components/AppHeader"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* The Sidebar component itself */}
      <AppSidebar /> 
      
      <SidebarInset>
        {/* AppHeader is now safely INSIDE the Provider */}
        <AppHeader /> 
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}