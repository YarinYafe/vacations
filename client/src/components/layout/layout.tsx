import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import './layout.css';

import Header from '../header/header';
import Login from '../login/login';
import Register from '../register/register';
import Admin from '../admin/admin';
import PageNotFound from '../page-not-found/page-not-found';
import Vacations from '../vacations/vacations';

export default class Layout extends Component {
    public render() {
        return (
            <BrowserRouter>
                <section className="layout">
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Switch>
                            <Route path="/login" component={Login} exact />
                            <Route path="/register" component={Register} exact />
                            <Route path="/vacations" component={Vacations} exact />
                            <Route path="/admin" component={Admin} exact />
                            <Redirect from="/" to="/login" exact />
                            <Route component={PageNotFound} />
                        </Switch>
                    </main>
                </section>
            </BrowserRouter>
        )
    }
}