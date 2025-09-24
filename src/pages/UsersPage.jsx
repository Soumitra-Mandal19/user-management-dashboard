import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers, deleteUser } from "../services/api";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

function UsersPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [sortField, setSortField] = useState(null); // null, 'name', 'email', 'company'
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc', 'desc'

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on mount and when location changes (navigation back from other pages)
  useEffect(() => {
    fetchUsers();
  }, [location.pathname]);

  // Delete
  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    try {
      await deleteUser(user.id);
      // Refresh data from local copy
      await fetchUsers();
    } catch {
      alert("Error deleting user");
    }
  };

  // Edit
  const handleEdit = (user) => {
    navigate(`/users/${user.id}/edit`);
  };

  // Search and filter logic
  const filteredUsers = users.filter((user) => {
    // Search query filter
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company?.name.toLowerCase().includes(query);

    // Individual field filters
    const [firstName, ...lastNameParts] = (user.name || "").split(" ");
    const lastName = lastNameParts.join(" ");

    const matchesFirstName =
      filters.firstName === "" ||
      firstName.toLowerCase().includes(filters.firstName.toLowerCase());

    const matchesLastName =
      filters.lastName === "" ||
      lastName.toLowerCase().includes(filters.lastName.toLowerCase());

    const matchesEmail =
      filters.email === "" ||
      user.email.toLowerCase().includes(filters.email.toLowerCase());

    const matchesCompany =
      filters.company === "" ||
      (user.company?.name || "")
        .toLowerCase()
        .includes(filters.company.toLowerCase());

    return (
      matchesSearch &&
      matchesFirstName &&
      matchesLastName &&
      matchesEmail &&
      matchesCompany
    );
  });

  // Apply sorting to filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0; // No sorting

    let aValue, bValue;

    switch (sortField) {
      case "name":
        aValue = a.name?.toLowerCase() || "";
        bValue = b.name?.toLowerCase() || "";
        break;
      case "email":
        aValue = a.email?.toLowerCase() || "";
        bValue = b.email?.toLowerCase() || "";
        break;
      case "company":
        aValue = (a.company?.name || "").toLowerCase();
        bValue = (b.company?.name || "").toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  // Reset page if search changes
  useEffect(() => setCurrentPage(1), [searchQuery]);

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // reset page to 1
  };

  // Filter handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
    });
    setCurrentPage(1);
  };

  // Handle column sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Same field clicked - cycle through: asc -> desc -> none
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortField(null);
        setSortDirection("asc");
      }
    } else {
      // Different field clicked - start with ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            User Management Dashboard
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Search bar + Add User button row */}
            <div className="flex flex-col lg:flex-row lg:items-center mb-4 gap-4">
              <div className="flex-grow">
                <SearchBar onSearch={setSearchQuery} />
              </div>
              <button
                onClick={() => navigate("/users/add")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full lg:w-auto"
              >
                Add User
              </button>
            </div>

            {/* Main content area with filter sidebar and table */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filter Sidebar */}
              <div className="w-full lg:w-80 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Filters
                </h3>

                {/* First Name Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={filters.firstName}
                    onChange={(e) =>
                      handleFilterChange("firstName", e.target.value)
                    }
                    placeholder="Filter by first name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Last Name Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={filters.lastName}
                    onChange={(e) =>
                      handleFilterChange("lastName", e.target.value)
                    }
                    placeholder="Filter by last name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Email Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    value={filters.email}
                    onChange={(e) =>
                      handleFilterChange("email", e.target.value)
                    }
                    placeholder="Filter by email..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Company Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={filters.company}
                    onChange={(e) =>
                      handleFilterChange("company", e.target.value)
                    }
                    placeholder="Filter by company..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Vertical Divider - hidden on mobile */}
              <div className="hidden lg:block w-px bg-gray-300"></div>

              {/* Table Section */}
              <div className="flex-1 w-full">
                {/* Users Table */}
                <UserTable
                  users={currentUsers}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalItems={sortedUsers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
