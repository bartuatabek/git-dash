//
//  Explore.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";
import dateFormat from 'dateformat';

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
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

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            value: '',
            items: [],
            total_count: 0,
            saved_repos: Object.keys(localStorage).length - 2,
            currentPage: 1,
            upperPageBound: 100,
            lowerPageBound: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.value === '')
            return;

        this.setState({isLoaded: false});

        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.value)}&per_page=10&page=1`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        currentPage: 1,
                        total_count: result.total_count,
                        items: result.items
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                    this.notify("tc")
                }
            )

        event.preventDefault();
    }

    // get previous page of search results
    fetchPreviousPage(e) {
        e.preventDefault();

        if (this.state.currentPage - 1 <= this.state.lowerPageBound)
            return;

        this.setState({isLoaded: false});

        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.value)}&per_page=10&page=${this.state.currentPage + 1}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items,
                        currentPage: this.state.currentPage - 1
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    this.notify("tc")
                }
            )
    }

    // get next page of search results
    fetchNextPage(e) {
        e.preventDefault();

        if (this.state.currentPage + 1 > this.state.upperPageBound || this.state.currentPage * 10 > this.state.total_count)
            return;

        this.setState({isLoaded: false});

        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.value)}&per_page=10&page=${this.state.currentPage + 1}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items,
                        currentPage: this.state.currentPage + 1
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    this.notify("tc")
                }
            )
    }

    // add repo to achive and save to local storage
    addToList(e, full_name, description, stargazers_count, language, updated_at, html_url) {
        e.preventDefault();

        // construct repo object for local storage saving
        const repo = { 'description': description, 'stargazers_count': stargazers_count, 'language': language,
        'updated_at': updated_at, 'html_url': html_url};

        // save to local storage
        localStorage.setItem(full_name, JSON.stringify(repo));

        // update state
        this.setState({saved_repos: Object.keys(localStorage).length - 2});
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
        const {error, isLoaded, items, currentPage, saved_repos} = this.state;

        if (items.length === 0 || error) {
            return (
                <>
                    <Header saved_repos = {saved_repos}/>
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
                                                    <h3 className="mb-0">Search GitHub Repositories</h3>
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
                    <Header saved_repos = {saved_repos}/>
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
                                                    <h3 className="mb-0">Search GitHub Repositories</h3>
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
                                            <td className="text-center">
                                                <SpinnerPage/>
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
                    <Header saved_repos = {saved_repos}/>
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
                                                    <h3 className="mb-0">Search GitHub Repositories</h3>
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
                                        {items.map((repo) => (
                                            <tr key={repo.id}>
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
                                                                href="#pablo"
                                                                onClick={e => this.addToList(e, repo.full_name, repo.description,
                                                                    repo.stargazers_count, repo.language, repo.updated_at, repo.html_url)}
                                                            >
                                                                Add to Archive
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    <CardFooter className="py-4">
                                        <nav aria-label="...">
                                            <Pagination
                                                className="pagination justify-content-end mb-0"
                                                listClassName="justify-content-end mb-0"
                                            >
                                                <PaginationItem>
                                                    <PaginationLink
                                                        onClick={(e) => this.fetchPreviousPage(e)}
                                                        tabIndex="-1"
                                                    >
                                                        <i className="fas fa-angle-left"/>
                                                        <span className="sr-only">Previous</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem className="active">
                                                    <PaginationLink>
                                                        {currentPage}
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#"
                                                        onClick={(e) => this.fetchNextPage(e)}
                                                    >
                                                        <i className="fas fa-angle-right"/>
                                                        <span className="sr-only">Next</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            </Pagination>
                                        </nav>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Row>
                    </Container>
                </>
            );
        }
    }
}

export default Explore;
