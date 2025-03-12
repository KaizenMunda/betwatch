import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface ThresholdSettings {
  review: number;
  autoFlag: number;
  autoBlock: number;
}

interface WeightSettings {
  [key: string]: number;
}

const defaultWeights: Record<string, WeightSettings> = {
  bot: {
    rapidBetting: 30,
    patternRecognition: 25,
    sessionDuration: 20,
    timeConsistency: 25
  },
  dumping: {
    lossRate: 35,
    betSizeVariance: 35,
    timeOfPlay: 30
  },
  collusion: {
    tableOccupancy: 25,
    winDistribution: 30,
    playerInteraction: 25,
    chipTransfer: 20
  },
  ghosting: {
    accountSwitching: 40,
    ipOverlap: 30,
    deviceSharing: 30
  },
  splash: {
    unusualBets: 35,
    winningPattern: 35,
    playerNetwork: 30
  },
  rta: {
    decisionSpeed: 35,
    optimalPlay: 35,
    consistencyScore: 30
  }
};

const RiskThresholds = () => {
  const [thresholds, setThresholds] = React.useState<Record<string, ThresholdSettings>>({
    bot: { review: 5.0, autoFlag: 8.0, autoBlock: 9.0 },
    dumping: { review: 5.0, autoFlag: 8.0, autoBlock: 9.0 },
    collusion: { review: 5.0, autoFlag: 8.0, autoBlock: 9.0 },
    ghosting: { review: 5.0, autoFlag: 8.0, autoBlock: 9.0 },
    splash: { review: 5.0, autoFlag: 8.0, autoBlock: 9.0 },
    rta: { review: 5.0, autoFlag: 8.0, autoBlock: 9.0 },
  });

  const [weights, setWeights] = React.useState<Record<string, WeightSettings>>(defaultWeights);

  const handleThresholdChange = (
    category: string,
    type: keyof ThresholdSettings,
    value: number[]
  ) => {
    setThresholds((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value[0],
      },
    }));
  };

  const handleWeightChange = (
    category: string,
    subScore: string,
    value: number[]
  ) => {
    setWeights((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subScore]: value[0],
      },
    }));
  };

  const ThresholdSection = ({ category }: { category: string }) => (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Review Threshold</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[thresholds[category].review]}
                onValueChange={(value) => handleThresholdChange(category, "review", value)}
                min={0}
                max={10}
                step={0.1}
                className="flex-1"
              />
              <div className="flex items-center">
                <Input
                  type="number"
                  value={thresholds[category].review}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 10) {
                      handleThresholdChange(category, "review", [value]);
                    }
                  }}
                  className="w-20 text-right"
                  step={0.1}
                  min={0}
                  max={10}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Users will be marked for review when they exceed this threshold
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Auto-Flag Threshold</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[thresholds[category].autoFlag]}
                onValueChange={(value) => handleThresholdChange(category, "autoFlag", value)}
                min={0}
                max={10}
                step={0.1}
                className="flex-1"
              />
              <div className="flex items-center">
                <Input
                  type="number"
                  value={thresholds[category].autoFlag}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 10) {
                      handleThresholdChange(category, "autoFlag", [value]);
                    }
                  }}
                  className="w-20 text-right"
                  step={0.1}
                  min={0}
                  max={10}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Users will be automatically flagged when they exceed this threshold
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Auto-Block Threshold</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[thresholds[category].autoBlock]}
                onValueChange={(value) => handleThresholdChange(category, "autoBlock", value)}
                min={0}
                max={10}
                step={0.1}
                className="flex-1"
              />
              <div className="flex items-center">
                <Input
                  type="number"
                  value={thresholds[category].autoBlock}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 10) {
                      handleThresholdChange(category, "autoBlock", [value]);
                    }
                  }}
                  className="w-20 text-right"
                  step={0.1}
                  min={0}
                  max={10}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Users will be automatically blocked when they exceed this threshold
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );

  const WeightSection = ({ category }: { category: string }) => (
    <div className="space-y-8">
      <div className="grid gap-6">
        {Object.entries(weights[category]).map(([subScore, weight]) => (
          <div key={subScore} className="space-y-4">
            <div className="space-y-2">
              <Label className="capitalize">
                {subScore.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[weight]}
                  onValueChange={(value) => handleWeightChange(category, subScore, value)}
                  min={0}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 100) {
                        handleWeightChange(category, subScore, [value]);
                      }
                    }}
                    className="w-20 text-right"
                    step={5}
                    min={0}
                    max={100}
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total weight: {Object.values(weights[category]).reduce((a, b) => a + b, 0)}%
        </p>
        <div className="flex gap-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Risk Thresholds</h1>
          <p className="text-muted-foreground">
            Configure risk score thresholds and weights for automated actions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Threshold Configuration</CardTitle>
          <CardDescription>
            Set thresholds for different risk categories. Actions will be triggered automatically when users exceed these thresholds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bot" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="bot">Bot Score</TabsTrigger>
              <TabsTrigger value="dumping">Dumping Score</TabsTrigger>
              <TabsTrigger value="collusion">Collusion Score</TabsTrigger>
              <TabsTrigger value="ghosting">Ghosting Score</TabsTrigger>
              <TabsTrigger value="splash">Splash Collusion</TabsTrigger>
              <TabsTrigger value="rta">RTA Score</TabsTrigger>
            </TabsList>

            {Object.keys(thresholds).map((category) => (
              <TabsContent key={category} value={category}>
                <ThresholdSection category={category} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weight Configuration</CardTitle>
          <CardDescription>
            Configure the weight of each sub-score in calculating the final risk score. Weights should total 100%.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bot" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="bot">Bot Score</TabsTrigger>
              <TabsTrigger value="dumping">Dumping Score</TabsTrigger>
              <TabsTrigger value="collusion">Collusion Score</TabsTrigger>
              <TabsTrigger value="ghosting">Ghosting Score</TabsTrigger>
              <TabsTrigger value="splash">Splash Collusion</TabsTrigger>
              <TabsTrigger value="rta">RTA Score</TabsTrigger>
            </TabsList>

            {Object.keys(weights).map((category) => (
              <TabsContent key={category} value={category}>
                <WeightSection category={category} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskThresholds; 