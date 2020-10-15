import React from "react";
import Seo from "../components/Seo/";
import { Container, Form } from "react-bootstrap";

const AdminInSignIn = () => {
  return (
    <React.Fragment>
      <Seo>
        <main id="main">
          <div className="admin-login">
            <div className="market-desc">
              <img src="./asset/img/logo.png" alt="Logo description" />
            </div>
            <div className="admin-form">
              <Container>
                <img
                  src="./asset/img/logo.png"
                  alt="Logo description"
                  className="mobile-img"
                />
                <Form>
                  <h1>
                    <span>Admin</span> Login
                  </h1>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                  <button className="mp-btn solid bg-orange">Sign in</button>
                </Form>
              </Container>
            </div>
          </div>
        </main>
      </Seo>
    </React.Fragment>
  );
};

export default AdminInSignIn;
