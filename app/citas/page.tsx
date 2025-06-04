"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, User } from "lucide-react"
import Link from "next/link"

export default function CitasPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const citas = [
    {
      id: "C-001",
      titulo: "Reunión con proveedor de software",
      descripcion: "Revisión de propuesta técnica para nuevo sistema",
      fecha: "2024-01-22",
      hora: "10:00",
      duracion: "1 hora",
      responsable: "Juan Pérez",
      tipo: "Reunión",
      estado: "Confirmada",
      relacionado: "Ticket T-001",
    },
    {
      id: "C-002",
      titulo: "Presentación de licitación",
      descripcion: "Entrega de documentos para licitación de equipos",
      fecha: "2024-01-22",
      hora: "14:30",
      duracion: "30 min",
      responsable: "María García",
      tipo: "Entrega",
      estado: "Pendiente",
      relacionado: "Licitación L-001",
    },
    {
      id: "C-003",
      titulo: "Capacitación de usuarios",
      descripción: "Sesión de entrenamiento en nuevo módulo",
      fecha: "2024-01-23",
      hora: "09:00",
      duracion: "2 horas",
      responsable: "Carlos López",
      tipo: "Capacitación",
      estado: "Confirmada",
      relacionado: "Ticket T-005",
    },
    {
      id: "C-004",
      titulo: "Revisión de propuesta",
      descripcion: "Análisis de ofertas recibidas",
      fecha: "2024-01-24",
      hora: "11:00",
      duracion: "1.5 horas",
      responsable: "Ana Martínez",
      tipo: "Revisión",
      estado: "Programada",
      relacionado: "Licitación L-002",
    },
  ]

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Confirmada":
        return "default"
      case "Pendiente":
        return "secondary"
      case "Programada":
        return "outline"
      case "Completada":
        return "secondary"
      case "Cancelada":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Reunión":
        return "bg-blue-100 text-blue-800"
      case "Entrega":
        return "bg-green-100 text-green-800"
      case "Capacitación":
        return "bg-purple-100 text-purple-800"
      case "Revisión":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Agrupar citas por fecha
  const citasPorFecha = citas.reduce(
    (acc, cita) => {
      if (!acc[cita.fecha]) {
        acc[cita.fecha] = []
      }
      acc[cita.fecha].push(cita)
      return acc
    },
    {} as Record<string, typeof citas>,
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Gestión de Citas y Eventos</h1>
            <p className="text-muted-foreground">Administra reuniones, entregas y eventos programados</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/citas/nueva">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Cita
          </Link>
        </Button>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Programadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Total programadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Sin confirmar</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <span className="text-sm">✓</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Vista de Calendario */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Lista de Citas */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Citas</CardTitle>
                <CardDescription>Citas y eventos programados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(citasPorFecha).map(([fecha, citasDia]) => (
                    <div key={fecha}>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(fecha).toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      <div className="space-y-3">
                        {citasDia.map((cita) => (
                          <div key={cita.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">{cita.titulo}</h4>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(cita.tipo)}`}
                                  >
                                    {cita.tipo}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{cita.descripcion}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {cita.hora} ({cita.duracion})
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {cita.responsable}
                                  </span>
                                  {cita.relacionado && (
                                    <span className="text-blue-600">Relacionado: {cita.relacionado}</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge variant={getEstadoColor(cita.estado)}>{cita.estado}</Badge>
                                <Button variant="outline" size="sm">
                                  Ver Detalles
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/citas/nueva">Nueva Cita</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Ver Calendario Completo
                </Button>
                <Button variant="outline" className="w-full">
                  Exportar Agenda
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recordatorios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Reunión en 30 minutos</p>
                    <p className="text-muted-foreground">Con proveedor de software</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Entrega mañana</p>
                    <p className="text-muted-foreground">Documentos de licitación</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
