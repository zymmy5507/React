
function StudentList() {
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

  return (
    <div>
      <h2>Student List</h2>

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
