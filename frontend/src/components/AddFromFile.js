import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';


function AddFromFile() {
  const [uploadFile, setUploadFile] = useState(null);

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (uploadFile) {
      const formData = new FormData();
      formData.append('csvFile', uploadFile);

      fetch('/app/upload-csv', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('CSV file uploaded and processed:', data);
        })
        .catch((error) => {
          console.error('Error uploading CSV file:', error);
        });
        window.location.reload();
    }
  };

return (
    <div>
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', maxWidth: 400, margin: 'auto' }}>
        <Typography variant="h2" sx={{ fontWeight: 500, color: 'royalblue' }}>
          Upload CSV
        </Typography>
        <br />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <input
              type="file"
              accept="text/csv, application/csv"
              id="csv-file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="csv-file-input">
              <Button variant="outlined" component="span">
                Choose a CSV file
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!uploadFile}
              fullWidth
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default AddFromFile;
