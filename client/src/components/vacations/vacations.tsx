import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import "./vacations.css";
import Main from '../main/main';
import Followed from '../followed/followed';

interface CustomerState {
    isShow: Boolean,
    isHide: Boolean,
}

export default class Vacations extends Component<any, CustomerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            isHide: true,
        };
    }

    public onShowClicked = () => {
        this.setState({
            isShow: false,
            isHide: true,
        });
    }

    public onHideClicked = () => {
        this.setState({
            isShow: true,
            isHide: false,
        });
    }

    public render() {
        return (
            <BrowserRouter>
                <section className="vacations">
                    {this.state.isShow ?
                        <button className="show" onClick={() => this.onShowClicked()}>Show followed vacations</button>
                        : null}
                    {this.state.isHide ?
                        <div>
                            <button className="hide" onClick={() => this.onHideClicked()}>Hide followed vacations</button>
                            <br/>
                            <br/>
                            <Followed />
                        </div>
                        : null}
                        <br/>
                    <hr />
                    <div>
                        <h1>All vacations</h1>
                        <Main />
                    </div>
                </section>
            </BrowserRouter>
        )
    }
}