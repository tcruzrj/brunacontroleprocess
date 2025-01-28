import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

interface Process {
  protocol: string;
  name: string;
  responsible: string;
  entryDate: string;
  deadline: string;
  status: string;
  observations: string;
}

export function ProcessList({ processes }: { processes: Process[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch =
      process.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.responsible.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || process.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExportToExcel = () => {
    // Convert processes to CSV
    const headers = ["Protocol", "Name", "Responsible", "Entry Date", "Deadline", "Status", "Observations"];
    const csvContent = [
      headers.join(","),
      ...filteredProcesses.map((process) =>
        [
          process.protocol,
          process.name,
          process.responsible,
          process.entryDate,
          process.deadline,
          process.status,
          `"${process.observations}"`,
        ].join(",")
      ),
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "processes.csv";
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search processes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
          <Button onClick={handleExportToExcel}>Export to Excel</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Responsible</TableHead>
              <TableHead>Entry Date</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProcesses.map((process, index) => (
              <TableRow key={index}>
                <TableCell>{process.protocol}</TableCell>
                <TableCell>{process.name}</TableCell>
                <TableCell>{process.responsible}</TableCell>
                <TableCell>{process.entryDate}</TableCell>
                <TableCell>{process.deadline}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      process.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : process.status === "delayed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {process.status.charAt(0).toUpperCase() + process.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}