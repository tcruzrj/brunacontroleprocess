import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Pencil, Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Process, processService } from "@/services/processService";
import { toast } from "sonner";

export default function ProcessList() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entryDateFilter, setEntryDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const calculateRemainingDays = (deadline: string, status: string) => {
    if (status === "concluido") return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRemainingDaysLabel = (days: number, status?: string) => {
    if (status === "concluido") return "0 dias restantes";
    if (days < 0) return `${Math.abs(days)} dias atrasado`;
    if (days === 0) return "Vence hoje";
    if (days === 1) return "1 dia restante";
    return `${days} dias restantes`;
  };

  useEffect(() => {
    loadProcesses();
  }, []);

  const loadProcesses = async () => {
    try {
      const data = await processService.getAll();
      console.log('Dados carregados:', data); // Adicionei um console.log aqui

      setProcesses(data);
    } catch (error) {
      console.error('Erro real:', error); // Adicionei um console.log aqui
      console.error('Error loading processes:', error);
      toast.error('5 - Erro ao carregar processos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (protocol: string) => {
    if (window.confirm('Tem certeza que deseja excluir este processo?')) {
      try {
        await processService.delete(protocol);
        toast.success('Processo excluído com sucesso');
        loadProcesses(); // Recarrega a lista
      } catch (error) {
        console.error('Error deleting process:', error);
        toast.error('5 -  excluir processo');
      }
    }
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
          process.entrydate,
          process.deadline,
          getRemainingDaysLabel(remainingDays, process.status),
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

  const handleEdit = (process: Process) => {
    navigate(`/edit/${process.protocol}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Lista de Processos
          <Heart className="h-6 w-6 text-red-500 fill-current" />
        </h2>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex-1">
          <Input
            type="date"
            value={entryDateFilter}
            onChange={(e) => setEntryDateFilter(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={handleExportToExcel}>Exportar para Excel</Button>
      </div>

      <div className="mb-4">
        <RadioGroup
          value={statusFilter}
          onValueChange={setStatusFilter}
          className="flex flex-wrap gap-4"
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
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocolo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Data de Entrada</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead>Dias Restantes</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProcesses.map((process) => {
              const remainingDays = calculateRemainingDays(process.deadline, process.status);
              const remainingDaysLabel = getRemainingDaysLabel(remainingDays, process.status);
              
              return (
                <TableRow key={process.protocol}>
                  <TableCell>{process.protocol}</TableCell>
                  <TableCell>{process.name}</TableCell>
                  <TableCell>{process.responsible}</TableCell>
                  <TableCell>{process.entrydate}</TableCell>
                  <TableCell>{process.deadline}</TableCell>
                  <TableCell>{process.status}</TableCell>
                  <TableCell>{process.observations}</TableCell>
                  <TableCell>{remainingDaysLabel}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(process)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(process.protocol)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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