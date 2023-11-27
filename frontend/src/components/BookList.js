import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import UpdateBookForm from './UpdateBookForm';


function SortBooks(books, sortKey) {
    if (sortKey === 'title' || sortKey === 'author') {
        books.sort((a, b) => (a[sortKey] > b[sortKey]) ? 1 : -1);
    }
    else {
        books.sort((a, b) => (a[sortKey] < b[sortKey]) ? 1 : -1);
    }

    return books;
}


const BookList = ({ books, isHome, searchQuery }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortKey = urlParams.get('sortKey');
    const sortedBooks = sortKey ? SortBooks(books, sortKey) : books;

    const onAddBook = (book) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: book.title,
                author: book.author,
                description: book.description,
                year: book.year,
            }),
        };
        fetch('/app/create-book', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        }
        );

        // window.location.href = window.location.href + `?search=${searchQuery}` + `&sortKey=${sortKey}`;
        window.location.reload();
        console.log(`Added: ${book.title}`);
    }

    const onRemoveBook = (book) => {
        if (window.confirm(`Are you sure you want to remove ${book.title}?`)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: book.title,
                    author: book.author,
                    description: book.description,
                }),
            };
            fetch('/app/remove-book', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }
            );

            // window.location.href += `?search=${searchQuery}` + `&sortKey=${sortKey}`;
            window.location.reload();            
            console.log(`Removed: ${book.title}`);
        }
    }

    const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleOpenUpdateForm = (book) => {
        setSelectedBook(book);
        setUpdateFormOpen(true);
    };

    const handleCloseUpdateForm = () => {
        setUpdateFormOpen(false);
    };

    // TODO: change font size of all text in table
    return (
        <div>
            <TableContainer component={Paper} style={{ width: '95%', margin: 'auto' }}>
            <Table>
                <TableHead style={{ backgroundColor: '#7ABDE6' }}>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>
                    {isHome ? (
                        <a href="?sortKey=title">Title</a>
                    ) : (
                        'Title'
                    )}
                    </TableCell>
                    <TableCell>
                    {isHome ? (
                        <a href="?sortKey=author">Author</a>
                    ) : (
                        'Author'
                    )}
                    </TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>
                    {isHome ? (
                        <a href="?sortKey=year">Year</a>
                    ) : (
                        'Year'
                    )}
                    </TableCell>
                    {!isHome ? (
                        <TableCell>Similarity</TableCell>
                    )
                    : (
                        null
                    )}
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>

                <TableBody>
                    {books.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={{ isHome } ? 7 : 6} align="center">
                                No books found
                            </TableCell>
                        </TableRow>
                    )}
                {sortedBooks.map((book) => (
                    <TableRow key={book.id}>
                    <TableCell>{sortedBooks.indexOf(book) + 1}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.year}</TableCell>
                    {!isHome ? (
                        <TableCell>{book.similarity}</TableCell>
                    )
                    : (
                        null
                    )}
                    <TableCell>
                        {book.owned ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                variant="contained"
                                color="error"
                                onClick={() => onRemoveBook(book)}
                                >
                                    Remove
                                </Button>
                                <Button
                                    style={{ marginTop: '10px' }}
                                    variant="contained"
                                    color="info"
                                    onClick={() => handleOpenUpdateForm(book)}
                                >
                                    Edit
                                </Button>
                            </div>
                        ) : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => onAddBook(book)}
                        >
                            Add
                        </Button>
                        )}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <UpdateBookForm
                isOpen={isUpdateFormOpen}
                onClose={handleCloseUpdateForm}
                book={selectedBook}
            />
        </div>
    );
};

export default BookList;
