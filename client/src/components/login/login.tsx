import React, { Component, ChangeEvent } from 'react'
import './login.css';
import axios from "axios";
import { UserLoginDetails } from '../../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';

interface LoginState {
    user_name: string,
    password: string,
    isErrorShow: Boolean,
    isValidShow: Boolean,
}

export default class Login extends Component<any, LoginState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            user_name: "",
            password: "",
            isErrorShow: false,
            isValidShow: false,
        }
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const user_name = args.target.value;
        if (user_name === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ user_name });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const password = args.target.value;
        if (password === "" || password.length < 4) {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ password });
    }

    private login = async () => {
        if (this.state.user_name === "" && this.state.password === "" && this.state.password.length < 0) {
            this.setState({
                isErrorShow: false,
                isValidShow: true,
            });
            return;
        }
        try {
            let userLoginDetails = new UserLoginDetails(this.state.user_name, this.state.password);
            const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
            const serverResponse = response.data;
            sessionStorage.setItem("token", serverResponse.token + "");
            if (serverResponse.type === "ADMIN") {
                this.props.history.push('/admin');
                sessionStorage.setItem("userType", "ADMIN");
            }
            if (serverResponse.type === "CUSTOMER") {
                this.props.history.push('/vacations');
                sessionStorage.setItem("userType", "CUSTOMER");
                sessionStorage.setItem("userId", JSON.stringify(serverResponse.id));
            }
        }
        catch (err) {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
            alert(err);
            console.log(err);
        }
    }


    public render() {
        return (
            <div className="login">
                <a href="register">Register</a>
                <br />
                <br />
                <br />
                <label>user name</label>
                <input type="text" name="user_name"
                    value={this.state.user_name} onChange={this.setUserName} /><br />
                <label>password</label>
                <input type="password" name="password"
                    value={this.state.password} onChange={this.setPassword} /><br />
                {this.state.isErrorShow ?
                    <div className="message">
                        <h5>one of the fields are invalid!</h5>
                    </div>
                    : null}
                {this.state.isValidShow ?
                    <button onClick={this.login}>Login</button>
                    : null}
            </div>
        );
    }
}