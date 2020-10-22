import React, { useState, useContext } from "react";
import Seo from "../components/Seo/";
import { Container, Form } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalContext";

const AdminInSignIn = () => {
  const { adminSignIn } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    adminSignIn({ email, password });
  };
  return (
    <React.Fragment>
      <Seo page="Admin Login">
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
                <Form onSubmit={signIn}>
                  <h1>
                    <span>Admin</span> Login
                  </h1>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
