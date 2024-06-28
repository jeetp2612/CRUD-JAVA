import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class UpdateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailId: "",
      password,
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    this.phoneNumberHandler = this.phoneNumberHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      let employee = res.data;
      this.setState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        phoneNumber: employee.phoneNumber,
        emailId: employee.emailId,
        password: employee.password,
      });
    });
  }

  updateEmployee = (e) => {
    e.preventDefault();
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      emailId: this.state.emailId,
      password: this.state.password,
    };
    console.log("employee => " + JSON.stringify(employee));
    console.log("id => " + JSON.stringify(this.state.id));
    EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
      this.props.history.push("/employees");
    });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  phoneNumberHandler = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };
  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  cancel() {
    this.props.history.push("/employees");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update Employee</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Phone Number : </label>
                    <input
                      placeholder="Email Address"
                      name="phoneNumber"
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={this.phoneNumberHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email Id: </label>
                    <input
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Password :</label>
                    <input
                      placeholder="Password"
                      name="emailId"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.passwordHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.updateEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateEmployeeComponent;
