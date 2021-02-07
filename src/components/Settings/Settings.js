//
//  Settings.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React from "react";
// reactstrap components
import {
    Button,
    Modal,
    Row,
    Col
} from "reactstrap";

class Modals extends React.Component {
    state = {
        defaultModal: false
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    eraseAll() {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.clear();
    }

    render() {
        return (
            <>
                <Row>
                    <Col md="4">
                        <Modal
                            className="modal-dialog-centered modal-danger"
                            contentClassName="bg-gradient-danger"
                            isOpen={this.state.notificationModal}
                            toggle={() => this.toggleModal("notificationModal")}
                        >
                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-notification">
                                    Account Preferences
                                </h6>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("notificationModal")}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="py-3 text-center">
                                    <i className="ni ni-bell-55 ni-3x" />
                                    <h4 className="heading mt-4">Erase All Content and Settings</h4>
                                    <p>
                                        This will delete all media and data, and reset all settings.
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className="btn-white"
                                    color="default"
                                    type="button"
                                    onClick={() => this.eraseAll()}
                                >
                                    Erase
                                </Button>
                                <Button
                                    className="text-white ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("notificationModal")}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Modal>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Modals;