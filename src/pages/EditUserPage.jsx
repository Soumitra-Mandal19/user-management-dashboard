import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { getUserById, updateUser } from "../services/api";

function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        const data = response.data;

        // Split name into first and last
        const [firstName, ...rest] = (data.name || "").split(" ");
        const lastName = rest.join(" ");

        setUser({
          firstName,
          lastName,
          email: data.email || "",
          company: data.company?.name || "",
        });
      } catch (err) {
        setToast({
          type: "error",
          message: "Could not find user.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (updatedUser) => {
    try {
      // Transform form data to match API structure
      const userData = {
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        email: updatedUser.email,
        company: {
          name: updatedUser.company,
        },
      };

      const response = await updateUser(id, userData);

      // Check if the response is successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        setToast({ type: "success", message: "User updated successfully!" });
        // Navigate back after successful update
        setTimeout(() => {
          navigate("/users");
        }, 1500);
      } else {
        // Handle non-success status codes
        setToast({
          type: "error",
          message: `Update failed with status ${response.status}. Please try again.`,
        });
      }
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Failed to update user. Please try again.",
      });
    }
  };

  if (loading) return <p>Loading user...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto pt-6">
      {/* Go Back button above the card */}
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
        <h1 className="text-xl font-bold mb-4">Edit User</h1>

        {/* Toast */}
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

        {user && (
          <UserForm
            initialValues={user}
            onSubmit={handleUpdate}
            onCancel={() => navigate("/users")}
            isEdit={true}
          />
        )}
      </div>
    </div>
  );
}

export default EditUserPage;
