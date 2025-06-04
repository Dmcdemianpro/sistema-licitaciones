"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevaCitaPage() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    duracion: "",
    responsable: "",
    tipo: "",
    relacionado: "",
    recordatorio: "30",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.titulo || !formData.fecha || !formData.hora || !formData.responsable) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Cita creada",
      description: "La cita ha sido programada exitosamente",
    })

    router.push("/citas")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-4 border-b px-6 py-4">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/citas">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nueva Cita</h1>
          <p className="text-muted-foreground">Programar una nueva cita o evento</p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Cita</CardTitle>
              <CardDescription>Completa los detalles para programar la cita</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    placeholder="Reunión con proveedor"
                    value={formData.titulo}
                    onChange={(e) => handleInputChange("titulo", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Detalles adicionales sobre la cita"
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha *</Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => handleInputChange("fecha", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora">Hora *</Label>
                    <Input
                      id="hora"
                      type="time"
                      value={formData.hora}
                      onChange={(e) => handleInputChange("hora", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duracion">Duración</Label>
                    <Select value={formData.duracion} onValueChange={(value) => handleInputChange("duracion", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30min">30 minutos</SelectItem>
                        <SelectItem value="1h">1 hora</SelectItem>
                        <SelectItem value="1.5h">1.5 horas</SelectItem>
                        <SelectItem value="2h">2 horas</SelectItem>
                        <SelectItem value="3h">3 horas</SelectItem>
                        <SelectItem value="todo-dia">Todo el día</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsable">Responsable *</Label>
                    <Select
                      value={formData.responsable}
                      onValueChange={(value) => handleInputChange("responsable", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona responsable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juan-perez">Juan Pérez</SelectItem>
                        <SelectItem value="maria-garcia">María García</SelectItem>
                        <SelectItem value="carlos-lopez">Carlos López</SelectItem>
                        <SelectItem value="ana-martinez">Ana Martínez</SelectItem>
                        <SelectItem value="luis-rodriguez">Luis Rodríguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Cita</Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reunion">Reunión</SelectItem>
                        <SelectItem value="entrega">Entrega</SelectItem>
                        <SelectItem value="capacitacion">Capacitación</SelectItem>
                        <SelectItem value="revision">Revisión</SelectItem>
                        <SelectItem value="presentacion">Presentación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="relacionado">Relacionado con</Label>
                    <Input
                      id="relacionado"
                      placeholder="Ticket T-001 o Licitación L-001"
                      value={formData.relacionado}
                      onChange={(e) => handleInputChange("relacionado", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recordatorio">Recordatorio</Label>
                    <Select
                      value={formData.recordatorio}
                      onValueChange={(value) => handleInputChange("recordatorio", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos antes</SelectItem>
                        <SelectItem value="30">30 minutos antes</SelectItem>
                        <SelectItem value="60">1 hora antes</SelectItem>
                        <SelectItem value="1440">1 día antes</SelectItem>
                        <SelectItem value="none">Sin recordatorio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Programar Cita
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/citas">Cancelar</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
