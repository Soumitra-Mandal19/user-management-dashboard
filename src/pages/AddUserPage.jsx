
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { addUser } from "../services/api";

function AddUserPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleCreate = async (newUser) => {
    try {
      // Transform form data to match API structure
      const userData = {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        company: {
          name: newUser.company,
        },
      };

      const response = await addUser(userData);

      // Check if the response is successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        setToast({ type: "success", message: "User created successfully!" });
        // Navigate back after successful creation
        setTimeout(() => {
          navigate("/users");
        }, 1500);
      } else {
        // Handle non-success status codes
        setToast({
          type: "error",
          message: `Creation failed with status ${response.status}. Please try again.`,
        });
      }
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Failed to create user. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto pt-6">
      {/* Go Back button above the form card */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/users")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>

      {/* Form card */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Add User</h1>

        {/* Toast message */}
        {toast && (
          <div
            className={`mb-4 px-4 py-2 rounded ${
              toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {toast.message}
          </div>
        )}

        <UserForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            company: "",
          }}
          onSubmit={handleCreate}
          onCancel={() => navigate("/users")} // Cancel navigates back
        />
      </div>
    </div>
  );
}

export default AddUserPage;
