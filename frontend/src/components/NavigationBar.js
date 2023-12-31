import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function NavigationBar({props, titleText}) {
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="static" sx={{ borderRadius: 2 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" style={{ fontSize: 20 }} onClick={() => navigate('/')}>
                            My Library
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/search')}>
                            Search
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/add-book')}>
                            Add Book
                        </Button>
                    </Typography>

                    <Typography variant="h3" component="div" sx={{ flexGrow: 1.85, fontWeight: 550 }}>
                        {titleText}
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavigationBar;
