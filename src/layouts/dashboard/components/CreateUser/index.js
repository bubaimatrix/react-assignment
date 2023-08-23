import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ paddingBottom: 5 }}>
            Create a User
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                User Name
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                id="name"
                name="name"
                label=" User Name"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Address
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                id="address"
                name="Address"
                label="Address"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Email
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                id="Email"
                name="Email"
                label="Email"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                Profile Pic
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button>
                <UploadFileIcon />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                sx={{ color: "yellow", width: "272px", margin: "5px" }}
                onClick={() => navigate(-1)}
              >
                Go Back to the User Page
              </Button>
              <Button variant="contained" sx={{ color: "yellow" }}>
                Create
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
