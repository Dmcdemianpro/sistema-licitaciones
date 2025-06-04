import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TicketsPage() {
  const { data, error, isLoading } = useSWR("/api/tickets", fetcher);
  if (error) return <p>Error</p>;
  if (isLoading) return <p>Cargando…</p>;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tickets</h1>
        <Link href="/tickets/new"><Button>Nuevo</Button></Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Título</th><th className="p-2">Estado</th><th className="p-2">Creado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t: any) => (
            <tr key={t.id} className="border-t hover:bg-gray-50">
              <td className="p-2"><Link href={`/tickets/${t.id}`} className="underline">{t.title}</Link></td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">{new Date(t.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}