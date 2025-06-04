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
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevaLicitacionPage() {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    institucion: "",
    descripcion: "",
    fechaPublicacion: "",
    fechaCierre: "",
    montoEstimado: "",
    responsable: "",
    estado: "En Preparación",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.codigo || !formData.nombre || !formData.institucion || !formData.fechaCierre) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    // Simular creación de la licitación
    toast({
      title: "Licitación creada",
      description: "La licitación ha sido registrada exitosamente",
    })

    // Redirigir a la lista de licitaciones
    router.push("/licitaciones")
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
          <Link href="/licitaciones">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nueva Licitación</h1>
          <p className="text-muted-foreground">Registrar una nueva licitación pública</p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Datos principales de la licitación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="codigo">Código *</Label>
                    <Input
                      id="codigo"
                      placeholder="LIC-2024-001"
                      value={formData.codigo}
                      onChange={(e) => handleInputChange("codigo", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En Preparación">En Preparación</SelectItem>
                        <SelectItem value="Activa">Activa</SelectItem>
                        <SelectItem value="Adjudicada">Adjudicada</SelectItem>
                        <SelectItem value="Desierta">Desierta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la Licitación *</Label>
                  <Input
                    id="nombre"
                    placeholder="Adquisición de Equipos Informáticos"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institucion">Institución *</Label>
                  <Input
                    id="institucion"
                    placeholder="Ministerio de Salud"
                    value={formData.institucion}
                    onChange={(e) => handleInputChange("institucion", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Descripción detallada de la licitación"
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Fechas y Montos */}
            <Card>
              <CardHeader>
                <CardTitle>Fechas y Montos</CardTitle>
                <CardDescription>Información temporal y financiera</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fechaPublicacion">Fecha de Publicación</Label>
                    <Input
                      id="fechaPublicacion"
                      type="date"
                      value={formData.fechaPublicacion}
                      onChange={(e) => handleInputChange("fechaPublicacion", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaCierre">Fecha de Cierre *</Label>
                    <Input
                      id="fechaCierre"
                      type="date"
                      value={formData.fechaCierre}
                      onChange={(e) => handleInputChange("fechaCierre", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="montoEstimado">Monto Estimado</Label>
                    <Input
                      id="montoEstimado"
                      placeholder="$50,000"
                      value={formData.montoEstimado}
                      onChange={(e) => handleInputChange("montoEstimado", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Select
                    value={formData.responsable}
                    onValueChange={(value) => handleInputChange("responsable", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un responsable" />
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
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>Adjunta las bases y documentos relacionados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Button variant="outline" type="button">
                      Seleccionar Archivos
                    </Button>
                    <p className="mt-2 text-sm text-gray-500">Arrastra archivos aquí o haz clic para seleccionar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Crear Licitación
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/licitaciones">Cancelar</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
