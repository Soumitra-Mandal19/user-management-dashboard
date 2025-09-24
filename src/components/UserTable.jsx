import React from "react";


function UserTable({
  users = [],
  onDelete,
  onEdit,
  onSort,
  sortField,
  sortDirection,
}) {
  

  // Handle header click for sorting
  const handleHeaderClick = (field) => {
    if (onSort) {
      onSort(field);
    }
  };

  // Get sort indicator for a field
  const getSortIndicator = (field) => {
    if (sortField !== field) return "";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 w-full">
      <table className="min-w-full w-full border-collapse text-sm text-left text-gray-700">
        {/* Table Header */}
        <thead className="bg-gray-800 text-white uppercase text-xs font-semibold">
          <tr>
            <th className="px-3 lg:px-6 py-3 border border-gray-700">ID</th>
            <th
              className="px-3 lg:px-6 py-3 border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => handleHeaderClick("name")}
            >
              Name{getSortIndicator("name")}
            </th>
            <th
              className="px-3 lg:px-6 py-3 border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => handleHeaderClick("email")}
            >
              Email{getSortIndicator("email")}
            </th>
            <th
              className="px-3 lg:px-6 py-3 border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => handleHeaderClick("company")}
            >
              Company{getSortIndicator("company")}
            </th>
            <th className="px-3 lg:px-6 py-3 border border-gray-700 text-center">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition-colors`}
              >
                <td className="px-3 lg:px-6 py-4 border border-gray-300 font-medium">
                  {user.id}
                </td>
                <td className="px-3 lg:px-6 py-4 border border-gray-300">
                  {user.name}
                </td>
                <td className="px-3 lg:px-6 py-4 border border-gray-300">
                  {user.email}
                </td>
                <td className="px-3 lg:px-6 py-4 border border-gray-300">
                  {user.company?.name}
                </td>
                <td className="px-3 lg:px-6 py-4 border border-gray-300 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Edit button */}
                    <button
                      onClick={() =>
                        onEdit
                          ? onEdit(user)
                          : navigate(`/users/${user.id}/edit`)
                      }
                      className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>

                    {/* Delete still handled by parent */}
                    <button
                      onClick={() => onDelete(user)}
                      className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-gray-500 italic border border-gray-300"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
