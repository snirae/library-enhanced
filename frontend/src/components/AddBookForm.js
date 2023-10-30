import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


export default function AddBookForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState(null);
    const [year, setYear] = useState(null);

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                author: author,
                description: description,
                year: year,
            }),
        };

        fetch('/app/create-book', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }
            );
    }

    return (
        <div>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', maxWidth: 400, margin: 'auto' }}>
                <Typography variant="h2" align="center" fontWeight={500} sx={{ color: 'royalblue' }}>
                    Manual Add
                </Typography>
                <form onSubmit={handleSubmit} >
                    <TextField
                        fullWidth
                        required
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        required
                        label="Author"
                        variant="outlined"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        type='number'
                        label="Year"
                        variant="outlined"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button
                        fullWidth
                        size='large'
                        style={{ alignItems: 'center' }}
                        variant="contained"
                        type="submit"
                    >
                        Add Book
                    </Button>
                </form>
            </Paper>
        </div>
    )
}
