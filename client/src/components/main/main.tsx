import React, { Component } from 'react'
import "./main.css"
import { Vacation } from '../../models/vacation';
import axios from "axios";
import store from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { Unsubscribe } from 'redux';
import moment from 'moment';

interface VacationState {
    vacations: Vacation[],
}

export default class Main extends Component<any, VacationState> {

    public unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: [],
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

    public onFollowClicked = (vacation: Vacation) => {
        console.log("add");
        try {
            let vacationId = vacation.id;
            let userId = sessionStorage.getItem("userId");
            let request = { userId, vacationId }
            const response = axios.post<{}>("http://localhost:3001/userVacations/", request);
            store.dispatch({ type: ActionType.addUserVacation, payload: response });
            const serverResponse = response;
            console.log(serverResponse);
        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    public render() {
        return (
            <div className="mainVacations">
                <div className="row">
                    {this.state.vacations.map(vacation =>
                        <div className="card-block col-sm-4" key={vacation.id}>
                            <div className="vacation">
                                <img src={vacation.v_image} alt={vacation.destination} />
                                <div>
                                    <button className="follow" onClick={() => this.onFollowClicked(vacation)}>follow</button>
                                    <br />
                                    <h2>{vacation.destination}<br /></h2>
                                    <hr />
                                    {vacation.description}<br />
                                    {vacation.price} $<br />
                                    <b> {moment(vacation.start_date).format("DD/MM/YYYY")} - {moment(vacation.end_date).format("DD/MM/YYYY")}  </b> <br />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
