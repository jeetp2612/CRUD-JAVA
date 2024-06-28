import React, { Component } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import ListEmployeeComponent from "./ListEmployeeComponent";
// import usenavigate from ;
import reactRouterDom from "react-router-dom";

class HeaderComponent extends Component {
  // const navigate =usenavigate();
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a href="/">◀️</a>
            <div>
              <a href="https://javaguides.net" className="navbar-brand">
                Employee Management App
              </a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
