import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";

interface ProcessData {
  protocol: string;
  name: string;
  responsible: string;
  entryDate: string;
  deadline: string;
  status: string;
  observations: string;
}

export default function EditProcess() {
  const { protocol } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProcessData>({
    protocol: "",
    name: "",
    responsible: "",
    entryDate: "",
    deadline: "",
    status: "pendente",
    observations: "",
  });

  useEffect(() => {
    // Aqui você buscaria os dados do processo pelo protocolo
    // Por enquanto, vamos simular com dados de exemplo
    if (protocol) {
      setFormData({
        protocol: "PROC-2024-001",
        name: "Processo de Exemplo",
        responsible: "João Silva",
        entryDate: "2024-01-01",
        deadline: "2024-02-01",
        status: "pendente",
        observations: "Observações do processo",
      });
    }
  }, [protocol]);

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

    // Aqui você salvaria as alterações
    toast({
      title: "Sucesso",
      description: "Processo atualizado com sucesso",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Editar Processo</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="protocol">Número do Protocolo*</Label>
            <Input
              id="protocol"
              value={formData.protocol}
              onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
              placeholder="Digite o número do protocolo"
              disabled
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
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}