import { apiBaseUrl } from "@/utils/common";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("AdminToken");
      const res = await axios.get(`${apiBaseUrl}/api/admin/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">All Payments</h1>

        <div className="hidden md:block overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Course
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Course Id
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Payment ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {p.user.firstName} {p.user.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{p.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-50 truncate">
                    {p.course.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-50 truncate">
                    {p.course.id}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${p.amount}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">
                    {p.paymentId || (
                      <span className="text-green-600 font-bold">FREE</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {payments.map((p) => (
            <div
              key={p.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">
                    {p.user.firstName} {p.user.lastName}
                  </h3>
                  <p className="text-xs text-gray-500">{p.user.email}</p>
                </div>
                <span className="font-bold text-lg text-blue-600">
                  ${p.amount}
                </span>
              </div>

              <div className="space-y-2 text-sm border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Course:</span>
                  <span className="font-medium text-gray-800 text-right ml-4">
                    ID: {p.course.id} {p.course.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment ID:</span>
                  <span className="font-mono text-blue-600">
                    {p.paymentId || "FREE"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-800">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Status:</span>
                  <span className="text-gray-800">{p.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {payments.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl mt-4 border-2 border-dashed">
            <p className="text-gray-400">No payment records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
