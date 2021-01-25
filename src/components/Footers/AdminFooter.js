//
//  AdminFooter.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2021
              <a
                className="font-weight-bold ml-1"
                href="/"
                rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Bartu Atabek
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://linkedin.com/in/bartu-atabek/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/bartuatabek"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
