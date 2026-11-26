
// import { useState } from "react";

// import SearchBar from "./components/SearchBar";
// import StudentList from "./components/StudentList";

// import "./App.css";

// function App() {

//   // Step 1: Create search state
//   const [search, setSearch] = useState("");

//   // Step 2: Create student data
//   const students = [
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//     },
//     {
//       id: 2,
//       name: "Amit Patel",
//       email: "amit@gmail.com",
//     },
//     {
//       id: 3,
//       name: "Priya Singh",
//       email: "priya@gmail.com",
//     },
//   ];

//   // Step 3: Filter students
//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <h1>Live Search Application</h1>

//       <SearchBar
//         search={search}
//         setSearch={setSearch}
//       />

//       <StudentList students={filteredStudents} />
//     </div>
//   );
// }

// export default App;



import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";

import "./App.css";

function App() {

  // Search state
  const [search, setSearch] = useState("");

  // Student data state
  const [students, setStudents] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState("");

  // Fetch API when component mounts
  useEffect(() => {

    const controller = new AbortController();

    async function fetchStudents() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        setStudents(data);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStudents();

    // Cleanup function
    return () => {
      controller.abort();
    };

  }, []);

  // Filter students
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

      {loading && <p>Loading students...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <StudentList students={filteredStudents} />
      )}
    </div>
  );
}

export default App;
