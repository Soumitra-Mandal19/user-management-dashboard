import React, { useState, useEffect } from "react";

function UserForm({ initialValues, onSubmit, onCancel, isEdit = false }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        firstName: initialValues.firstName || "",
        lastName: initialValues.lastName || "",
        email: initialValues.email || "",
        company: initialValues.company || "",
      });
    }
  }, [initialValues]);

  // Validation logic - only validate touched fields
  const validateForm = (data, fieldToValidate = null) => {
    const newErrors = { ...errors };

    // If validating a specific field, only validate that field
    if (fieldToValidate) {
      const field = fieldToValidate;
      const value = data[field];

      if (field === "firstName" && (!value || !value.trim())) {
        newErrors.firstName = "First name is required.";
      } else if (field === "firstName") {
        delete newErrors.firstName;
      }

      if (field === "lastName" && (!value || !value.trim())) {
        newErrors.lastName = "Last name is required.";
      } else if (field === "lastName") {
        delete newErrors.lastName;
      }

      if (field === "email") {
        if (!value || !value.trim()) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email is invalid.";
        } else {
          delete newErrors.email;
        }
      }

      if (field === "company" && (!value || !value.trim())) {
        newErrors.company = "Company is required.";
      } else if (field === "company") {
        delete newErrors.company;
      }
    } else {
      // Validate all fields (for form submission)
      if (!(data.firstName || "").trim())
        newErrors.firstName = "First name is required.";
      if (!(data.lastName || "").trim())
        newErrors.lastName = "Last name is required.";
      if (!(data.email || "").trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = "Email is invalid.";
      }
      if (!(data.company || "").trim())
        newErrors.company = "Company is required.";
    }

    setErrors(newErrors);

    // Determine if form is valid
    const noErrors = Object.keys(newErrors).length === 0;

    if (isEdit && initialValues) {
      // Check if any field has changed
      const hasChanged = Object.keys(data).some(
        (key) => data[key] !== (initialValues[key] || "")
      );
      setIsValid(noErrors && hasChanged);
    } else {
      setIsValid(noErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Only validate if the field has been touched
    if (touched[name]) {
      validateForm(updatedData, name);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate the field when it loses focus
    validateForm(formData, name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched when submitting
    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      company: true,
    };
    setTouched(allTouched);

    validateForm(formData);
    if (isValid) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["firstName", "lastName", "email", "company"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1">
            {field === "company"
              ? "Company"
              : field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 ${
              errors[field] && touched[field]
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors[field] && touched[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default UserForm;
