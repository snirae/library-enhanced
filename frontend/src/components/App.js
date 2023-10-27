import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchBar from './SearchBar';


export default class App extends Component {
    constructor(props) {
        super(props);
        };

    render() {
        return (
        <div>
            <SearchBar/>
        </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
