import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App"
import login from "../front/loing";
import register from "../front/register";

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/loing' component={login} />
            <Route path='/register' component={register} />
        </Switch>
    </BrowserRouter>

)

export default BasicRoute
