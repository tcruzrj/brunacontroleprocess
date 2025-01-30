import { useState, useEffect } from "react";
import { Heart, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Process, processService } from "@/services/processService";
import { toast } from "sonner";
import { ProcessFilters } from "./process/ProcessFilters";
import { ProcessTable } from "./process/ProcessTable";

export default function ProcessList() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entryDateFilter, setEntryDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProcesses();
  }, []);

  const loadProcesses = async () => {
    try {
      const data = await processService.getAll();
      console.log('Dados carregados:', data);
      setProcesses(data);
    } catch (error) {
      console.error('Erro real:', error);
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
        loadProcesses();
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
      ? process.entrydate === entryDateFilter
      : true;

    const matchesStatus = statusFilter === "all" || process.status === statusFilter;

    return matchesSearch && matchesEntryDate && matchesStatus;
  });

  const handleEdit = (process: Process) => {
    navigate(`/edit/${process.protocol}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Lista de Processos
          <Heart className="h-6 w-6 text-red-500 fill-current" />
          <a 
            href="https://brunacontroleprocess.lovable.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
          >
            <FileText className="h-4 w-4" />
            Acessar Sistema
          </a>
        </h2>
      </div>

      <ProcessFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        entryDateFilter={entryDateFilter}
        setEntryDateFilter={setEntryDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ProcessTable
        processes={filteredProcesses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}