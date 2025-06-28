"use client";
import React, { useState } from "react";

const categoryColors = {
  Food: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Utilities: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Lifestyle: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Transport: "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const paymentMethods = {
  "Credit Card": "💳",
  "Bank Transfer": "🏦",
  UPI: "📱",
  "Debit Card": "💳",
  Cash: "💵",
};

const ExpensesTable = ({ dummyData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dummyData.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (item) => {
    console.log("Edit", item);
  };

  const handleDelete = (item) => {
    console.log("Delete", item);
  };

  return (
    <>
      <div className="w-full overflow-hidden border border-zinc-700">
        <table className="w-full text-left text-sm table-fixed">
          <thead className="bg-zinc-800/50 text-zinc-300 border-b border-zinc-700/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Expense ID</th>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Payment</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-zinc-200">
            {currentData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-zinc-700/30 hover:bg-zinc-700/20 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-zinc-800/20" : ""
                }`}
                style={{ height: "64px" }} // Fixed row height
              >
                <td className="px-6 py-4">
                  <code className="bg-zinc-700/50 px-2 py-1 rounded text-xs font-mono text-orange-300">
                    {item.id}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{item.title}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-orange-400">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      categoryColors[item.category] ||
                      "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                    }`}
                  >
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-300">
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {paymentMethods[item.method] || "💳"}
                    </span>
                    <span className="text-zinc-300 text-sm">{item.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400 max-w-xs truncate">
                  {item.description}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 hover:cursor-pointer text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-400 hover:cursor-pointer text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Filler rows to preserve height */}
            {Array.from({ length: itemsPerPage - currentData.length }).map((_, i) => (
              <tr
                key={`empty-${i}`}
                className="border-b border-zinc-700/30"
                style={{ height: "64px" }}
              >
                <td colSpan={8}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 text-sm bg-zinc-800 text-white rounded hover:bg-zinc-700"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i + 1
                ? "bg-orange-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 text-sm bg-zinc-800 text-white rounded hover:bg-zinc-700"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ExpensesTable;
