"use client";

import { Wallet, TrendingUp, Download } from "lucide-react";
import VendorSidebar from "@/components/dashboard/VendorSidebar";
import SectionWrapper from "@/components/layout/SectionWrapper";

const mockWalletData = {
  availableBalance: 125450,
  thisMonth: 45200,
  totalEarnings: 890750,
  transactions: [
    {
      id: 1,
      type: "payment_received",
      title: "Payment Received",
      description: "Order #VS-2024-001",
      amount: 29990,
      timestamp: "2 hours ago",
      isPositive: true,
    },
    {
      id: 2,
      type: "payment_received",
      title: "Payment Received",
      description: "Order #VS-2024-002",
      amount: 49990,
      timestamp: "1 day ago",
      isPositive: true,
    },
    {
      id: 3,
      type: "withdrawal",
      title: "Withdrawal",
      description: "Bank transfer",
      amount: 50000,
      timestamp: "3 days ago",
      isPositive: false,
    },
  ],
};

export default function VendorWalletPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SectionWrapper className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            <VendorSidebar />
            <main className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Wallet</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-[#D7195B] to-[#B01548] text-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Available Balance</h3>
                  <p className="text-3xl font-bold">
                    ₦{mockWalletData.availableBalance.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">This Month</h3>
                  <p className="text-3xl font-bold">
                    ₦{mockWalletData.thisMonth.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2">Total Earnings</h3>
                  <p className="text-3xl font-bold">
                    ₦{mockWalletData.totalEarnings.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Recent Transactions
                  </h3>
                  <button className="text-[#D7195B] hover:text-[#B01548] text-sm font-medium">
                    View All
                  </button>
                </div>

                {mockWalletData.transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <Wallet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No transactions yet
                    </h3>
                    <p className="text-gray-600">
                      Your transaction history will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockWalletData.transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between py-3 border-b border-gray-100"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`font-medium ${
                              transaction.isPositive
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.isPositive ? "+" : "-"}₦
                            {transaction.amount.toLocaleString()}
                          </span>
                          <p className="text-xs text-gray-500">
                            {transaction.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left text-sm text-blue-700 hover:text-blue-800 py-1">
                      • Withdraw Funds
                    </button>
                    <button className="w-full text-left text-sm text-blue-700 hover:text-blue-800 py-1">
                      • View Transaction History
                    </button>
                    <button className="w-full text-left text-sm text-blue-700 hover:text-blue-800 py-1">
                      • Download Statement
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">
                    Earnings Tips
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Promote your products to increase sales</li>
                    <li>• Offer competitive pricing</li>
                    <li>• Provide excellent customer service</li>
                    <li>• Keep your product catalog updated</li>
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
