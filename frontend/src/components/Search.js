import React from 'react';
import { useState } from 'react';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import BookList from './BookList';


export default function Search() {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (value) => {
        setSearchText(value);
        fetchBooks(value);
    }

    const fetchBooks = (searchText) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(`/app/search-book?search=${searchText}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            })
    };

    return (
        <div>
            <NavigationBar titleText={"SEARCH"} />
            <br />
            <SearchBar text={searchText} set={setSearchText} submit={handleSubmit} />
            <br />
            <BookList
                books={books}
                isHome={false}
                searchQuery={searchText}
            />
        </div>
    )
}
