"use client"

import { Calendar, FileText, Gavel, Home, Settings, Ticket, Users, Bell, BarChart3 } from "lucide-react"
import Link from "next/link"

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

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Tickets",
    url: "/tickets",
    icon: Ticket,
  },
  {
    title: "Licitaciones",
    url: "/licitaciones",
    icon: Gavel,
  },
  {
    title: "Citas y Eventos",
    url: "/citas",
    icon: Calendar,
  },
  {
    title: "Notificaciones",
    url: "/notificaciones",
    icon: Bell,
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: BarChart3,
  },
]

const adminItems = [
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: Users,
  },
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <FileText className="h-6 w-6" />
          <span className="font-semibold">Sistema de Gestión</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos Principales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Sistema Activo</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
