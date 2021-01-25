//
//  App.js
//  GitDash
//
//  Created by Bartu Atabek on 1/20/21.
//

import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth";
import { initialState, reducer } from "./store/reducer";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

export const AuthContext = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <Router>
                <Switch>
                    <Route path="/login" render={props => <AuthLayout {...props} />} />
                    <Route path="/" render={props => <AdminLayout {...props} />} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;