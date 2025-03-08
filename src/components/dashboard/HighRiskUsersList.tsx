
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon } from "lucide-react";
import { User } from "@/types/fraudModels";

interface HighRiskUsersListProps {
  users: User[];
  onUserClick: (userId: string) => void;
}

const HighRiskUsersList: React.FC<HighRiskUsersListProps> = ({ users, onUserClick }) => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>High Risk Users</CardTitle>
        <CardDescription>Users with scores above the risk threshold</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div 
              key={user.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors"
              onClick={() => onUserClick(user.id)}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <UserIcon size={18} />
              </div>
              <div className="flex-grow">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              <div className="text-muted-foreground text-sm">
                Last active: {user.lastActive.toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <div 
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    user.status === 'flagged' 
                      ? 'bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400' 
                      : user.status === 'blocked'
                      ? 'bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                      : 'bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400'
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </div>
                <div className="ml-4 font-semibold text-red-500">
                  {user.fraudScore.value.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HighRiskUsersList;
