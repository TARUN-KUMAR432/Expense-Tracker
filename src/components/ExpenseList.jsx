import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import {
  formatCurrency,
  formatDate,
  getCategoryTextColor,
} from "../utils/expenses";
import { Trash2 } from "lucide-react";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  const filteredExpenses = expenses.filter(
    (expense) => categoryFilter === "all" || expense.category === categoryFilter
  );

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success("Expense deleted successfully");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">
          Expense History
        </h2>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1 rounded-md border bg-black/60 text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} className="" value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className=" rounded-lg shadow-sm p-8 text-center text-white">
          <p className="mb-2">No expenses found</p>
          {categoryFilter !== "all" && (
            <p>Try changing the category filter or add new expenses.</p>
          )}
        </div>
      ) : (
        <div className="bg-black/60  rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left  font-bold text-sm border text-white  uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left  font-bold text-sm border text-white  uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left  font-bold text-sm border text-white  uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left  font-bold text-sm border text-white  uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left  font-bold text-sm border text-white  uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-900  transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm  font-medium text-white border">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white border">
                      {expense.description}
                    </td>
                    <td className="px-6 border text-white py-4 whitespace-nowrap text-sm">
                      <span
                        className={`${getCategoryTextColor(
                          expense.category
                        )}  font-medium`}
                      >
                        {expense.category.charAt(0).toUpperCase() +
                          expense.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 border text-white whitespace-nowrap text-sm font-medium ">
                      {formatCurrency(expense.amount)}
                    </td> 

                    <td className="px-6 py-4 border text-white whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
