"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(3, "Título muy corto"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  defaultValues?: Partial<FormData>;
  ticketId?: number;
};

export default function TicketForm({ defaultValues, ticketId }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const res = await fetch(
      ticketId ? `/api/tickets/${ticketId}` : "/api/tickets",
      {
        method: ticketId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (res.ok) {
      toast.success(ticketId ? "Ticket actualizado" : "Ticket creado");
      router.push("/tickets");
      router.refresh();
    } else {
      toast.error("Error al guardar");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("title")}
        placeholder="Título"
        className="w-full border p-2 rounded"
      />
      {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

      <textarea
        {...register("description")}
        placeholder="Descripción"
        className="w-full border p-2 rounded h-32"
      />
      {errors.description && (
        <p className="text-red-600 text-sm">{errors.description.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {ticketId ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
