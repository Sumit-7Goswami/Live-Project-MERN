import React, { useState } from "react";

import {
  Container, Typography, TextField,
  Grid, Paper, Button, Box
} from "@mui/material";

import axios from "axios";

import { Log } from "../api/logger";

export default function ShortenerPage() {

  const [inputs, setInputs] = useState(
    Array(1).fill({ url: "", validity: "", shortcode: "" })
  );

  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleSubmit = async () => {
    const resList = [];

    for (const input of inputs) {
      if (!input.url) continue;

      try {
        const res = await axios.post("http://localhost:5000/shorturls", {
          url: input.url,
          validity: input.validity ? parseInt(input.validity) : undefined,
          shortcode: input.shortcode || undefined
        });

        resList.push(res.data);
        await Log("frontend", "info", "component", `URL shortened: ${input.url}`);
      } catch (err) {
        await Log("frontend", "error", "component", `Failed: ${input.url} , ${err.message}`);
      }
    }

    setResults(resList);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
         URL Shortener (Vite)
      </Typography>

      {inputs.map((input, index) => (
        <Paper sx={{ p: 2, mb: 2 }} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Original URL"
                fullWidth
                value={input.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Validity (minutes)"
                fullWidth
                value={input.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={input.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        Shorten URLs
      </Button>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
             Results:
          </Typography>
          {results.map((r, i) => (
            <Paper key={i} sx={{ p: 2, mb: 2 }}>
              <Typography>
                🔗 <a href={r.shortLink} target="_blank" rel="noreferrer">{r.shortLink}</a>
              </Typography>
              <Typography> Expires: {r.expiry}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}
