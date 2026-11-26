
import { useState } from "react";

import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";

import "./App.css";

function App() {

  // Step 1: Create search state
  const [search, setSearch] = useState("");

  // Step 2: Create student data
  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
    },
    {
      id: 2,
      name: "Amit Patel",
      email: "amit@gmail.com",
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@gmail.com",
    },
  ];

  // Step 3: Filter students
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Live Search Application</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <StudentList students={filteredStudents} />
    </div>
  );
}

export default App;
