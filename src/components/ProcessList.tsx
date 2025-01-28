import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
  const [entryDateFilter, setEntryDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const calculateRemainingDays = (deadline: string, status: string) => {
    if (status === "concluido") return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRemainingDaysLabel = (days: number) => {
    if (days < 0) return `${Math.abs(days)} dias atrasado`;
    if (days === 0) return "Vence hoje";
    if (days === 1) return "1 dia restante";
    return `${days} dias restantes`;
  };

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch =
      process.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.responsible.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEntryDate = entryDateFilter
      ? process.entryDate === entryDateFilter
      : true;

    const matchesStatus = statusFilter === "all" || process.status === statusFilter;

    return matchesSearch && matchesEntryDate && matchesStatus;
  });

  const handleExportToExcel = () => {
    const headers = ["Protocolo", "Nome", "Responsável", "Data de Entrada", "Prazo", "Dias Restantes", "Status", "Observações"];
    const csvContent = [
      headers.join(","),
      ...filteredProcesses.map((process) => {
        const remainingDays = calculateRemainingDays(process.deadline, process.status);
        return [
          process.protocol,
          process.name,
          process.responsible,
          process.entryDate,
          process.deadline,
          getRemainingDaysLabel(remainingDays),
          process.status,
          `"${process.observations}"`,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "processos.csv";
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por nome, protocolo ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex-1">
            <Input
              type="date"
              value={entryDateFilter}
              onChange={(e) => setEntryDateFilter(e.target.value)}
              className="w-full"
              placeholder="Filtrar por data de entrada"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <RadioGroup
            value={statusFilter}
            onValueChange={setStatusFilter}
            className="flex flex-row items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">Todos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="concluido" id="concluido" />
              <Label htmlFor="concluido">Concluídos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pendente" id="pendente" />
              <Label htmlFor="pendente">Pendentes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="atrasado" id="atrasado" />
              <Label htmlFor="atrasado">Atrasados</Label>
            </div>
          </RadioGroup>
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
              <TableHead>Dias Restantes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProcesses.map((process, index) => {
              const remainingDays = calculateRemainingDays(process.deadline, process.status);
              return (
                <TableRow key={index}>
                  <TableCell>{process.protocol}</TableCell>
                  <TableCell>{process.name}</TableCell>
                  <TableCell>{process.responsible}</TableCell>
                  <TableCell>{process.entryDate}</TableCell>
                  <TableCell>{process.deadline}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        remainingDays < 0
                          ? "bg-red-100 text-red-800"
                          : remainingDays <= 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {getRemainingDaysLabel(remainingDays)}
                    </span>
                  </TableCell>
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
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}