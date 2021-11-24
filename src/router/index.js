import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App"
import login from "../front/loing";
import register from "../front/register";
import details from "../front/Details";

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={login} />
            <Route path='/app' component={App} />
            <Route path='/register' component={register} />
            <Route path='/details' component={details} />
        </Switch>
    </BrowserRouter>
)

export default BasicRoute
