//
//  Login.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React, {useState, useEffect, useContext} from "react";
import {Redirect} from "react-router-dom";
import {AuthContext} from "../../App";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    Col
} from "reactstrap";

import SpinnerPage from "../../components/Spinner/SpinnerPage";

import github from 'assets/img/icons/common/github.svg';

function Login() {
    const {state, dispatch} = useContext(AuthContext);
    const [data, setData] = useState({errorMessage: "", isLoading: false});

    const {client_id, redirect_uri} = state;

    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        // If Github API returns the code parameter
        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);
            setData({...data, isLoading: true});

            const requestData = {
                code: newUrl[1]
            };

            // Use code parameter and other parameters to make POST request to proxy_server
            const { code } = requestData;

            const form_data = new FormData();
            form_data.append("client_id", "836f35dd5231a7d99587");
            form_data.append("client_secret", "c27aca8e0c3000720c6e7f4514e1b05a846564fd");
            form_data.append("code", code);
            form_data.append("redirect_uri", "https://gitdash.cf/login");

            // Request to exchange code for an access token
            fetch(`https://nameless-waters-21239.herokuapp.com/https://github.com/login/oauth/access_token`, {
                method: "POST",
                body: form_data,
            })
                .then((response) => response.text())
                .then((paramsString) => {
                    let params = new URLSearchParams(paramsString);
                    const access_token = params.get("access_token");

                    // Request to return data of a user that has been authenticated
                    return fetch(`https://api.github.com/user`, {
                        headers: {
                            Authorization: `token ${access_token}`,
                        },
                    });
                })
                .then((response) => response.json())
                .then(data => {
                    dispatch({
                        type: "LOGIN",
                        payload: {user: data, isLoggedIn: true}
                    });
                })
                .catch(() => {
                    setData({
                        isLoading: false,
                        errorMessage: "Sorry! Login failed"
                    });
                });
        }
    }, [state, dispatch, data]);

    if (state.isLoggedIn) {
        return <Redirect to="/dashboard"/>;
    }

    if (data.isLoading) {
       return (
           <>
               <Col lg="4" md="7" className="py-lg-6">
                   <Card className="bg-secondary shadow border-0">
                       <CardHeader className="bg-transparent pb-5">
                           <div className="text-muted text-center mt-2 mb-3">
                               <SpinnerPage/>
                           </div>
                       </CardHeader>
                   </Card>
               </Col>
           </>
       );
    }

    return (
        <>
            <Col lg="4" md="7" className="py-lg-6">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Sign in with</small>
                        </div>
                        <div className="btn-wrapper text-center">
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                                onClick={() => {
                                    setData({...data, errorMessage: ""});
                                }}
                            >
                              <span className="btn-inner--icon">
                                <img
                                    alt="..."
                                    src={github}
                                />
                              </span>
                                <span className="btn-inner--text">Github</span>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            </Col>
        </>
    );
}

export default Login;
