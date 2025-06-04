"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(3, "Título requerido"),
  description: z.string().min(5, "Descripción requerida"),
  type: z.string().min(1, "Tipo requerido"),
  priority: z.string().min(1, "Prioridad requerida"),
  assignee: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const tipos = [
  "soporte-tecnico",
  "error-sistema",
  "mejora",
  "consulta",
  "mantenimiento",
];
const prioridades = ["alta", "media", "baja"];
const responsables = [
  "Ivan-Leiva",
  "Dario-Perez",
  "carlos-lopez",
  "ana-martinez",
  "luis-rodriguez",
];

export default function NuevoTicketPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        extra: {
          type: data.type,
          priority: data.priority,
          assignee: data.assignee,
        },
      }),
    });

    if (res.ok) {
      toast({
        title: "Ticket creado",
        description: "El ticket ha sido creado exitosamente",
      });
      router.push("/tickets");
    } else {
      toast({
        title: "Error",
        description: "No se pudo crear el ticket",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-4 border-b px-6 py-4">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/tickets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nuevo Ticket</h1>
          <p className="text-muted-foreground">
            Crear una nueva incidencia o solicitud
          </p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Información del Ticket</CardTitle>
              <CardDescription>
                Completa los siguientes campos para crear un nuevo ticket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input id="title" placeholder="Título" {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Descripción"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tipo */}
                  <div className="space-y-2">
                    <Label>Tipo *</Label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {tipos.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <p className="text-red-600 text-sm">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  {/* Prioridad */}
                  <div className="space-y-2">
                    <Label>Prioridad *</Label>
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la prioridad" />
                          </SelectTrigger>
                          <SelectContent>
                            {prioridades.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.priority && (
                      <p className="text-red-600 text-sm">
                        {errors.priority.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Responsable opcional */}
                <div className="space-y-2">
                  <Label>Asignar a</Label>
                  <Controller
                    name="assignee"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un responsable (opcional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {responsables.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    Crear Ticket
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/tickets">Cancelar</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
