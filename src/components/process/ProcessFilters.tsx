import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProcessFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  entryDateFilter: string;
  setEntryDateFilter: (date: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const ProcessFilters = ({
  searchTerm,
  setSearchTerm,
  entryDateFilter,
  setEntryDateFilter,
  statusFilter,
  setStatusFilter,
}: ProcessFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex-1">
          <Input
            type="date"
            value={entryDateFilter}
            onChange={(e) => setEntryDateFilter(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <RadioGroup
          value={statusFilter}
          onValueChange={setStatusFilter}
          className="flex flex-wrap gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">Todos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="concluido" id="concluido" />
            <Label htmlFor="concluido">Concluídos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pendente" id="pendente" />
            <Label htmlFor="pendente">Pendentes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="atrasado" id="atrasado" />
            <Label htmlFor="atrasado">Atrasados</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};