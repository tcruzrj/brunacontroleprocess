import { useState } from "react";
import { ProcessForm } from "@/components/ProcessForm";
import { ProcessList } from "@/components/ProcessList";
import { Dashboard } from "@/components/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Process {
  protocol: string;
  name: string;
  responsible: string;
  entryDate: string;
  deadline: string;
  status: string;
  observations: string;
}

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>([
    {
      protocol: "PROC-2024-001",
      name: "Processo de Licenciamento Ambiental",
      responsible: "Maria Silva",
      entryDate: "2024-01-15",
      deadline: "2024-03-15",
      status: "pendente",
      observations: "Aguardando documentação complementar"
    },
    {
      protocol: "PROC-2024-002",
      name: "Renovação de Alvará",
      responsible: "João Santos",
      entryDate: "2024-01-10",
      deadline: "2024-02-10",
      status: "concluido",
      observations: "Processo finalizado dentro do prazo"
    },
    {
      protocol: "PROC-2024-003",
      name: "Análise de Projeto Arquitetônico",
      responsible: "Ana Oliveira",
      entryDate: "2024-01-05",
      deadline: "2024-02-05",
      status: "atrasado",
      observations: "Pendente de análise técnica"
    },
    {
      protocol: "PROC-2024-004",
      name: "Regularização Fundiária",
      responsible: "Carlos Pereira",
      entryDate: "2024-01-20",
      deadline: "2024-04-20",
      status: "pendente",
      observations: "Em análise documental"
    },
    {
      protocol: "PROC-2024-005",
      name: "Aprovação de Loteamento",
      responsible: "Patricia Lima",
      entryDate: "2024-01-25",
      deadline: "2024-05-25",
      status: "pendente",
      observations: "Aguardando parecer técnico"
    }
  ]);

  const handleAddProcess = (process: Process) => {
    setProcesses([...processes, process]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Sistema de Gestão de Processos</h1>
      
      <div className="space-y-8">
        <Dashboard processes={processes} />
        
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Lista de Processos</TabsTrigger>
            <TabsTrigger value="add">Adicionar Processo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <ProcessList processes={processes} />
          </TabsContent>
          
          <TabsContent value="add">
            <ProcessForm onSubmit={handleAddProcess} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;