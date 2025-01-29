import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Save } from "lucide-react";
import { ProcessForm } from "@/components/ProcessForm";
import { saveProcess } from '../services/processService';

interface ProcessData {
  protocol: string;
  name: string;
  responsible: string;
  entrydate: string;
  deadline: string;
  status: string;
  observations: string;
}

export default function EditProcess() {
  const navigate = useNavigate();

  const handleSave = async (data: any) => {
    try {
      const result = await saveProcess(data);
      console.log('Process saved successfully:', result);
    } catch (error) {
      console.error('1 - Failed to save process:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Editar Processo</h1>
      </div>
      
      <ProcessForm />
    </div>
  );
}