import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Process } from "@/services/processService";
import { cn } from "@/lib/utils";

interface ProcessTableProps {
  processes: Process[];
  onEdit: (process: Process) => void;
  onDelete: (protocol: string) => void;
}

export const ProcessTable = ({ processes, onEdit, onDelete }: ProcessTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-[#F2FCE2] text-green-800";
      case "concluido":
        return "bg-[#D3E4FD] text-blue-800";
      case "atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  return (
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
          {processes.map((process) => {
            const remainingDays = calculateRemainingDays(process.deadline, process.status);
            const remainingDaysLabel = getRemainingDaysLabel(remainingDays, process.status);
            
            return (
              <TableRow key={process.protocol}>
                <TableCell>{process.protocol}</TableCell>
                <TableCell>{process.name}</TableCell>
                <TableCell>{process.responsible}</TableCell>
                <TableCell>{process.entrydate}</TableCell>
                <TableCell>{process.deadline}</TableCell>
                <TableCell>
                  <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(process.status))}>
                    {process.status}
                  </span>
                </TableCell>
                <TableCell>{process.observations}</TableCell>
                <TableCell>{remainingDaysLabel}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(process)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onDelete(process.protocol)}>
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
  );
};