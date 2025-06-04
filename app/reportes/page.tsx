"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Download, FileText, Calendar, TrendingUp, PieChart } from "lucide-react"

export default function ReportesPage() {
  const [filtros, setFiltros] = useState({
    tipoReporte: "",
    fechaInicio: "",
    fechaFin: "",
    responsable: "",
    estado: "",
  })

  const reportesDisponibles = [
    {
      id: "tickets-resumen",
      nombre: "Resumen de Tickets",
      descripcion: "Estadísticas generales de tickets por período",
      icono: FileText,
      categoria: "Tickets",
    },
    {
      id: "tickets-rendimiento",
      nombre: "Rendimiento de Soporte",
      descripcion: "Tiempos de respuesta y resolución",
      icono: TrendingUp,
      categoria: "Tickets",
    },
    {
      id: "licitaciones-activas",
      nombre: "Licitaciones Activas",
      descripcion: "Estado actual de todas las licitaciones",
      icono: BarChart3,
      categoria: "Licitaciones",
    },
    {
      id: "licitaciones-historico",
      nombre: "Histórico de Licitaciones",
      descripcion: "Análisis histórico de licitaciones adjudicadas",
      icono: PieChart,
      categoria: "Licitaciones",
    },
    {
      id: "citas-agenda",
      nombre: "Agenda de Citas",
      descripcion: "Programación de citas y eventos",
      icono: Calendar,
      categoria: "Citas",
    },
    {
      id: "productividad",
      nombre: "Productividad General",
      descripcion: "Métricas de productividad del equipo",
      icono: TrendingUp,
      categoria: "General",
    },
  ]

  const reportesGenerados = [
    {
      id: "R-001",
      nombre: "Resumen Tickets Enero 2024",
      tipo: "Tickets",
      fechaGeneracion: "2024-01-22",
      generadoPor: "Juan Pérez",
      estado: "Completado",
      tamaño: "2.3 MB",
    },
    {
      id: "R-002",
      nombre: "Licitaciones Q4 2023",
      tipo: "Licitaciones",
      fechaGeneracion: "2024-01-20",
      generadoPor: "María García",
      estado: "Completado",
      tamaño: "1.8 MB",
    },
    {
      id: "R-003",
      nombre: "Productividad Diciembre",
      tipo: "General",
      fechaGeneracion: "2024-01-18",
      generadoPor: "Carlos López",
      estado: "En Proceso",
      tamaño: "-",
    },
  ]

  const generarReporte = () => {
    console.log("Generando reporte con filtros:", filtros)
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Tickets":
        return "bg-blue-100 text-blue-800"
      case "Licitaciones":
        return "bg-green-100 text-green-800"
      case "Citas":
        return "bg-purple-100 text-purple-800"
      case "General":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "default"
      case "En Proceso":
        return "secondary"
      case "Error":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-4 border-b px-6 py-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">Reportes y Análisis</h1>
          <p className="text-muted-foreground">Genera reportes personalizados y analiza métricas del sistema</p>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Generador de Reportes */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generar Nuevo Reporte</CardTitle>
                <CardDescription>Configura los parámetros para generar un reporte personalizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-reporte">Tipo de Reporte</Label>
                    <Select
                      value={filtros.tipoReporte}
                      onValueChange={(value) => setFiltros((prev) => ({ ...prev, tipoReporte: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tickets-resumen">Resumen de Tickets</SelectItem>
                        <SelectItem value="tickets-rendimiento">Rendimiento de Soporte</SelectItem>
                        <SelectItem value="licitaciones-activas">Licitaciones Activas</SelectItem>
                        <SelectItem value="licitaciones-historico">Histórico de Licitaciones</SelectItem>
                        <SelectItem value="citas-agenda">Agenda de Citas</SelectItem>
                        <SelectItem value="productividad">Productividad General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsable">Responsable</Label>
                    <Select
                      value={filtros.responsable}
                      onValueChange={(value) => setFiltros((prev) => ({ ...prev, responsable: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los responsables" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="juan-perez">Juan Pérez</SelectItem>
                        <SelectItem value="maria-garcia">María García</SelectItem>
                        <SelectItem value="carlos-lopez">Carlos López</SelectItem>
                        <SelectItem value="ana-martinez">Ana Martínez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha-inicio">Fecha Inicio</Label>
                    <Input
                      id="fecha-inicio"
                      type="date"
                      value={filtros.fechaInicio}
                      onChange={(e) => setFiltros((prev) => ({ ...prev, fechaInicio: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha-fin">Fecha Fin</Label>
                    <Input
                      id="fecha-fin"
                      type="date"
                      value={filtros.fechaFin}
                      onChange={(e) => setFiltros((prev) => ({ ...prev, fechaFin: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={generarReporte} className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generar Reporte
                </Button>
              </CardContent>
            </Card>

            {/* Reportes Disponibles */}
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Reportes Disponibles</CardTitle>
                <CardDescription>Explora los diferentes tipos de reportes que puedes generar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {reportesDisponibles.map((reporte) => (
                    <div key={reporte.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-md">
                          <reporte.icono className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{reporte.nombre}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(reporte.categoria)}`}
                            >
                              {reporte.categoria}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{reporte.descripcion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-4">
            {/* Reportes Recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Reportes Recientes</CardTitle>
                <CardDescription>Últimos reportes generados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportesGenerados.map((reporte) => (
                    <div key={reporte.id} className="border rounded-lg p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{reporte.nombre}</h4>
                          <Badge variant={getEstadoColor(reporte.estado)} className="text-xs">
                            {reporte.estado}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Tipo: {reporte.tipo}</p>
                          <p>Generado: {reporte.fechaGeneracion}</p>
                          <p>Por: {reporte.generadoPor}</p>
                          {reporte.tamaño !== "-" && <p>Tamaño: {reporte.tamaño}</p>}
                        </div>
                        {reporte.estado === "Completado" && (
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="h-3 w-3 mr-1" />
                            Descargar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Reportes este mes</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Más solicitado</span>
                    <span className="font-medium">Tickets</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tiempo promedio</span>
                    <span className="font-medium">2.3 min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tamaño promedio</span>
                    <span className="font-medium">1.8 MB</span>
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
