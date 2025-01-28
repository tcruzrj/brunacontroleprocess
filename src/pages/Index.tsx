import { ProcessForm } from "@/components/ProcessForm";
import ProcessList from "@/components/ProcessList";
import Dashboard from "@/components/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Controle de Processos</h1>
      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Lista de Processos</TabsTrigger>
          <TabsTrigger value="new">Novo Processo</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <ProcessList />
        </TabsContent>
        <TabsContent value="new">
          <ProcessForm />
        </TabsContent>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;