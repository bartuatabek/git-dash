//
//  RepoDetail.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import RepoDetailHeader from "components/Headers/RepoDetailHeader.js";
import NotificationAlert from "react-notification-alert";
import dateFormat from "dateformat";

class RepoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: window.location.href.slice(window.location.href.indexOf("repo-details/") + "repo-details/".length),
      description: '',
      html_url: '',
      lastCommit_author_login: '',
      lastCommit_commit_author_date: '',
      lastCommit_commit_message: '',
      lastIssue_number: 0,
      lastIssue_user_login: '',
      lastIssue_updated_at: '',
      lastIssue_body: '',
      lastPullRequest_user_login: '',
      lastPullRequest_updated_at: '',
      lastPullRequest_body: '',
      stargazers_count: 0,
      open_issues_count: 0,
      forks_count: 0,
      language: ''
    };
  }

  componentDidMount() {
    this.getRepository();

    this.getLastCommit();
    this.getLastIssue();
    this.getLastPullRequest();
  }

  // get last commit from repo
  getLastCommit() {
    fetch(`https://api.github.com/repos/${this.state.full_name}/commits?per_page=1`)
        .then(res => res.json())
        .then(
            (result) => {
              if (result.length < 1)
                return;

              if (result[0].author.login && typeof result[0].author !== 'undefined')
                this.setState({lastCommit_author_login: result[0].author.login});

              if (result[0].commit.author.date && typeof result[0].commit !== 'undefined')
                this.setState({lastCommit_commit_author_date: result[0].commit.author.date});

              if (result[0].commit.message && typeof result[0].commit !== 'undefined')
                this.setState({lastCommit_commit_message: result[0].commit.message});
            },

            (error) => {
              this.setState({
                error: error
              });
              this.notify("tc")
            }
        )
  }

  // get last open issue from repo
  getLastIssue() {
    fetch(`https://api.github.com/repos/${this.state.full_name}/issues?per_page=1`)
        .then(res => res.json())
        .then(
            (result) => {
              if (result.length < 1)
                return;

              if (result[0].number && typeof result[0].number !== 'undefined')
                this.setState({lastIssue_number: result[0].number});

              if (result[0].user.login && typeof result[0].user !== 'undefined')
                this.setState({lastIssue_user_login: result[0].user.login});

              if (result[0].updated_at && typeof result[0].updated_at !== 'undefined')
                this.setState({lastIssue_updated_at: result[0].updated_at});

              if (result[0].body && typeof result[0].body !== 'undefined')
                this.setState({lastIssue_body: result[0].body});
            },

            (error) => {
              this.setState({
                error: error
              });
              this.notify("tc")
            }
        )
  }

  // get last open pull request from repo
  getLastPullRequest() {
    fetch(`https://api.github.com/repos/${this.state.full_name}/pulls?per_page=1`)
        .then(res => res.json())
        .then(
            (result) => {
              if (result.length < 1)
                return;

              if (result[0].user.login && typeof result[0].user !== 'undefined')
                this.setState({lastPullRequest_user_login: result[0].user.login});

              if (result[0].updated_at && typeof result[0].updated_at !== 'undefined')
                this.setState({lastPullRequest_updated_at: result[0].updated_at});

              if (result[0].body && typeof result[0].body !== 'undefined')
                this.setState({lastPullRequest_body: result[0].body});

            },

            (error) => {
              this.setState({
                error: error
              });
              this.notify("tc")
            }
        )
  }

  // get missing stats from repository
  getRepository() {
    fetch(`https://api.github.com/repos/${this.state.full_name}`)
        .then(res => res.json())
        .then(
            (result) => {
              this.setState({
                html_url: result.html_url,
                description: result.description,
                stargazers_count: result.stargazers_count,
                open_issues_count: result.open_issues_count,
                forks_count: result.forks_count,
                language: result.language
              });
            },

            (error) => {
              this.setState({
                error: error
              });
              this.notify("tc")
            }
        )
  }

  notify = place => {
    let options = {
      place: place,
      message: (
          <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            Something Went Wrong
          </span>
            <span data-notify="message">
            Unable to fetch repository details. Please try again.
          </span>
          </div>
      ),
      type: "danger",
      icon: "ni ni-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  render() {
    const { full_name, description, html_url,
            stargazers_count, open_issues_count, forks_count, language,
            lastCommit_author_login, lastCommit_commit_author_date, lastCommit_commit_message,
            lastIssue_number, lastIssue_user_login, lastIssue_updated_at, lastIssue_body,
            lastPullRequest_user_login, lastPullRequest_updated_at, lastPullRequest_body
    } = this.state;

    return (
      <>
        <RepoDetailHeader full_name={full_name} description={description} />
        {/* Page content */}
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert"/>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <CardHeader>
                  <div className="text-center">
                    <h3>
                      Statistics
                    </h3>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-0">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{stargazers_count}</span>
                          <span className="description">Stars</span>
                        </div>
                        <div>
                          <span className="heading">{open_issues_count}</span>
                          <span className="description">Issues</span>
                        </div>
                        <div>
                          <span className="heading">{forks_count}</span>
                          <span className="description">Forks</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Primary Language
                    </h3>
                      <Badge color="primary" pill>
                        {language}
                      </Badge>
                    <hr className="my-4" />
                    <a href={html_url} target="_blank" rel="noreferrer">
                      Open in GitHub
                      {" "}
                      <i className="fas fa-arrow-right text-primary mr-3"/>
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Recent Activity</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Recent Commits
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-address"
                            >
                              {
                                "'" + lastCommit_author_login + "' committed on " + dateFormat(lastCommit_commit_author_date, "mmm dS, yyyy") + ":"
                              }
                            </label>
                            <Input
                                className="form-control-alternative"
                                placeholder="No Commit Message"
                                rows="4"
                                defaultValue={lastCommit_commit_message}
                                type="textarea"
                                disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Recent Issues
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-address"
                            >
                              {
                                "#" + lastIssue_number + " '" + lastIssue_user_login + "' issued on " + dateFormat(lastIssue_updated_at, "mmm dS, yyyy") + ":"
                              }
                            </label>
                            <Input
                                className="form-control-alternative"
                                placeholder="No Issue Message"
                                rows="4"
                                defaultValue={lastIssue_body}
                                type="textarea"
                                disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Recent Pull Requests
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-address"
                            >
                              {
                                "'" + lastPullRequest_user_login + "' opened Pull Request on " + dateFormat(lastPullRequest_updated_at, "mmm dS, yyyy") + ":"
                              }
                            </label>
                            <Input
                                className="form-control-alternative"
                                placeholder="No Pull Request Message"
                                rows="4"
                                defaultValue={lastPullRequest_body}
                                type="textarea"
                                disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default RepoDetail;
