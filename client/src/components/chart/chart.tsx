import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Vacation } from '../../models/vacation';
import axios from "axios";

export default class Chart extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            labels: [],
            datasets: [{
                label: 'followers',
                data: [],
                barThickness: 50,
                backgroundColor: 'orangered',
            }],
        };
    }

    public async componentDidMount() {
        const result = await axios.get<Vacation[]>("http://localhost:3001/vacations");
        let vacationDestination = [];
        let vacationFollowers = [];
        for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].followers > 0) {
                vacationDestination.push(result.data[i].destination);
                vacationFollowers.push(result.data[i].followers);
            }
        }
        this.setState({
            labels: vacationDestination,
            datasets: [{
                label: 'followers',
                data: vacationFollowers,
            }],
        })
        console.log(this.state);
        
    }

    public render() {
        return (
            <div className="chart">
                <Bar
                    data={this.state}
                    options={{}}
                />
            </div>
        );
    }
}