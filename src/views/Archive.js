//
//  Archive.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";
import {Link} from "react-router-dom";
import dateFormat from 'dateformat';

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Table,
    Container,
    Row,
    FormGroup, Form, Input, Col, InputGroup, InputGroupAddon, InputGroupText,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import NotificationAlert from "react-notification-alert";
import SpinnerPage from "../components/Spinner/SpinnerPage";

// images
import project_icon from 'assets/img/theme/github.jpg';

class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            value: '',
            items: [],
            total_count: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({isLoaded: false});

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
        this.setState({items: archive, isLoaded: true, total_count: archive.length});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.value === '') {
            this.componentDidMount();
            return;
        }

        this.setState({isLoaded: false});

        // get saved repos from local storage
        let archive = [],
            keys = Object.keys(localStorage),
            i = 0, key;

        // search if saved keys contains query
        for (; key = keys[i]; i++) {
            if (key !== 'isLoggedIn' && key !== 'user' && key.includes(this.state.value)) {
                const repo = JSON.parse(localStorage.getItem(key));
                repo.full_name = key;
                archive.push(repo);
            }
        }

        // prepare saved repos to rendering
        this.setState({items: archive, isLoaded: true});

        event.preventDefault();
    }

    removeRepo(event, full_name) {
        event.preventDefault();

        // remove repo from local storage
        localStorage.removeItem(full_name);

        // update state var items
        const index = this.state.items.findIndex(x => x.full_name === full_name);
        const updatedItems = this.state.items;
        updatedItems.splice(index, 1);
        if (index !== undefined) {
            this.setState({items: updatedItems, total_count: this.state.total_count - 1});
        }
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
            Unable to fetch repositories. Please try again.
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
        const {error, isLoaded, items, total_count} = this.state;

        if (items.length === 0 || error) {
            return (
                <>
                    <Header saved_repos = {total_count}/>
                    {/* Page content */}
                    <div className="react-notification-alert-container">
                        <NotificationAlert ref="notificationAlert"/>
                    </div>
                    <Container className="mt--7" fluid>
                        {/* Table */}
                        <Row>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Container>
                                            <Row>
                                                <Col lg="9" className="align-self-center">
                                                    <h3 className="mb-0">Archived GitHub Repositories</h3>
                                                </Col>
                                                <Col>
                                                    <Form className="navbar-search form-inline d-md-flex ml-md-auto"
                                                          action='#' onSubmit={this.handleSubmit}>
                                                        <FormGroup className="mb-0">
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="fas fa-search"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Search" type="text"
                                                                       value={this.state.value}
                                                                       onChange={this.handleChange}/>
                                                                <Input type="submit" style={{display: "none"}} value="Submit"/>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Repository & Description</th>
                                            <th scope="col">Stars</th>
                                            <th scope="col">Language</th>
                                            <th scope="col">Last Updated</th>
                                            <th scope="col">URL</th>
                                            <th scope="col"/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            [...Array(10)].map((n, index) =>
                                                <tr key={index}>
                                                    <td/>
                                                    <td/>
                                                    <td/>
                                                    <td/>
                                                    <td/>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                        </Row>
                    </Container>
                </>
            );
        } else if (!isLoaded) {
            return (
                <>
                    <Header saved_repos = {total_count}/>
                    {/* Page content */}
                    <Container className="mt--7" fluid>
                        {/* Table */}
                        <Row>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Container>
                                            <Row>
                                                <Col lg="9" className="align-self-center">
                                                    <h3 className="mb-0">Archived GitHub Repositories</h3>
                                                </Col>
                                                <Col>
                                                    <Form className="navbar-search form-inline d-md-flex ml-md-auto"
                                                          action='#' onSubmit={this.handleSubmit}>
                                                        <FormGroup className="mb-0">
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="fas fa-search"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Search" type="text"
                                                                       value={this.state.value}
                                                                       onChange={this.handleChange}/>
                                                                <Input type="submit" style={{display: "none"}} value="Submit"/>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Repository & Description</th>
                                            <th scope="col">Stars</th>
                                            <th scope="col">Language</th>
                                            <th scope="col">Last Updated</th>
                                            <th scope="col">URL</th>
                                            <th scope="col"/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colSpan={6}>
                                                <div className="btn-wrapper text-center">
                                                    <SpinnerPage/>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                        </Row>
                    </Container>
                </>
            );
        } else {
            return (
                <>
                    <Header saved_repos = {total_count}/>
                    {/* Page content */}
                    <Container className="mt--7" fluid>
                        {/* Table */}
                        <Row>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Container>
                                            <Row>
                                                <Col lg="9" className="align-self-center">
                                                    <h3 className="mb-0">Archived GitHub Repositories</h3>
                                                </Col>
                                                <Col>
                                                    <Form className="navbar-search form-inline d-md-flex ml-md-auto"
                                                          action='#' onSubmit={this.handleSubmit}>
                                                        <FormGroup className="mb-0">
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="fas fa-search"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Search" type="text"
                                                                       value={this.state.value}
                                                                       onChange={this.handleChange}/>
                                                                <Input type="submit" style={{display: "none"}} value="Submit"/>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Repository & Description</th>
                                            <th scope="col">Stars</th>
                                            <th scope="col">Language</th>
                                            <th scope="col">Last Updated</th>
                                            <th scope="col">URL</th>
                                            <th scope="col"/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {items.map((repo, index) => (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <Media className="align-items-center" style={{display: "block"}}>
                                                        <a
                                                            className="avatar rounded-circle mr-3"
                                                            href={repo.html_url}
                                                            style={{backgroundColor: "transparent"}}
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            <img
                                                                alt="..."
                                                                src={project_icon}
                                                            />
                                                        </a>
                                                        <Media>
                            <span className="mb-0 text-sm" style={{display: "block", whiteSpace: "pre-wrap"}}>
                                {repo.full_name}
                                {"\n"}
                                <small
                                    className="text-muted">{repo.description && repo.description.slice(0, 75)}...</small>
                            </span>
                                                        </Media>
                                                    </Media>
                                                </th>
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
                                                <td>
                                                    {dateFormat(repo.updated_at, "mmm dS, yyyy")}
                                                </td>
                                                <td>
                                                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                                                        {repo.html_url.slice(0, 25)}...
                                                    </a>
                                                </td>
                                                <td className="text-right">
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            className="btn-icon-only text-light"
                                                            href="#pablo"
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={e => e.preventDefault()}
                                                        >
                                                            <i className="fas fa-ellipsis-v"/>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                tag={Link} to={"/repo-details/" + repo.full_name}
                                                            >
                                                                Show more
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                href="#pablo"
                                                                onClick={e => this.removeRepo(e, repo.full_name)}
                                                            >
                                                                Remove from Archive
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                        </Row>
                    </Container>
                </>
            );
        }
    }
}

export default Archive;
