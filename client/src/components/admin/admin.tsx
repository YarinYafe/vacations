import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import './admin.css';
import Add from '../add/add';
import { NavLink } from 'react-router-dom';
import { Vacation } from '../../models/vacation';
import axios from "axios";
import store from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { Unsubscribe } from 'redux';
import moment from 'moment';
import Chart from '../chart/chart';
import Menu from '../menu/menu';
import Update from '../update/update';

interface VacationState {
    vacations: Vacation[],
    isAlertShow: Boolean,
}

export default class Admin extends Component<any, VacationState> {

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
            isAlertShow: false,
        };
        this.unsubscribeStore = store.subscribe(
            () => this.setState(
                {
                    vacations: store.getState().vacations
                })
        );
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    public async componentDidMount() {
        const result = await axios.get<Vacation[]>("http://localhost:3001/vacations");
        store.dispatch({ type: ActionType.GetAllVacations, payload: result.data });
    }

    private deleteVacation = async (vacation: Vacation) => {
        try {
            const response = await axios.delete<object>("http://localhost:3001/vacations/:" + vacation.id);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    public showAlert = () => {
        this.setState({
            isAlertShow: true,
        });
    }

    public HideAlert = () => {
        this.setState({
            isAlertShow: false,
        });
    }

    private onUpdateClicked = async (vacation: Vacation) => {
        sessionStorage.setItem("vacationToUpdate", JSON.stringify(vacation));
        // store.dispatch({ type: ActionType.updateVacation, payload: vacation });
    }

    public render() {
        return (
            <BrowserRouter>
                <section className="admin">
                    <aside className="adminMenu">
                        <Menu />
                    </aside>
                    <main className="adminMain">
                        <Switch>
                            <Route path="/add" component={Add} exact />
                            <Route path="/update" component={Update} exact />
                            <Route path="/chart" component={Chart} exact />
                            <Redirect from="/" to="/admin" exact />
                            <div className="row">
                                {this.state.vacations.map(vacation =>
                                    <div className="card-block col-sm-5" key={vacation.id}>
                                    <div className="vacation">
                                        <img src={vacation.v_image} alt={vacation.destination} />
                                        <div>
                                            {this.state.isAlertShow ?
                                                <div className="alert">
                                                    <p>are you sure you want to delete this vacation? <br /> 
                                                    <button onClick={() => this.deleteVacation(vacation)}>yes</button> 
                                                    <button onClick={() => this.HideAlert()} >no!</button> </p>
                                                </div>
                                                : null}
                                            <NavLink className="updateBtn" onClick={() => this.onUpdateClicked(vacation)} to="/update"><i className="fa fa-pencil-square-o"></i></NavLink>
                                            <button className="deleteBtn" onClick={() => this.showAlert()}><i className="fa fa-trash-o"></i></button>
                                            <h4>{vacation.destination}<br /></h4>
                                            <hr />
                                            {vacation.description}<br />
                                            {vacation.price} $<br />
                                            <b> {moment(vacation.start_date).format("DD/MM/YYYY")} - {moment(vacation.end_date).format("DD/MM/YYYY")}  </b> <br />
                                        </div>
                                    </div>
                                    </div>
                                )}
                            </div>
                        </Switch>
                    </main>
                </section>
            </BrowserRouter>
        )
    }
}