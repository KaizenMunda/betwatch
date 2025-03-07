
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchUsers } from "@/data/mockData";
import { User } from "@/types/fraudModels";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Search, User as UserIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSearchProps {
  className?: string;
  onResultSelect?: (user: User) => void;
  compact?: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({
  className,
  onResultSelect,
  compact = false,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchUsers(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (user: User) => {
    if (onResultSelect) {
      onResultSelect(user);
    } else {
      navigate(`/users/${user.id}`);
    }
    setQuery("");
    setResults([]);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className={className}>
      <div className="relative">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users by name, email, or ID..."
            className={cn(
              "pl-10 pr-10 transition-all duration-300",
              compact ? "w-[250px] focus:w-[350px]" : "w-full"
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            >
              <X size={16} />
            </Button>
          )}
        </div>

        {results.length > 0 && focused && (
          <div className="absolute z-10 mt-2 w-full rounded-md border bg-popover shadow-md animate-fade-in">
            <ul className="max-h-[300px] overflow-auto py-2">
              {results.map((user) => (
                <li key={user.id}>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-3"
                    onClick={() => handleResultClick(user)}
                  >
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
