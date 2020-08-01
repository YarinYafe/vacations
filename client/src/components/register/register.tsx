import React, { Component, ChangeEvent } from 'react'
import './register.css';
import axios from "axios";
import { User } from '../../models/user';
import store from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import { Unsubscribe } from 'redux';

interface RegisterState {
    first_name: string,
    last_name: string,
    user_name: string,
    password: string,
    isErrorShow: Boolean,
    isValidShow: Boolean,
    isUserNameExist: Boolean,
    isPasswordValid: Boolean,
    users: User[],
}

export default class Register extends Component<any, RegisterState> {

    public unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            user_name: "",
            password: "",
            isErrorShow: false,
            isValidShow: true,
            isUserNameExist: false,
            isPasswordValid: false,
            users: [],
        };
        this.unsubscribeStore = store.subscribe(
            () => this.setState(
                {
                    users: store.getState().users
                })
        );
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    public async componentDidMount() {
        const result = await axios.get<User[]>("http://localhost:3001/users");
        store.dispatch({ type: ActionType.GetAllUsers, payload: result.data });
    }

    private setFirstName = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const first_name = args.target.value;
        if (first_name === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ first_name });
    }

    private setLastName = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
        });
        const last_name = args.target.value;
        if (last_name === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ last_name });
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
            isUserNameExist: false,
        });
        const user_name = args.target.value;
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].user_name === user_name) {
                this.setState({
                    isUserNameExist: true,
                });
            }
        }
        if (user_name === "") {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
        }
        this.setState({ user_name });
    }

    private setpassword = (args: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isErrorShow: false,
            isValidShow: true,
            isUserNameExist: false,
            isPasswordValid: false,
        });
        const password = args.target.value;
        if (password === "" || password.length < 4) {
            this.setState({
                isPasswordValid: true,
                isValidShow:false,
            });
        }
        this.setState({ password });
    }

    private addUser = async () => {
        console.log("add");
        console.log(this.state.users);
        
        if (this.state.first_name === "" && this.state.last_name === "" && this.state.user_name === "" && this.state.password.length < 4) {
            this.setState({
                isErrorShow: false,
                isValidShow: true,
            });
            return;
        }
        try {
            let userDetails = new User(this.state.first_name, this.state.last_name, this.state.user_name, this.state.password);
            store.dispatch({ type: ActionType.addUser, payload: userDetails });
            console.log(userDetails);

            const response = await axios.post<User>("http://localhost:3001/users/register", userDetails);
            const serverResponse = response.data;
            console.log(serverResponse);
            this.props.history.push('/login');
        }
        catch (err) {
            this.setState({
                isErrorShow: true,
                isValidShow: false,
            });
            console.log(err);
        }
    }

    public render() {
        return (
            <div className="register">
                                {this.state.isPasswordValid ?
                    <div className="message">
                        <p>please enter longer password</p>
                    </div>
                    : null}
                {this.state.isUserNameExist ?
                    <div className="message">
                        <p>user name already taken! <br/> please try different user name</p>
                    </div>
                    : null}
                {this.state.isErrorShow ?
                    <div className="message">
                        <p>one of the fields are invalid!</p>
                    </div>
                    : null}
                <label>first name</label>
                <input type="text" name="firstName"
                    value={this.state.first_name} onChange={this.setFirstName} /><br />
                <label>last name</label>
                <input type="text" name="lastName"
                    value={this.state.last_name} onChange={this.setLastName} /><br />
                <label>user name</label>
                <input type="text" name="userName"
                    value={this.state.user_name} onChange={this.setUserName} /><br />
                <label>password</label>
                <input type="password" name="lastName"
                    value={this.state.password} onChange={this.setpassword} /><br />
                {this.state.isValidShow ?
                    <button id="addBtn" onClick={this.addUser}>Sign in</button>
                    : null}
            </div>
        );
    }
}