import React from "react";
import "./Styles/Header.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

const Header = ({ toggle, value }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
  }));

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" display="flex">
          <Toolbar>
            <section className="Header_section">
              <ColorButton
                variant="outlined"
                color="secondary"
                className={value === "form" ? "current" : "nocurrent"}
                onClick={() => toggle("form")}
              >
                CREATE FORM
              </ColorButton>
              <ColorButton
                variant="contained"
                color="primary"
                className={value === "profile" ? "current" : "nocurrent"}
                onClick={() => toggle("profile")}
              >
                PROFILE
              </ColorButton>
              <ColorButton
                variant="contained"
                color="primary"
                className={value === "profileupdate" ? "current" : "nocurrent"}
                onClick={() => toggle("profileupdate")}
              >
                Update Profile
              </ColorButton>
              <ColorButton
                variant="contained"
                color="primary"
                className={value === "yourforms" ? "current" : "nocurrent"}
                onClick={() => toggle("yourforms")}
              >
                Your Form
              </ColorButton>
              <ColorButton
                variant="contained"
                color="primary"
                className={value === "allforms" ? "current" : "nocurrent"}
                onClick={() => toggle("allforms")}
              >
                All Forms
              </ColorButton>
              <Button
                variant="contained"
                color="secondary"
                className={value === "signout" ? "current" : "nocurrent"}
                onClick={() => toggle("signout")}
              >
                SIGN OUT
              </Button>
            </section>
          </Toolbar>
          
        </AppBar>
      </div>
    </>
  );
};

export default Header;
