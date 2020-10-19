import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="nav-wrap shadow">
          <Container fluid>
            <Link to="/" arial-label="Market Place Home">
              <img
                src="./asset/img/logo.png"
                className="img-fluid"
                alt="Market Place Logo"
              />
            </Link>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
