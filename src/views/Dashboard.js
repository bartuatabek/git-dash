//
//  Dashboard.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";
import {Link} from "react-router-dom";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Col, Badge
} from "reactstrap";

// core components
import NotificationAlert from "react-notification-alert";

import Header from "components/Headers/Header.js";
import dateFormat from "dateformat";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNav: 1,
            archive: [],
            repos: [],
            github_link: ''
        };
    }

    componentDidMount() {
        // get saved repos from local storage
        let archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        for (; key = keys[i]; i++) {
            if (key !== 'isLoggedIn' && key !== 'user') {
                const repo = JSON.parse(localStorage.getItem(key));
                repo.full_name = key;
                archive.push(repo);
            }
        }

        // prepare saved repos to rendering
        this.setState({archive: archive.slice(0, 5)});

        this.getUserRepos();
    }

    // fetch user repos from GitHub
    getUserRepos() {
        if (!localStorage.getItem("user"))
            return;

        const user = JSON.parse(localStorage.getItem("user"));

        fetch(`https://api.github.com/users/${encodeURIComponent(user.login)}/repos?sort=updated`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        repos: result.slice(0, 5),
                        github_link: 'https://github.com/' + user.login + '?tab=repositories'
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

    // open GitHub repos page in new tab
    redirectToGitHub(event) {
        event.preventDefault();
        window.open(this.state.github_link);
    }

    render() {
        const {archive, repos, github_link} = this.state;

        return (
            <>
                <Header saved_repos={Object.keys(localStorage).length - 2}/>
                {/* Page content */}
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert"/>
                </div>
                <Container className="mt--7" fluid>
                    <Row className="mt-5">
                        <Col className="mb-5 mb-xl-0" xl="8">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Archived Repositories</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="/archive" className="btn btn-primary btn-sm">
                                                See all
                                            </Link>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Repository</th>
                                        <th scope="col">Stars</th>
                                        <th scope="col">Language</th>
                                        <th scope="col">Last Updated</th>
                                        <th scope="col">URL</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {archive.map((repo, index) => (
                                        <tr key={index}>
                                            <th scope="row">...{repo.full_name.slice(repo.full_name.lastIndexOf('/'))}</th>
                                            <td>{repo.stargazers_count}</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    {
                                                        (() => {
                                                            if (repo.language === "JavaScript")
                                                                return <i className="bg-warning"/>
                                                            if (repo.language === "Swift")
                                                                return <i className="bg-danger"/>
                                                            if (repo.language === "Java")
                                                                return <i className="bg-info"/>
                                                            if (repo.language === "Python")
                                                                return <i className="bg-success"/>
                                                            if (repo.language != null)
                                                                return <i className="bg-primary"/>
                                                        })()
                                                    }
                                                    {repo.language}
                                                </Badge>
                                            </td>
                                            <td>{dateFormat(repo.updated_at, "mmm dS, yyyy")}</td>
                                            <td>
                                                <a href={repo.html_url} target="_blank" rel="noreferrer">
                                                    GitHub
                                                </a>
                                                {" "} <i className="fas fa-arrow-right text-primary mr-3"/>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                        <Col xl="4">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Repositories</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="primary"
                                                href={github_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={e => this.redirectToGitHub(e)}
                                                size="sm"
                                            >
                                                See all
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Repository</th>
                                        <th scope="col">URL</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {repos.map((repo, index) => (
                                        <tr key={index}>
                                            <th scope="row">
                                                {
                                                    (() => {
                                                        if (repo.private)
                                                            return (<i className="fas fa-lock"/>)
                                                        else
                                                            return <i className="fas fa-lock-open"/>
                                                    })()
                                                }
                                                {" "}
                                                {repo.full_name.slice(repo.full_name.lastIndexOf('/'))}
                                            </th>
                                            <td>
                                                <a href={repo.html_url} target="_blank" rel="noreferrer">
                                                    <i className="fas fa-arrow-right text-primary mr-3"/>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Dashboard;
