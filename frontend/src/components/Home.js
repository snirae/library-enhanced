import React, { useState } from 'react';
import { useEffect } from 'react';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import BookList from './BookList';


export default function Home() {
    const [books, setBooks] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (value) => {
        setSearchText(value);
        fetchBooks(value);
    };

    const fetchBooks = (searchText) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(`/app/books?search=${searchText}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    data[i].owned = true;
                }
                setBooks(data);
            });
    };

    // TODO: sort the data available in the table if there is some
    useEffect(() => {
        // Fetch books when the component first renders
        fetchBooks(searchText);
    }, []);

    return (
        <div>
            <NavigationBar titleText={"HOME"} />
            <br />
            <SearchBar text={searchText} set={setSearchText} submit={handleSubmit} />
            <br />
            <BookList
            books={books}
            isHome={true}
            searchQuery={searchText}
            />
        </div>
    );
}
