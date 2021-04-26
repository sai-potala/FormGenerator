import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from 'axios'
import {useState,useEffect} from 'react'
import LoadingBox from "./LoadingBox";
import Alert from "@material-ui/lab/Alert";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Form-Generator
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignupPage(props) {
  const classes = useStyles();

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [repeatPassword,setRepeatpassword] = useState("")
  const [alert,setAlert] = useState("")
  const [name,setName] = useState("")
  const [loading, setLoading] = useState(false);

  const signup = () => {
    setLoading(true)
    if (
      email === "" ||
      password === "" ||
      repeatPassword === ""
    ) {
        setLoading(false)
      setAlert("PLEASE FILL ALL FIELDS");
    } else if (password !== repeatPassword) {
        setLoading(false);
      setAlert("PASSWORD NOT MATCHING");
    } else if (password === repeatPassword) {
      axios
        .post("https://api-form-generator.herokuapp.com/auth/signup", {
          email: email,
          password: password,
          name:name,
        })
        .then((response) => {
          if (response.data.message === "found") {
              setLoading(false);
            setAlert("EMAIL ALREADY EXISTING")
          }

          if (response.data.message === "sucess") {
            setLoading(false);
            props.history.push(
              {pathname: "/",
              state: "loginSuccess"}
            );
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {alert && <Alert severity="warning">{alert}</Alert>}
        {loading && <LoadingBox></LoadingBox>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeatPassword"
                value={repeatPassword}
                label="ReType-Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setRepeatpassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signup}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
