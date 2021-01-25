//
//  AuthFooter.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-4">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2021
                  <a
                    className="font-weight-bold ml-1"
                    href="/"
                  >
                    GitDash
                  </a>
                  {" "}by Bartu Atabek. All rights reserved.
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://infinitus.cf"
                      target="_blank"
                    >
                      Bartu Atabek
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://linkedin.com/in/bartu-atabek/"
                      target="_blank"
                    >
                      LinkedIn
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/bartuatabek"
                      target="_blank"
                    >
                      GitHub
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
