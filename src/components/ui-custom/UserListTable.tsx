import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TablePagination } from "@/components/ui-custom/TablePagination";

export interface User {
  id: string;
  username: string;
  sessionId: string;
  tableType: string;
  handsPlayed: number;
  bbsDumped: number;
  winRate: number;
  beneficiaryUser: string;
  beneficiaryId: string;
  numPlayers: number;
  avgClosingAction: number;
  bonusConversion: number;
  chipDumpingScore: number;
  status: "active" | "flagged" | "review";
  location: string;
  date: string;
}

export interface Column {
  header: string;
  accessor: keyof User;
  className?: string;
  headerClassName?: string;
  render?: (value: any, user: User) => React.ReactNode;
}

interface UserListTableProps {
  users: User[];
  columns: Column[];
  title?: string;
  description?: string;
  onAction: (action: "block" | "flag" | "review", userId: string, userName: string) => void;
  isExpanded?: boolean;
}

const UserListTable: React.FC<UserListTableProps> = ({
  users,
  columns,
  title,
  description,
  onAction,
  isExpanded = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-red-500";
    if (score >= 5) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search users..."
          className="max-w-sm"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="review">Under Review</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead 
                  key={column.accessor}
                  className={`${column.headerClassName || column.className || ""} ${!isExpanded && column.className?.includes("hidden") ? "hidden" : ""}`}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                {columns.map((column) => (
                  <TableCell 
                    key={column.accessor}
                    className={`${column.className || ""} ${!isExpanded && column.className?.includes("hidden") ? "hidden" : ""}`}
                  >
                    {column.render
                      ? column.render(user[column.accessor], user)
                      : user[column.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserListTable; 