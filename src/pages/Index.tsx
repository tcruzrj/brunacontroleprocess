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
  const [processes, setProcesses] = useState<Process[]>([]);

  const handleAddProcess = (process: Process) => {
    setProcesses([...processes, process]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Process Management System</h1>
      
      <div className="space-y-8">
        <Dashboard processes={processes} />
        
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Process List</TabsTrigger>
            <TabsTrigger value="add">Add Process</TabsTrigger>
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