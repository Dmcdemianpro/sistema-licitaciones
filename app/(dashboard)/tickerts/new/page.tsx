"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TicketNew() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    router.push("/tickets");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button>Crear</Button>
    </form>
  );
}