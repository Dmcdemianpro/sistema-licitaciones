"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Gavel, Ticket } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    {
      title: "Tickets Abiertos",
      value: "23",
      description: "5 críticos, 18 normales",
      icon: Ticket,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Licitaciones Activas",
      value: "8",
      description: "3 próximas a vencer",
      icon: Gavel,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Citas Hoy",
      value: "5",
      description: "2 pendientes",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tareas Completadas",
      value: "156",
      description: "Esta semana",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentTickets = [
    { id: "T-001", title: "Error en sistema de facturación", priority: "Alta", status: "En Progreso" },
    { id: "T-002", title: "Solicitud de nuevo usuario", priority: "Media", status: "Abierto" },
    { id: "T-003", title: "Actualización de software", priority: "Baja", status: "Resuelto" },
  ]

  const upcomingBids = [
    { id: "L-001", title: "Licitación Equipos Informáticos", institution: "Ministerio de Salud", daysLeft: 3 },
    { id: "L-002", title: "Servicios de Consultoría", institution: "Municipalidad", daysLeft: 7 },
    { id: "L-003", title: "Suministros de Oficina", institution: "Universidad", daysLeft: 12 },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-4 border-b px-6 py-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen general del sistema</p>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Tickets Recientes
              </CardTitle>
              <CardDescription>Últimos tickets creados o actualizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{ticket.title}</p>
                      <p className="text-xs text-muted-foreground">{ticket.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          ticket.priority === "Alta"
                            ? "destructive"
                            : ticket.priority === "Media"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge variant="outline">{ticket.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link href="/tickets">Ver todos los tickets</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Bids */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Licitaciones Próximas
              </CardTitle>
              <CardDescription>Licitaciones con fechas de cierre próximas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBids.map((bid) => (
                  <div key={bid.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{bid.title}</p>
                      <Badge variant={bid.daysLeft <= 5 ? "destructive" : "default"}>{bid.daysLeft} días</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{bid.institution}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link href="/licitaciones">Ver todas las licitaciones</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accesos directos a las funciones más utilizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Button asChild>
                <Link href="/tickets/nuevo">Crear Ticket</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/licitaciones/nueva">Nueva Licitación</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/citas/nueva">Agendar Cita</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/reportes">Generar Reporte</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
