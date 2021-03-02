import { Component, useState } from "react";

class Employee extends Component {
  constructor(props) {
    super(props);

    const { name, role, id } = this.props;
    this.state = {
      isEditMode: false,
      name,
      role,
      id,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleEdit = () => {
    const { editEmployee } = this.props;
    const { name, role, id, isEditMode } = this.state;
    this.setState({ isEditMode: !isEditMode });
    editEmployee({
      name,
      role,
      id,
    });
  };

  render() {
    const { isEditMode, name, role, id } = this.state;
    const { deleteEmployee } = this.props;
    return (
      <div className="employee-card">
        {isEditMode ? (
          <form>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="name"
              value={name}
              name="name"
            />
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="role"
              name="role"
              value={role}
            />
          </form>
        ) : (
          <>
            <div>Name: {name}</div>
            <div>Role: {role}</div>
          </>
        )}
        <button onClick={this.handleEdit}>
          {isEditMode ? "Save Edit Employee" : "Edit Employee"}
        </button>
        <button onClick={() => deleteEmployee(id)}>Delete</button>
      </div>
    );
  }
}

export default Employee;
