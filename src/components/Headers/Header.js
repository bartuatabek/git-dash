//
//  Header.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved_repos: this.props.saved_repos,
      total_repos: 0,
      followers: 0,
      following: 0
    };
  }

  // fetch no of saved repos from local storage
  componentDidMount() {
    if (!localStorage.getItem("user"))
      return;

    const user = JSON.parse(localStorage.getItem("user"));

    this.setState({
      saved_repos: Object.keys(localStorage).length - 2,
      total_repos: user.public_repos + user.total_private_repos,
      followers: user.followers,
      following: user.following
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      saved_repos: newProps.saved_repos
    });
  }

  render() {
    const { saved_repos, total_repos, followers, following } = this.state;

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Saved Repos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {saved_repos}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            My Repos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {total_repos}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Followers
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {followers}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Following
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                             {following}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-user-astronaut" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
