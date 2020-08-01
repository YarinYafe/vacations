import React, { Component } from 'react'
import './menu.css';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
    public render() {
        return (
            <div className="menu">
                <br />
                <br />
                <br />
                <NavLink to="/admin">home</NavLink>
                <br />
                <br />
                <br />
                <NavLink to="/add">add</NavLink>
                <br />
                <br />
                <br />
                <NavLink to="/chart">chart</NavLink>
            </div>
        );
    }
}