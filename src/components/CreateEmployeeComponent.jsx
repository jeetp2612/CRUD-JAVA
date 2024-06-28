import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import "./CreateEmployeeComponent.css"; // Make sure the path is correct
import * as EmailValidator from "email-validator";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailId: "",
      password: "",
      errors: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailId: "",
        password: "",
      },
      isValid: false,
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    this.phoneNumberHandler = this.phoneNumberHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
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
  }

  validateForm = () => {
    const { firstName, lastName, phoneNumber, emailId, password } = this.state;
    let errors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailId: "",
      password: "",
    };
    let isValid = true;

    if (!firstName.match(/^[A-Za-z]+$/)) {
      errors.firstName = "First name should not contain any digits.";
      isValid = false;
    }

    if (!lastName.match(/^[A-Za-z]+$/)) {
      errors.lastName = "Last name should not contain any digits.";
      isValid = false;
    }

    if (!phoneNumber.match(/^\d{10}$/)) {
      errors.phoneNumber = "Phone number must be exactly 10 digits.";
      isValid = false;
    }

    if (!EmailValidator.validate(emailId) || !emailId.endsWith("gmail.com")) {
      errors.emailId = "Email should be valid and contain 'gmail.com'.";
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    this.setState({ errors, isValid });
  };

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (this.state.isValid) {
      let employee = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        emailId: this.state.emailId,
        password: this.state.password,
      };
      console.log("employee => " + JSON.stringify(employee));
      if (this.state.id === "_add") {
        EmployeeService.createEmployee(employee).then((res) => {
          this.props.history.push("/employees");
        });
      } else {
        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
          this.props.history.push("/employees");
        });
      }
    }
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value }, this.validateForm);
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value }, this.validateForm);
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value }, this.validateForm);
  };

  phoneNumberHandler = (event) => {
    const newPhoneNumber = event.target.value;
    if (newPhoneNumber.length <= 10) {
      this.setState({ phoneNumber: newPhoneNumber }, this.validateForm);
    }
  };

  passwordHandler = (event) => {
    const newPassword = event.target.value;
    if (newPassword.length <= 6) {
      this.setState({ password: newPassword }, this.validateForm);
    }
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }

  // Method to validate key presses for input fields
  handleKeyPress = (event, pattern) => {
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  };

  render() {
    const { errors, isValid } = this.state;
    return (
      <div className="form-container">
        {this.getTitle()}
        <form onSubmit={this.saveOrUpdateEmployee}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={this.state.firstName}
              onChange={this.changeFirstNameHandler}
              onKeyPress={(e) => this.handleKeyPress(e, /^[A-Za-z]$/)}
            />
            {/* {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )} */}
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={this.state.lastName}
              onChange={this.changeLastNameHandler}
              onKeyPress={(e) => this.handleKeyPress(e, /^[A-Za-z]$/)}
            />
            {/* {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )} */}
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              required
              value={this.state.phoneNumber}
              onChange={this.phoneNumberHandler}
              onKeyPress={(e) => this.handleKeyPress(e, /^[0-9]$/)}
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={this.state.emailId}
              onChange={this.changeEmailHandler}
              onKeyPress={(e) => this.handleKeyPress(e, /^[A-Za-z0-9@.]$/)}
            />
            {errors.emailId && <span className="error">{errors.emailId}</span>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={this.state.password}
              onChange={this.passwordHandler}
            />
            {/* {errors.password && (
              <span className="error">{errors.password}</span>
            )} */}
          </div>
          <button type="submit" disabled={!isValid}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default CreateEmployeeComponent;
