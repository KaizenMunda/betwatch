import React from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface User {
  id: string;
  username: string;
  lastActive: string;
  riskScore: number;
  location: string;
  status: string;
  [key: string]: any; // For additional columns
}

interface Column {
  header: string;
  accessor: string;
  render?: (value: any) => React.ReactNode;
}

interface UserListTableProps {
  users: User[];
  columns: Column[];
  title?: string;
  description?: string;
}

const UserListTable = ({ users, columns, title, description }: UserListTableProps) => {
  const handleAction = (userId: string, action: string) => {
    console.log(`${action} user:`, userId);
  };

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

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessor}>{column.header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {columns.map((column) => (
                <TableCell key={column.accessor}>
                  {column.render ? (
                    column.render(user[column.accessor])
                  ) : column.accessor === "riskScore" ? (
                    <span className={getScoreColor(user[column.accessor])}>
                      {user[column.accessor].toFixed(1)}
                    </span>
                  ) : (
                    user[column.accessor]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(user.id, "review")}
                    className="bg-green-50 hover:bg-green-100 text-green-600"
                  >
                    Review
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(user.id, "flag")}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-600"
                  >
                    Flag
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(user.id, "block")}
                    className="bg-red-50 hover:bg-red-100 text-red-600"
                  >
                    Block
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UserListTable; 