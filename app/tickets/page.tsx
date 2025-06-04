"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const tickets = [
    {
      id: "T-001",
      title: "Error en sistema de facturación",
      description: "El sistema no permite generar facturas correctamente",
      type: "Error de Sistema",
      priority: "Alta",
      status: "En Progreso",
      assignee: "Juan Pérez",
      created: "2024-01-15",
      updated: "2024-01-16",
    },
    {
      id: "T-002",
      title: "Solicitud de nuevo usuario",
      description: "Crear acceso para nuevo empleado del departamento de ventas",
      type: "Soporte Técnico",
      priority: "Media",
      status: "Abierto",
      assignee: "María García",
      created: "2024-01-14",
      updated: "2024-01-14",
    },
    {
      id: "T-003",
      title: "Actualización de software",
      description: "Actualizar versión del sistema de gestión documental",
      type: "Mejora",
      priority: "Baja",
      status: "Resuelto",
      assignee: "Carlos López",
      created: "2024-01-10",
      updated: "2024-01-15",
    },
    {
      id: "T-004",
      title: "Problema de conectividad",
      description: "Usuarios reportan lentitud en la conexión a la base de datos",
      type: "Error de Sistema",
      priority: "Alta",
      status: "Abierto",
      assignee: "Ana Martínez",
      created: "2024-01-16",
      updated: "2024-01-16",
    },
    {
      id: "T-005",
      title: "Capacitación en nuevo módulo",
      description: "Solicitud de capacitación para el módulo de licitaciones",
      type: "Soporte Técnico",
      priority: "Media",
      status: "Cerrado",
      assignee: "Luis Rodríguez",
      created: "2024-01-12",
      updated: "2024-01-15",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "destructive"
      case "Media":
        return "default"
      case "Baja":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abierto":
        return "destructive"
      case "En Progreso":
        return "default"
      case "Resuelto":
        return "secondary"
      case "Cerrado":
        return "outline"
      default:
        return "outline"
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Gestión de Tickets</h1>
            <p className="text-muted-foreground">Administra incidencias y solicitudes de soporte</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/tickets/nuevo">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Ticket
          </Link>
        </Button>
      </header>

      <div className="flex-1 space-y-6 p-6">
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
                    placeholder="Buscar tickets..."
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
                  <SelectItem value="Abierto">Abierto</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Resuelto">Resuelto</SelectItem>
                  <SelectItem value="Cerrado">Cerrado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las prioridades</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Media">Media</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Tickets</CardTitle>
            <CardDescription>
              Mostrando {filteredTickets.length} de {tickets.length} tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Asignado a</TableHead>
                  <TableHead>Creado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">{ticket.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.type}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                    </TableCell>
                    <TableCell>{ticket.assignee}</TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/tickets/${ticket.id}`}>Ver</Link>
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
