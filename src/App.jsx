// import Pagination from "./components/Pagination"
// import SearchBar from "./components/SearchBar"
// import UserTable from "./components/UserTable";


// function App() {
//  const dummyUsers = [
//     { id: 1, name: "Soumitra", email: "soumitra@example.com", company: { name: "OpenAI" } },
//     { id: 2, name: "John Doe", email: "john@example.com", company: { name: "Google" } }
//   ];

//     const handleDelete = (user) => {
//     console.log("Delete clicked for:", user);
//   };

//   const handleEdit = (user) => {
//     console.log("Edit clicked for:", user);
//   };

//   const handleSort = (field) => {
//     console.log("Sort clicked on:", field);
//   };

//   return (
//     <div>
//       <SearchBar/>
//       <Pagination/>
//       <UserTable
//       users={dummyUsers}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//         onSort={handleSort}
//         sortField="name"
//         sortDirection="asc"
      
      
      
//       />

//     </div>
//   )
// }

// export default App


import React, { useState } from "react";
import UserForm from "./components/UserForm";

function App() {
  const [showForm, setShowForm] = useState(true); // toggle form visibility

  const initialValues = {
    firstName: "Soumitra",
    lastName: "Mandal",
    email: "soumitra@example.com",
    company: "OpenAI",
  };

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    alert(`Form submitted! Check console for data.`);
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Form Test</h1>

      {showForm ? (
        <UserForm
          initialValues={initialValues} 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEdit={true} 
        />
      ) : (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setShowForm(true)}
        >
          Open Form
        </button>
      )}
    </div>
  );
}

export default App;
