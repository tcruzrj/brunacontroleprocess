import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Process, processService } from "@/services/processService";

export default function Dashboard() {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const data = await processService.getAll();
        setProcesses(data);
      } catch (error) {
        console.error("1 - Erro ao carregar processos:", error);
      }
    };

    fetchProcesses();
  }, []);

  const totalProcesses = processes.length;
  const completedProcesses = processes.filter((p) => p.status === "concluido").length;
  const pendingProcesses = processes.filter((p) => p.status === "pendente").length;
  const delayedProcesses = processes.filter((p) => p.status === "atrasado").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card className="bg-[#F1F0FB]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProcesses}</div>
        </CardContent>
      </Card>
      <Card className="bg-[#D3E4FD]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processos Concluídos</CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedProcesses}</div>
        </CardContent>
      </Card>
      <Card className="bg-[#F2FCE2]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processos Pendentes</CardTitle>
          <Clock className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingProcesses}</div>
        </CardContent>
      </Card>
      <Card className="bg-red-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Processos Atrasados</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{delayedProcesses}</div>
        </CardContent>
      </Card>
    </div>
  );
}