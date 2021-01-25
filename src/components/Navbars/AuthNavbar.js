//
//  AuthNavbar.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

// images
import logo from 'assets/img/brand/git-dash-white.png';
import collapsed_logo from 'assets/img/brand/git-dash.png';

class AdminNavbar extends React.Component {
  render() {
    return (
        <>
          <Navbar
              className="navbar-top navbar-horizontal navbar-dark"
              expand="md"
          >
            <Container className="px-4">
              <NavbarBrand to="/dashboard" tag={Link}>
                <img alt="..." src={logo}/>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar-collapse-main">
                <span className="navbar-toggler-icon"/>
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                <div className="navbar-collapse-header d-md-none">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                            alt="..."
                            src={collapsed_logo}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button
                          className="navbar-toggler"
                          id="navbar-collapse-main"
                      >
                        <span/>
                        <span/>
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/dashboard" tag={Link}>
                      <i className="ni ni-spaceship"/>
                      <span className="nav-link-inner--text">Dashboard</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        className="nav-link-icon"
                        to="/login"
                        tag={Link}
                    >
                      <i className="ni ni-key-25"/>
                      <span className="nav-link-inner--text">Login</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                        className="nav-link-icon"
                        to="/user-profile"
                        tag={Link}
                    >
                      <i className="ni ni-single-02"/>
                      <span className="nav-link-inner--text">Profile</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </>
    );
  }
}

export default AdminNavbar;
