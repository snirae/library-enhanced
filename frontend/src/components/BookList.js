import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


function SortBooks(books, sortKey) {
    return books.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
            return -1;
        } else if (a[sortKey] > b[sortKey]) {
            return 1;
        } else {
            return 0;
        }
    });
}


const BookList = ({ books, isHome }) => {
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
            }),
        };
        fetch('/app/create-book', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        }
        );

        window.location.reload();
        console.log(`Added: ${book.title}`);
    }

    const onRemoveBook = (book) => {
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

        window.location.reload();
        console.log(`Removed: ${book.title}`);
    }

    // TODO: change font size of all text in table
    return (
        <TableContainer component={Paper} style={{ width: '95%', margin: 'auto' }}>
        <Table>
            <TableHead style={{ backgroundColor: '#7ABDE6' }}>
            <TableRow>
                <TableCell>
                {isHome ? (
                    // sort the books that are currently displayed by title
                    // when the user clicks on the title header
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
                <TableCell>Add/Remove</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {sortedBooks.map((book) => (
                <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                    {book.owned ? (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onRemoveBook(book)}
                    >
                        Remove
                    </Button>
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
    );
};

export default BookList;
