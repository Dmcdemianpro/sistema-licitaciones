"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, Settings, Check, X } from "lucide-react"

export default function NotificacionesPage() {
  const [configuracion, setConfiguracion] = useState({
    emailTickets: true,
    emailLicitaciones: true,
    emailCitas: false,
    pushTickets: true,
    pushLicitaciones: true,
    pushCitas: true,
    frecuenciaResumen: "diario",
  })

  const notificaciones = [
    {
      id: "N-001",
      tipo: "ticket",
      titulo: "Nuevo ticket creado",
      mensaje: "Se ha creado el ticket T-006: Problema de conectividad",
      fecha: "2024-01-22 10:30",
      leida: false,
      prioridad: "alta",
    },
    {
      id: "N-002",
      tipo: "licitacion",
      titulo: "Licitación próxima a vencer",
      mensaje: "La licitación L-001 vence en 3 días",
      fecha: "2024-01-22 09:15",
      leida: false,
      prioridad: "media",
    },
    {
      id: "N-003",
      tipo: "cita",
      titulo: "Recordatorio de cita",
      mensaje: "Reunión con proveedor en 30 minutos",
      fecha: "2024-01-22 09:30",
      leida: true,
      prioridad: "baja",
    },
    {
      id: "N-004",
      tipo: "ticket",
      titulo: "Ticket resuelto",
      mensaje: "El ticket T-003 ha sido marcado como resuelto",
      fecha: "2024-01-21 16:45",
      leida: true,
      prioridad: "baja",
    },
    {
      id: "N-005",
      tipo: "sistema",
      titulo: "Mantenimiento programado",
      mensaje: "El sistema estará en mantenimiento el domingo de 2:00 a 4:00 AM",
      fecha: "2024-01-21 14:20",
      leida: false,
      prioridad: "media",
    },
  ]

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "ticket":
        return "🎫"
      case "licitacion":
        return "⚖️"
      case "cita":
        return "📅"
      case "sistema":
        return "⚙️"
      default:
        return "📢"
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "destructive"
      case "media":
        return "default"
      case "baja":
        return "secondary"
      default:
        return "outline"
    }
  }

  const marcarComoLeida = (id: string) => {
    // Lógica para marcar notificación como leída
    console.log(`Marcando notificación ${id} como leída`)
  }

  const marcarTodasLeidas = () => {
    // Lógica para marcar todas las notificaciones como leídas
    console.log("Marcando todas las notificaciones como leídas")
  }

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Notificaciones</h1>
            <p className="text-muted-foreground">Centro de notificaciones y configuración de alertas</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive">{notificacionesNoLeidas} sin leer</Badge>
          <Button variant="outline" onClick={marcarTodasLeidas}>
            Marcar todas como leídas
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Lista de Notificaciones */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones Recientes
                </CardTitle>
                <CardDescription>Últimas alertas y notificaciones del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificaciones.map((notificacion) => (
                    <div
                      key={notificacion.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        !notificacion.leida ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl">{getTipoIcon(notificacion.tipo)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${!notificacion.leida ? "font-semibold" : ""}`}>
                                {notificacion.titulo}
                              </h4>
                              <Badge variant={getPrioridadColor(notificacion.prioridad)} className="text-xs">
                                {notificacion.prioridad}
                              </Badge>
                              {!notificacion.leida && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notificacion.mensaje}</p>
                            <p className="text-xs text-muted-foreground">{notificacion.fecha}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!notificacion.leida && (
                            <Button variant="outline" size="sm" onClick={() => marcarComoLeida(notificacion.id)}>
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel de Configuración */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración
                </CardTitle>
                <CardDescription>Personaliza tus preferencias de notificación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notificaciones por Email */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Notificaciones por Email
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-tickets" className="text-sm">
                        Tickets
                      </Label>
                      <Switch
                        id="email-tickets"
                        checked={configuracion.emailTickets}
                        onCheckedChange={(checked) => setConfiguracion((prev) => ({ ...prev, emailTickets: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-licitaciones" className="text-sm">
                        Licitaciones
                      </Label>
                      <Switch
                        id="email-licitaciones"
                        checked={configuracion.emailLicitaciones}
                        onCheckedChange={(checked) =>
                          setConfiguracion((prev) => ({ ...prev, emailLicitaciones: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-citas" className="text-sm">
                        Citas
                      </Label>
                      <Switch
                        id="email-citas"
                        checked={configuracion.emailCitas}
                        onCheckedChange={(checked) => setConfiguracion((prev) => ({ ...prev, emailCitas: checked }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Notificaciones Push */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notificaciones Push
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-tickets" className="text-sm">
                        Tickets
                      </Label>
                      <Switch
                        id="push-tickets"
                        checked={configuracion.pushTickets}
                        onCheckedChange={(checked) => setConfiguracion((prev) => ({ ...prev, pushTickets: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-licitaciones" className="text-sm">
                        Licitaciones
                      </Label>
                      <Switch
                        id="push-licitaciones"
                        checked={configuracion.pushLicitaciones}
                        onCheckedChange={(checked) =>
                          setConfiguracion((prev) => ({ ...prev, pushLicitaciones: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-citas" className="text-sm">
                        Citas
                      </Label>
                      <Switch
                        id="push-citas"
                        checked={configuracion.pushCitas}
                        onCheckedChange={(checked) => setConfiguracion((prev) => ({ ...prev, pushCitas: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Guardar Configuración</Button>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total notificaciones</span>
                    <span className="font-medium">{notificaciones.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sin leer</span>
                    <span className="font-medium text-red-600">{notificacionesNoLeidas}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Esta semana</span>
                    <span className="font-medium">12</span>
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
