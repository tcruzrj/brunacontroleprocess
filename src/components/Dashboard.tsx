import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface Process {
  protocol: string;
  name: string;
  responsible: string;
  entryDate: string;
  deadline: string;
  status: string;
  observations: string;
}

export function Dashboard({ processes }: { processes: Process[] }) {
  const totalProcesses = processes.length;
  const completedProcesses = processes.filter((p) => p.status === "completed").length;
  const pendingProcesses = processes.filter((p) => p.status === "pending").length;
  const delayedProcesses = processes.filter((p) => p.status === "delayed").length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedProcesses}</div>
          <p className="text-xs text-muted-foreground">
            {((completedProcesses / totalProcesses) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingProcesses}</div>
          <p className="text-xs text-muted-foreground">
            {((pendingProcesses / totalProcesses) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Delayed</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{delayedProcesses}</div>
          <p className="text-xs text-muted-foreground">
            {((delayedProcesses / totalProcesses) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}