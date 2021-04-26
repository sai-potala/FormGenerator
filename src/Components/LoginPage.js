import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import{useEffect,useState} from 'react'
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingBox from "./LoadingBox";

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
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {

    console.log("this is props",props)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const login = () => {
        console.log("came to login function")
        props.location.state = null
        setLoading(true);
      if (email === "" || password === "") {
           setLoading(false);
        setAlert("PLEASE FILL ALL FIELDS");
      } else {
           setLoading(true);
        axios
          .post("https://api-form-generator.herokuapp.com/auth/login", {
            email: email,
            password: password,
          })
          .then((response) => {
              console.log("came to response",response)
                setLoading(true);
            if (response.data.message === "no_user") {
                setLoading(false);
                setAlert("EMAIL NOT REGISTERED");
            } else if (response.data.message === "valid_password") {
                setLoading(false);
                setAlert("ENTER VALID PASSWORD");
            } else if (response.data.message === "token") {
              const { _id, name } = response.data.userinfo;
              Cookies.set("token", response.data.token);
              Cookies.set("userinfo", _id);
              Cookies.set("name", name);
              console.log(
                "this is userinfo",
                Cookies.get("userinfo"),
                Cookies.get("name")
              );
              // console.log(this.props);
              props.history.push("/homepage");
            }
          })
          .catch((error) => console.log(error));
      }
    };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7}>
        {" "}
        <img
          src="/images/Blue Office Table Congratulations Poster.png"
          alt="poster"
          className="image-login"
        />{" "}
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {props.location.state && (
            <Alert severity="success">
              Signup SucessFull Please Login to continue
            </Alert>
          )}
          {alert && (
            <>
              <Alert severity="warning">{alert}</Alert>
            </>
          )}
          {loading && <LoadingBox></LoadingBox>}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
