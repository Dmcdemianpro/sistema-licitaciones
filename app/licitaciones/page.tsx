"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function LicitacionesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const licitaciones = [
    {
      id: "L-001",
      codigo: "LIC-2024-001",
      nombre: "Adquisición de Equipos Informáticos",
      institucion: "Ministerio de Salud",
      fechaPublicacion: "2024-01-10",
      fechaCierre: "2024-01-25",
      montoEstimado: "$50,000",
      estado: "Activa",
      responsable: "Juan Pérez",
      diasRestantes: 3,
    },
    {
      id: "L-002",
      codigo: "LIC-2024-002",
      nombre: "Servicios de Consultoría en TI",
      institucion: "Municipalidad Central",
      fechaPublicacion: "2024-01-08",
      fechaCierre: "2024-01-30",
      montoEstimado: "$75,000",
      estado: "Activa",
      responsable: "María García",
      diasRestantes: 7,
    },
    {
      id: "L-003",
      codigo: "LIC-2024-003",
      nombre: "Suministros de Oficina",
      institucion: "Universidad Nacional",
      fechaPublicacion: "2024-01-05",
      fechaCierre: "2024-02-05",
      montoEstimado: "$25,000",
      estado: "Activa",
      responsable: "Carlos López",
      diasRestantes: 12,
    },
    {
      id: "L-004",
      codigo: "LIC-2023-045",
      nombre: "Mantenimiento de Infraestructura",
      institucion: "Gobierno Regional",
      fechaPublicacion: "2023-12-15",
      fechaCierre: "2024-01-15",
      montoEstimado: "$120,000",
      estado: "Adjudicada",
      responsable: "Ana Martínez",
      diasRestantes: 0,
    },
    {
      id: "L-005",
      codigo: "LIC-2024-004",
      nombre: "Desarrollo de Software",
      institucion: "Ministerio de Educación",
      fechaPublicacion: "2024-01-12",
      fechaCierre: "2024-02-15",
      montoEstimado: "$95,000",
      estado: "En Preparación",
      responsable: "Luis Rodríguez",
      diasRestantes: 22,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activa":
        return "default"
      case "En Preparación":
        return "secondary"
      case "Adjudicada":
        return "outline"
      case "Vencida":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getDaysColor = (days: number) => {
    if (days <= 3) return "text-red-600"
    if (days <= 7) return "text-orange-600"
    return "text-green-600"
  }

  const filteredLicitaciones = licitaciones.filter((licitacion) => {
    const matchesSearch =
      licitacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacion.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacion.institucion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || licitacion.estado === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Gestión de Licitaciones</h1>
            <p className="text-muted-foreground">Administra y da seguimiento a licitaciones públicas</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/licitaciones/nueva">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Licitación
          </Link>
        </Button>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Licitaciones Activas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">En proceso</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas a Vencer</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Menos de 7 días</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monto Total</CardTitle>
              <span className="text-sm">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$365K</div>
              <p className="text-xs text-muted-foreground">Licitaciones activas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Adjudicadas</CardTitle>
              <span className="text-sm">✓</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar licitaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Activa">Activa</SelectItem>
                  <SelectItem value="En Preparación">En Preparación</SelectItem>
                  <SelectItem value="Adjudicada">Adjudicada</SelectItem>
                  <SelectItem value="Vencida">Vencida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Licitaciones Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Licitaciones</CardTitle>
            <CardDescription>
              Mostrando {filteredLicitaciones.length} de {licitaciones.length} licitaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Institución</TableHead>
                  <TableHead>Fecha Cierre</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Días Restantes</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicitaciones.map((licitacion) => (
                  <TableRow key={licitacion.id}>
                    <TableCell className="font-medium">{licitacion.codigo}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="font-medium truncate">{licitacion.nombre}</p>
                      </div>
                    </TableCell>
                    <TableCell>{licitacion.institucion}</TableCell>
                    <TableCell>{licitacion.fechaCierre}</TableCell>
                    <TableCell>{licitacion.montoEstimado}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(licitacion.estado)}>{licitacion.estado}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getDaysColor(licitacion.diasRestantes)}>
                        {licitacion.diasRestantes > 0 ? `${licitacion.diasRestantes} días` : "Vencida"}
                      </span>
                    </TableCell>
                    <TableCell>{licitacion.responsable}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/licitaciones/${licitacion.id}`}>Ver</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
