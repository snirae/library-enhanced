import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';


export default function Search() {
    return (
        <div>
            <NavigationBar titleText="SEARCH" />

            <SearchBar/>

            <h1>Search</h1>
        </div>
    )
}
