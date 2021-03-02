import { Component } from "react";
import Employee from "./Employee";
import EmployeeForm from "./EmployeeForm";

class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeesData: [],
    };
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => this.setState({ employeesData: data }));
  };

  addEmployee = (e, employeeInfo) => {
    e.preventDefault();
    fetch("http://localhost:5000/employees", {
      method: "POST",
      body: JSON.stringify(employeeInfo),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({ employeesData: [...this.state.employeesData, data] })
      );
    this.setState({ name: "", role: "" });
  };

  editEmployee = (editedEmployee) => {
    fetch(`http://localhost:5000/employees/${editedEmployee.id}`, {
      method: "PUT",
      body: JSON.stringify(editedEmployee),
      headers: { "Content-type": "application/json" },
    });
  };

  deleteEmployee = (deletedEmployeeId) => {
    const id = { id: deletedEmployeeId };
    fetch(`http://localhost:5000/employees/${deletedEmployeeId}`, {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: { "Content-type": "application/json" },
    });
    this.setState({
      employeesData: this.state.employeesData.filter(
        (employee) => employee.id !== deletedEmployeeId
      ),
    });
  };

  render() {
    return (
      <div>
        <EmployeeForm
          handleChange={this.handleChange}
          addEmployee={this.addEmployee}
        />

        {this.state.employeesData.map((employee) => (
          <Employee
            deleteEmployee={this.deleteEmployee}
            editEmployee={this.editEmployee}
            handleChange={this.handleChange}
            key={employee.id}
            {...employee}
          />
        ))}
      </div>
    );
  }
}

export default EmployeesList;
