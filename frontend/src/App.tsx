import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./hooks";

function App() {
  const user = useAppSelector((state) => state.user.value);

  async function login(user: boolean = false) {
    console.log("login");
  }

  async function logout() {
    console.log("logout");
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Movies Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item className="nav-link">
                <Link to={"/movies"}>Movies</Link>
              </Nav.Item>
              <Nav.Item className="nav-link">
                {user ? (
                  <a href="#logout" onClick={logout}>
                    Logout User
                  </a>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
