import React, { Component } from 'react'
import "./followed.css"
import { Vacation } from '../../models/vacation';
import axios from "axios";
import store from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { Unsubscribe } from 'redux';
import moment from 'moment';

interface VacationState {
    followed: Vacation[],
    isShow: boolean,
    isHide: boolean,
}

export default class Followed extends Component<any, VacationState> {

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            followed: [],
            isShow: true,
            isHide: false,
        };
        this.unsubscribeStore = store.subscribe(
            () => this.setState(
                {
                    followed: store.getState().userVacations
                })
        );
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    public async componentDidMount() {
        let userId = sessionStorage.getItem("userId");
        const result = await axios.get<Vacation[]>(`http://localhost:3001/userVacations/${userId}`);
        store.dispatch({ type: ActionType.GetAllUserVacations, payload: result.data });
        this.setState({
            followed: result.data,
            isShow: false,
            isHide: true,
        });
    }

    public onUnfollowClicked = async (vacation: Vacation) => {
        console.log(vacation);
        try {
            const response = await axios.delete<Vacation>("http://localhost:3001/userVacations/:" + vacation.id);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    public render() {
        return (
            <div className="followed">
                {this.state.isHide ?
                    <div className="row">
                        {this.state.followed.map(vacation =>
                            <div className="card-block col-sm-3" key={vacation.id}>
                                <div className="vacation">
                                    <img src={vacation.v_image} alt={vacation.destination} />
                                    <div>
                                        <button className="unfollow" onClick={() => this.onUnfollowClicked(vacation)}>unfollow</button>
                                        <br />
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
                    : null}
                {this.state.isShow ?
                    <div className="storageEmpaty">
                        <h1>No vacations are followed</h1>
                    </div>
                    : null}


















                {/* {this.state.isHide ?
                    <div>
                        {this.state.followed.map(vacation =>
                            <div className="row">
                                <div className="vacation" key={vacation.id}>
                                    <div className="card-block col-sm-3">
                                        <img src={vacation.v_image} alt={vacation.destination} />
                                        <div>
                                            <button className="unfollow" onClick={() => this.onUnfollowClicked(vacation)}>unfollow</button>
                                            <br />
                                            <h4>{vacation.destination}<br /></h4>
                                            <hr />
                                            {vacation.description}<br />
                                            {vacation.price} $<br />
                                            <b> {moment(vacation.start_date).format("DD/MM/YYYY")} - {moment(vacation.end_date).format("DD/MM/YYYY")}  </b> <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    : null}
                {this.state.isShow ?
                    <div className="storageEmpaty">
                        <h1>No vacations are followed</h1>
                    </div>
                    : null} */}
            </div>
        );
    }
}
