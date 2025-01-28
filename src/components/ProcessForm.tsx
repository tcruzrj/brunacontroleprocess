import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface ProcessFormData {
  protocol: string;
  name: string;
  responsible: string;
  entryDate: string;
  deadline: string;
  status: string;
  observations: string;
}

const initialFormData: ProcessFormData = {
  protocol: "",
  name: "",
  responsible: "",
  entryDate: "",
  deadline: "",
  status: "pendente",
  observations: "",
};

export function ProcessForm({ onSubmit }: { onSubmit: (data: ProcessFormData) => void }) {
  const [formData, setFormData] = useState<ProcessFormData>(initialFormData);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.protocol || !formData.name || !formData.entryDate || !formData.deadline) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
    toast({
      title: "Sucesso",
      description: "Processo adicionado com sucesso",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="protocol">Número do Protocolo*</Label>
          <Input
            id="protocol"
            value={formData.protocol}
            onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
            placeholder="Digite o número do protocolo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Processo*</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Digite o nome do processo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsible">Responsável</Label>
          <Input
            id="responsible"
            value={formData.responsible}
            onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
            placeholder="Digite o nome do responsável"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="entryDate">Data de Entrada*</Label>
          <Input
            id="entryDate"
            type="date"
            value={formData.entryDate}
            onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Prazo*</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="pendente">Pendente</option>
            <option value="concluido">Concluído</option>
            <option value="atrasado">Atrasado</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <Textarea
          id="observations"
          value={formData.observations}
          onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
          placeholder="Digite suas observações"
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full">Adicionar Processo</Button>
    </form>
  );
}