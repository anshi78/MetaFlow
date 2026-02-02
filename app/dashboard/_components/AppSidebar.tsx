"use client";

import React, { useEffect, useState } from 'react' // Added hooks
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import Link from 'next/link'
import { Database, Headphones, LayoutDashboard, WalletCards, User } from 'lucide-react'
import { usePathname } from 'next/navigation';

const MenuOptions = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'AI Agents', url: '/dashboard/my-agents', icon: Headphones },
  { title: 'Pricing', url: '/dashboard/pricing', icon: WalletCards },
  { title: 'Profile', url: '/dashboard/profile', icon: User },
]

function AppSidebar() {
  const [isMounted, setIsMounted] = useState(false);

  const path=usePathname();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Or a skeleton/loading state

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex gap-2 items-center p-2'>
          <Image src={"/logo.svg"} alt="Logo" width={35} height={35} />
          <h2 className='font-bold text-lg'>MetaFlow</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild size="lg" isActive={path===menu.url?true:false}>
                    
                    <Link href={menu.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar;