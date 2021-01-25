//
//  RepoDetailHeader.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";

// reactstrap components
import {Button, Container, Row, Col} from "reactstrap";
import {Redirect} from "react-router-dom";

class RepoDetailHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: props.full_name,
            description: props.description,
            goBack: false
        };
    }

    // remove repository from archive
    removeRepo(event) {
        event.preventDefault();

        // remove repo from local storage
        localStorage.removeItem(this.state.full_name);

        // go back to archive
        this.setState({goBack: true});
    }

    render() {
        const {full_name, description, goBack} = this.state;

        if (goBack) {
            return <Redirect to="/archive"/>;
        }

        return (
            <>
                <div
                    className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                    style={{
                        minHeight: "600px",
                        backgroundSize: "cover",
                        backgroundPosition: "center top"
                    }}
                >
                    {/* Mask */}
                    <span className="mask bg-gradient-default opacity-8"/>
                    {/* Header container */}
                    <Container className="d-flex align-items-center" fluid>
                        <Row>
                            <Col lg="7" md="10">
                                <h1 className="display-2 text-white">{full_name}</h1>
                                <p className="text-white mt-0 mb-5">
                                    {description}
                                </p>
                                <Button
                                    color="secondary"
                                    href="#"
                                    onClick={e => this.removeRepo(e)}
                                >
                                    Delete Repository
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default RepoDetailHeader;
