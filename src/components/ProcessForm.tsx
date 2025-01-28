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
  status: "pending",
  observations: "",
};

export function ProcessForm({ onSubmit }: { onSubmit: (data: ProcessFormData) => void }) {
  const [formData, setFormData] = useState<ProcessFormData>(initialFormData);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.protocol || !formData.name || !formData.entryDate || !formData.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
    toast({
      title: "Success",
      description: "Process added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="protocol">Protocol Number*</Label>
          <Input
            id="protocol"
            value={formData.protocol}
            onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
            placeholder="Enter protocol number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Process Name*</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter process name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsible">Responsible</Label>
          <Input
            id="responsible"
            value={formData.responsible}
            onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
            placeholder="Enter responsible person"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="entryDate">Entry Date*</Label>
          <Input
            id="entryDate"
            type="date"
            value={formData.entryDate}
            onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline*</Label>
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
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="observations">Observations</Label>
        <Textarea
          id="observations"
          value={formData.observations}
          onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
          placeholder="Enter any observations"
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full">Add Process</Button>
    </form>
  );
}