
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

const RiskDistributionCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Risk Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="text-sm">Low Risk</div>
            <div className="flex gap-2 items-center">
              <span className="text-green-500"><TrendingDown size={14} /></span>
              <span className="font-medium">58%</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '58%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">Medium Risk</div>
            <div className="flex gap-2 items-center">
              <span className="text-yellow-500"><TrendingDown size={14} /></span>
              <span className="font-medium">24%</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">High Risk</div>
            <div className="flex gap-2 items-center">
              <span className="text-red-500"><TrendingUp size={14} /></span>
              <span className="font-medium">18%</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: '18%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskDistributionCard;
