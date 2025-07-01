"use client";
import React, { useState, useMemo } from "react";
import { ArrowUpDown, Edit2, Trash2 } from "lucide-react";

/* --------------------- colour tokens (matches card theme) ------------------- */
const categoryStyles = {
  Food:       "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Utilities:  "bg-blue-500/20   text-blue-400   border-blue-500/30",
  Lifestyle:  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Transport:  "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

const payEmoji = {
  "Credit Card":  "💳",
  "Debit Card":   "💳",
  "Bank Transfer":"🏦",
  UPI:            "📱",
  Cash:           "💵",
};

/* ------------------------------- component ---------------------------------- */
export default function ExpensesTable({ data }) {
  /* pagination */
  const [page,   setPage]   = useState(1);
  const rowsPerPage = 5;
  const pageCount   = Math.ceil(data.length / rowsPerPage);

  /* client-side sort */
  const [sortKey,  setSortKey]  = useState("date");
  const [asc,      setAsc]      = useState(false);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const x = a[sortKey];
      const y = b[sortKey];
      return asc ? x > y ? 1 : -1 : x < y ? 1 : -1;
    });
  }, [data, sortKey, asc]);

  const paged = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  /* helpers */
  const th = (label, key) => (
    <th
      className="px-6 py-4 font-semibold cursor-pointer select-none"
      onClick={() => {
        if (sortKey === key) setAsc(!asc);
        else { setSortKey(key); setAsc(true); }
      }}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown
          size={14}
          className={`transition-transform ${
            sortKey === key ? (asc ? "rotate-180" : "") : "opacity-30"
          }`}
        />
      </div>
    </th>
  );

  const handleEdit   = (row) => console.log("Edit", row);
  const handleDelete = (row) => console.log("Delete", row);

  return (
    <>
      {/* table wrapper */}
      <div className="w-full overflow-x-auto border border-zinc-700 rounded-md">
        <table className="min-w-[720px] w-full text-left text-sm">
          {/* header */}
          <thead className="bg-zinc-800/60 text-zinc-300 border-b border-zinc-700">
            <tr>
              {th("ID", "id")}
              {th("Title", "title")}
              {th("Amount", "amount")}
              {th("Category", "category")}
              {th("Date", "date")}
              {th("Payment", "method")}
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>

          {/* body */}
          <tbody className="text-zinc-200">
            {paged.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-zinc-700/40 hover:bg-zinc-700/20 ${
                  i % 2 ? "bg-zinc-800/10" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <code className="px-2 py-1 rounded bg-zinc-700/50 text-orange-300 text-xs">
                    {row.id}
                  </code>
                </td>
                <td className="px-6 py-4 font-medium text-white">{row.title}</td>
                <td className="px-6 py-4 font-bold text-orange-400">
                  ₹{row.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${
                      categoryStyles[row.category] ?? "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
                    }`}
                  >
                    {row.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(row.date).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{payEmoji[row.method] ?? "💳"}</span>
                    <span className="text-sm">{row.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs truncate">{row.description}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button onClick={() => handleEdit(row)}   className="text-blue-400 hover:text-blue-300"><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(row)} className="text-red-400  hover:text-red-300"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}

            {/* filler rows to keep table height consistent */}
            {Array.from({ length: rowsPerPage - paged.length }).map((_, i) => (
              <tr key={`empty-${i}`} style={{ height: "64px" }}>
                <td colSpan={8}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 text-sm rounded bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700"
        >
          Previous
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`px-3 py-1 text-sm rounded ${
              n === page
                ? "bg-orange-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => setPage(p => Math.min(p + 1, pageCount))}
          disabled={page === pageCount}
          className="px-3 py-1 text-sm rounded bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700"
        >
          Next
        </button>
      </div>
    </>
  );
}
