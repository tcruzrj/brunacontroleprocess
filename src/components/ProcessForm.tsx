import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Process as ProcessType, processService } from "@/services/processService";

interface ProcessFormData {
  protocol: string;
  name: string;
  responsible: string;
  entryDate: string;
  deadline: string;
  status: string;
  observations: string;
}

const initialFormData: Omit<ProcessType, 'protocol'> = {
  name: "",
  responsible: "",
  entryDate: "",
  deadline: "",
  status: "pendente",
  observations: "",
};

export function ProcessForm() {
  const [formData, setFormData] = useState<Omit<ProcessType, 'protocol'>>(initialFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { protocol } = useParams();
  const isEditing = !!protocol;

  useEffect(() => {
    if (protocol) {
      loadProcess(protocol);
    }
  }, [protocol]);

  const loadProcess = async (protocol: string) => {
    try {
      setLoading(true);
      const process = await processService.getByProtocol(protocol);
      const { protocol: _, ...formData } = process;
      setFormData(formData);
    } catch (error) {
      console.error('Error loading process:', error);
      toast.error('Erro ao carregar processo');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.entryDate || !formData.deadline) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      if (isEditing && protocol) {
        await processService.update(protocol, formData);
        toast.success('Processo atualizado com sucesso');
      } else {
        await processService.create(formData);
        toast.success('Processo criado com sucesso');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving process:', error);
      toast.error('Erro ao salvar processo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <Button 
        type="submit" 
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          isEditing ? 'Atualizar Processo' : 'Adicionar Processo'
        )}
      </Button>
    </form>
  );
}