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
  lastUpdated: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'flagged' | 'blocked';
  lastActive: Date;
  fraudScore: FraudScore;
  profile: UserProfile;
  activities: Activity[];
  riskMetrics: RiskMetrics;
  transactionHistory: Transaction[];
  joinDate: Date;
  actions: FraudAction[];
}

export interface UserProfile {
  joinDate: Date;
  location: string;
  phoneNumber: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  totalTransactions: number;
  accountBalance: number;
}

export interface Activity {
  type: string;
  date: Date;
  location?: string;
  device?: string;
  amount?: number;
  status: string;
}

export interface RiskMetrics {
  loginAttempts: number;
  failedTransactions: number;
  suspiciousActivities: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastAssessment: Date;
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'deposit' | 'withdrawal';
  status: 'completed' | 'pending' | 'failed';
}
