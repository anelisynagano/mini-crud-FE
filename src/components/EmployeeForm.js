import { useState } from "react";

const EmployeeForm = ({ addEmployee }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleAdd = (e) => {
    addEmployee(e, { name, role });
    setName("");
    setRole("");
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
        name="name"
        value={name}
      />
      <input
        onChange={(e) => setRole(e.target.value)}
        type="text"
        placeholder="role"
        name="role"
        value={role}
      />
      <input type="submit" value="Add employee!" />
    </form>
  );
};

export default EmployeeForm;
