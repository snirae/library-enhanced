import React, { Component } from 'react';
import { render } from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);
