import { NavLink } from "react-router-dom";
import { AlertTriangle, CheckCircle } from "lucide-react";

          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Take Action
            </h2>
            <NavLink to="/risky-users" className={({ isActive }) => 
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${isActive ? 'bg-accent' : ''}`
            }>
              <AlertTriangle className="h-4 w-4" />
              Risky Users
            </NavLink>
            <NavLink to="/whitelisted-users" className={({ isActive }) => 
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${isActive ? 'bg-accent' : ''}`
            }>
              <CheckCircle className="h-4 w-4" />
              Whitelisted Users
            </NavLink>
          </div> 