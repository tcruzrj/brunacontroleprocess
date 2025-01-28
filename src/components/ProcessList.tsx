import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Process {
  protocol: string;
  name: string;
  responsible: string;
  entryDate: string;
  deadline: string;
  status: string;
  observations: string;
}

export function ProcessList({ processes }: { processes: Process[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch =
      process.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.responsible.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || process.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExportToExcel = () => {
    const headers = ["Protocolo", "Nome", "Responsável", "Data de Entrada", "Prazo", "Status", "Observações"];
    const csvContent = [
      headers.join(","),
      ...filteredProcesses.map((process) =>
        [
          process.protocol,
          process.name,
          process.responsible,
          process.entryDate,
          process.deadline,
          process.status,
          `"${process.observations}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "processos.csv";
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquisar processos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="concluido">Concluído</option>
            <option value="atrasado">Atrasado</option>
          </select>
          <Button onClick={handleExportToExcel}>Exportar para Excel</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocolo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Data de Entrada</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProcesses.map((process, index) => (
              <TableRow key={index}>
                <TableCell>{process.protocol}</TableCell>
                <TableCell>{process.name}</TableCell>
                <TableCell>{process.responsible}</TableCell>
                <TableCell>{process.entryDate}</TableCell>
                <TableCell>{process.deadline}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      process.status === "concluido"
                        ? "bg-green-100 text-green-800"
                        : process.status === "atrasado"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {process.status === "concluido"
                      ? "Concluído"
                      : process.status === "atrasado"
                      ? "Atrasado"
                      : "Pendente"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/edit/${process.protocol}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}