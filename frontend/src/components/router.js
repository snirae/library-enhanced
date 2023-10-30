import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    Router,
    Link,
} from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import AddBook from './AddBook';


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path='/add-book' element={<AddBook />} />
            {/* <Route path="/app" element={<Navigate to="/app/books" />} /> */}
        </>
    )
);
