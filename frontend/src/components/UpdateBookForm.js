import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

function UpdateBookForm({ isOpen, onClose, book }) {
    const [updatedBook, setUpdatedBook] = useState(book);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook({ ...updatedBook, [name]: value });
    };

    const onUpdate = (updatedBook) => {
        // if no changes were made, do nothing
        if (updatedBook.description === book.description && updatedBook.year === book.year) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: book.title,
                author: book.author,
                description: updatedBook.description,
                year: updatedBook.year,
            }),
        };

        fetch('/app/create-book', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }
            );
    }

  const handleSubmit = () => {
    onUpdate(updatedBook);
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Update Book Details</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Edit the book details and click "Update" to save changes.
            </DialogContentText>
            <TextField
                disabled
                label="Title"
                name="title"
                value={book ? book.title : ''}
                fullWidth
                margin="normal"
            />
            <TextField
                disabled
                label="Author"
                name="author"
                value={book ? book.author : ''}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                multiline
                rows={3}
                value={updatedBook ? updatedBook.description : (book ? book.description : '')}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Year"
                type='number'
                name="year"
                value={updatedBook ? updatedBook.year : (book ? book.year : '')}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Update
            </Button>
        </DialogActions>
    </Dialog>
  );
}

export default UpdateBookForm;
