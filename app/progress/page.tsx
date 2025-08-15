"use client"

import { useState } from "react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  PiggyBank,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";

interface DebtProgress {
  id: string;
  name: string;
  originalAmount: number;
  currentAmount: number;
  interestRate: number;
  monthlyPayment: number;
  startDate: string;
  estimatedPayoff: string;
  progress: number;
  category: string;
  status: 'active' | 'paid-off' | 'refinanced';
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  achieved: boolean;
  reward: string;
}

interface PaymentHistory {
  month: string;
  totalPaid: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const debtProgress: DebtProgress[] = [
  {
    id: "1",
    name: "Credit Card Debt",
    originalAmount: 8500,
    currentAmount: 3200,
    interestRate: 18.99,
    monthlyPayment: 250,
    startDate: "2023-03-15",
    estimatedPayoff: "2025-02-15",
    progress: 62,
    category: "Credit Cards",
    status: 'active'
  },
  {
    id: "2",
    name: "Student Loan",
    originalAmount: 25000,
    currentAmount: 18900,
    interestRate: 5.5,
    monthlyPayment: 300,
    startDate: "2022-09-01",
    estimatedPayoff: "2028-06-01",
    progress: 24,
    category: "Education",
    status: 'active'
  },
  {
    id: "3",
    name: "Car Loan",
    originalAmount: 18000,
    currentAmount: 0,
    interestRate: 4.25,
    monthlyPayment: 0,
    startDate: "2021-06-01",
    estimatedPayoff: "2024-01-15",
    progress: 100,
    category: "Vehicle",
    status: 'paid-off'
  },
  {
    id: "4",
    name: "Personal Loan",
    originalAmount: 12000,
    currentAmount: 0,
    interestRate: 12.5,
    monthlyPayment: 0,
    startDate: "2022-01-01",
    estimatedPayoff: "2024-03-01",
    progress: 100,
    category: "Personal",
    status: 'paid-off'
  }
];

const milestones: Milestone[] = [
  {
    id: "1",
    title: "First $1,000 Paid",
    description: "Reached your first major milestone",
    date: "2023-06-15",
    achieved: true,
    reward: "100 XP + Badge"
  },
  {
    id: "2",
    title: "50% Debt Reduction",
    description: "Halfway to financial freedom",
    date: "2024-01-20",
    achieved: true,
    reward: "500 XP + Achievement"
  },
  {
    id: "3",
    title: "First Debt Paid Off",
    description: "Eliminated your first debt completely",
    date: "2024-01-15",
    achieved: true,
    reward: "1000 XP + Trophy"
  },
  {
    id: "4",
    title: "Second Debt Paid Off",
    description: "Two down, more to go!",
    date: "2024-03-01",
    achieved: true,
    reward: "1000 XP + Trophy"
  },
  {
    id: "5",
    title: "75% Debt Reduction",
    description: "Almost there! Keep pushing",
    date: "2024-08-15",
    achieved: false,
    reward: "750 XP + Special Badge"
  },
  {
    id: "6",
    title: "Debt Free",
    description: "Complete financial freedom achieved",
    date: "2025-06-01",
    achieved: false,
    reward: "5000 XP + Champion Title"
  }
];

const paymentHistory: PaymentHistory[] = [
  { month: "Jan 2024", totalPaid: 1200, principal: 950, interest: 250, remainingBalance: 22100 },
  { month: "Feb 2024", totalPaid: 1200, principal: 980, interest: 220, remainingBalance: 21120 },
  { month: "Mar 2024", totalPaid: 1200, principal: 1010, interest: 190, remainingBalance: 20110 },
  { month: "Apr 2024", totalPaid: 1200, principal: 1040, interest: 160, remainingBalance: 19070 },
  { month: "May 2024", totalPaid: 1200, principal: 1070, interest: 130, remainingBalance: 18000 },
  { month: "Jun 2024", totalPaid: 1200, principal: 1100, interest: 100, remainingBalance: 16900 }
];

export default function ProgressPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("6months");

  const totalOriginalDebt = debtProgress.reduce((sum, debt) => sum + debt.originalAmount, 0);
  const totalCurrentDebt = debtProgress.filter(d => d.status === 'active').reduce((sum, debt) => sum + debt.currentAmount, 0);
  const totalPaidOff = totalOriginalDebt - totalCurrentDebt;
  const overallProgress = Math.round((totalPaidOff / totalOriginalDebt) * 100);

  const totalMonthlyPayments = debtProgress.filter(d => d.status === 'active').reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const totalInterestPaid = debtProgress.reduce((sum, debt) => {
    if (debt.status === 'paid-off') {
      return sum + (debt.originalAmount * (debt.interestRate / 100) * 2.5); // Estimated interest paid
    }
    return sum;
  }, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'paid-off': return 'bg-green-100 text-green-700 border-green-200';
      case 'refinanced': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertCircle className="w-4 h-4" />;
      case 'paid-off': return <CheckCircle className="w-4 h-4" />;
      case 'refinanced': return <BarChart3 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 pb-32">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Progress Tracker</h1>
              <p className="text-sm text-gray-600">Your debt-free journey progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Overall Progress Summary */}
        <Card className="border-green-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {overallProgress}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <Progress value={overallProgress} className="h-3" />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">
                    ${totalPaidOff.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700">Total Paid Off</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">
                    ${totalCurrentDebt.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">Remaining Debt</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Savings Section */}
        <Card className="border-emerald-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">Time Savings</h2>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                47 weeks
              </div>
              <div className="text-sm text-emerald-700 mb-3">
                faster paid off than otherwise
              </div>
              <div className="text-xs text-gray-600">
                By paying extra and avoiding interest, you've accelerated your debt-free journey
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-blue-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-blue-600">
                ${totalMonthlyPayments.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Monthly Payments</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-xl font-bold text-green-600">
                ${totalInterestPaid.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">Interest Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Debts Progress */}
        <Card className="border-purple-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold text-gray-900">Debt Breakdown</h2>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {debtProgress.map((debt) => (
                <div key={debt.id} className="border rounded-lg p-3 bg-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{debt.name}</h3>
                      <Badge variant="outline" className={getStatusColor(debt.status)}>
                        {getStatusIcon(debt.status)}
                        <span className="ml-1">{debt.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        ${debt.currentAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        of ${debt.originalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-green-600">{debt.progress}%</span>
                    </div>
                    <Progress value={debt.progress} className="h-2" />
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>Rate: {debt.interestRate}%</div>
                      <div>Payment: ${debt.monthlyPayment}/mo</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="border-yellow-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold text-gray-900">Achievement Milestones</h2>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-lg border bg-white/50">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    milestone.achieved 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {milestone.achieved ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <Target className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      milestone.achieved ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-500">{milestone.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{milestone.date}</span>
                      {milestone.achieved && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          {milestone.reward}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="border-indigo-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
              <div className="flex gap-1">
                {["6months", "1year", "2years"].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedTimeframe === timeframe
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {timeframe === "6months" ? "6M" : timeframe === "1year" ? "1Y" : "2Y"}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{payment.month}</div>
                    <div className="text-sm text-gray-500">
                      Principal: ${payment.principal} | Interest: ${payment.interest}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${payment.totalPaid.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Balance: ${payment.remainingBalance.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
