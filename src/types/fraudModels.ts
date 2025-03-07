
export type ActionType = 'flag' | 'block' | 'clear';

export interface FraudAction {
  id: string;
  userId: string;
  type: ActionType;
  timestamp: Date;
  reason?: string;
  performedBy: string;
}

export type RawParameterType = 'boolean' | 'number' | 'string' | 'date';

export interface RawParameter {
  id: string;
  name: string;
  value: any;
  type: RawParameterType;
  description?: string;
  impact?: 'high' | 'medium' | 'low';
}

export interface SubScore {
  id: string;
  name: string;
  value: number;
  weight: number;
  description?: string;
  parameters: RawParameter[];
}

export interface FraudScore {
  id: string;
  userId: string;
  value: number; // Overall score
  subScores: SubScore[];
  timestamp: Date;
  previousScores?: { date: Date; value: number }[];
  threshold: number; // Threshold for flagging
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: Date;
  lastActive: Date;
  status: 'active' | 'flagged' | 'blocked';
  fraudScore: FraudScore;
  actions: FraudAction[];
}
