import Pagination from "./components/Pagination"
import SearchBar from "./components/SearchBar"
import UserTable from "./components/UserTable";


function App() {
 const dummyUsers = [
    { id: 1, name: "Soumitra", email: "soumitra@example.com", company: { name: "OpenAI" } },
    { id: 2, name: "John Doe", email: "john@example.com", company: { name: "Google" } }
  ];

    const handleDelete = (user) => {
    console.log("Delete clicked for:", user);
  };

  const handleEdit = (user) => {
    console.log("Edit clicked for:", user);
  };

  const handleSort = (field) => {
    console.log("Sort clicked on:", field);
  };

  return (
    <div>
      <SearchBar/>
      <Pagination/>
      <UserTable
      users={dummyUsers}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSort={handleSort}
        sortField="name"
        sortDirection="asc"
      
      
      
      />

    </div>
  )
}

export default App
