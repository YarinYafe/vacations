import React, { Component, ChangeEvent } from 'react'
import './update.css';
import axios from "axios";
import { Vacation } from '../../models/vacation';
import store from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { Unsubscribe } from 'redux';

interface VacationState {
    id: number,
    destination: string,
    description: string,
    start_date: string,
    end_date: string,
    price: number,
    v_image: string,
    followers: number,
    // vacationToUpdate: Vacation,
    isErrorShow: Boolean,
    isValidShow: Boolean,
}

export default class Update extends Component<any, VacationState> {

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            id: -1,
            destination: "",
            description: "",
            start_date: "",
            end_date: "",
            price: 0,
            v_image: "",
            followers: 0,
            // vacationToUpdate: {},
            isErrorShow: false,
            isValidShow: false,
        }
        // this.unsubscribeStore = store.subscribe(
        //     () => this.setState(
        //         {
        //             vacationToUpdate: store.getState().vacation
        //         })
        // );
        // console.log(store.getState().vacation);
        // console.log(store.getState().vacationToUpdate);
        // console.log(store.getState().vacations);
    }

    public async componentDidMount() {
        let vacationToUpdate: Vacation;
        let vacation = sessionStorage.getItem("vacationToUpdate");
        vacationToUpdate = JSON.parse(vacation);

        // let vacationToUpdate = this.state.vacationToUpdate;
        this.setState({
            id: vacationToUpdate.id,
            destination: vacationToUpdate.destination,
            description: vacationToUpdate.description,
            start_date: vacationToUpdate.start_date,
            end_date: vacationToUpdate.end_date,
            price: vacationToUpdate.price,
            v_image: vacationToUpdate.v_image,
            followers: vacationToUpdate.followers,
        });
    }

    private setDestination = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const destination = args.target.value;
        if (destination === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ destination });
    }

    private setDescription = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const description = args.target.value;
        if (description === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ description });
    }

    private setStartDate = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const start_date = args.target.value;
        if (start_date === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ start_date });
    }

    private setEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const end_date = args.target.value;
        if (end_date === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ end_date });
    }

    private setprice = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const price = args.target.valueAsNumber;
        if (price === 0) {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ price });
    }

    private setImage = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const v_image = args.target.value;
        if (v_image === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ v_image });
    }

    private updateVacation = async () => {
        console.log("update");
        if (this.state.destination === "" && this.state.description === "" && this.state.start_date === "" && this.state.end_date === "" && this.state.price === 0 && this.state.v_image === "") {
            this.setState({
                isErrorShow: false,
                isValidShow: true,
            });
            return;
        }
        try {
            let vacationDetails = new Vacation(this.state.destination, this.state.description, this.state.start_date, this.state.end_date, this.state.price, this.state.v_image, this.state.followers, this.state.id);
            store.dispatch({ type: ActionType.updateVacation, payload: vacationDetails });
            console.log(vacationDetails);

            const response = await axios.put<Vacation>("http://localhost:3001/vacations/:" + vacationDetails.id, vacationDetails);
            const serverResponse = response.data;
            console.log(serverResponse);

        }
        catch (err) {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
            alert(err.message);
            console.log(err);
        }
    }

    public render() {
        return (
            <div className="update">
                <label>Destination</label>
                <input type="text" placeholder="destination" name="destination"
                    value={this.state.destination} onChange={this.setDestination} /><br />
                <label>Description</label>
                <input type="text" placeholder="description" name="description"
                    value={this.state.description} onChange={this.setDescription} /><br />
                <label>Start Date</label>
                <input type="date" name="startDate"
                    value={this.state.start_date} onChange={this.setStartDate} /><br />
                <label>End Date</label>
                <input type="date" name="endDate"
                    value={this.state.end_date} onChange={this.setEndDate} /><br />
                <label>Price</label>
                <input type="number" placeholder="price" name="price" min="0"
                    value={this.state.price} onChange={this.setprice} /><br />
                <label>Image Link</label>
                <input type="text" placeholder="image link" name="image"
                    value={this.state.v_image} onChange={this.setImage} /><br />
                {this.state.isErrorShow ?
                    <div className="message">
                        <h5>one of the fields are invalid!</h5>
                    </div>
                    : null}
                {this.state.isValidShow ?
                    <input className="button" type="button" value="Done" onClick={this.updateVacation} />
                    : null}
            </div>
        );
    }
}