import React from 'react';
import SearchIcon from "@mui/icons-material/Search";

import '../../static/css/SearchBar.css';

const SearchBar = ({ text, set, submit }) => {
    const handleChange = (value) => {
        set(value);
    };

    const handleSubmit = (value) => {
        submit(value);
    };

    return (
        <div className="input-wrapper">
            <SearchIcon id="search-icon" />
            <input
                placeholder="Type to search..."
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(event) => {
                    if (event.keyCode === 13) { // 13 is the code for 'Enter' key
                        handleSubmit(event.currentTarget.value);
                    }
                }}
            />
        </div>
    );
};

export default SearchBar;
