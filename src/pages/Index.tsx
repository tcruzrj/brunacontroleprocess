import { ProcessForm } from "@/components/ProcessForm";
import ProcessList from "@/components/ProcessList";
import Dashboard from "@/components/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 md:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Controle de Processos</h1>
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4 w-full justify-start overflow-x-auto">
          <TabsTrigger value="list">Processos</TabsTrigger>
          <TabsTrigger value="new">Novo Processo</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="space-y-4 sm:space-y-6">
            <Dashboard />
            <ProcessList />
          </div>
        </TabsContent>
        <TabsContent value="new">
          <ProcessForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;