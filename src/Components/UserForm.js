import React from "react";
import { useState, useEffect } from "react";
import LoadingBox from "./LoadingBox";
import axios from "axios";
import Cookies from "js-cookie";
import Grid from '@material-ui/core/Grid'
import "./Styles/UserForm.css";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

function UserForm() {
  
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),

    },
  }));
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [formData, setData] = useState(null);
  const formItemDelete = (e) =>{
    console.log("came here to delete")
    setLoading(true)
    const value = e.currentTarget.value
    axios
      .delete(`http://localhost:8900/auth/formdelete/${value}`)
      .then((response) => {
        console.log("this is response", response.data);
      })
      .catch((error) => console.log(error));
      axios
        .get(`http://localhost:8900/auth/form/${Cookies.get("userinfo")}`)
        .then((response) => {
          setLoading(false);
          setData(response.data);
          console.log("this is response", response.data);
        })
        .catch((error) => console.log(error));
  }
  const display = (formData) => {
    console.log("came to form data", formData);
    if (formData && formData.length>0) {
      return (
        <div>
          {console.log("came to container")}
          <Grid container direction="row" justify="center" alignItems="center">
            <div className="userform-container">
              <h1 style={{ textAlign: "center" }}>
                <u>Your Forms</u>
              </h1>

              {formData.map((item) => {
                console.log("this is tiem in userform", item);
                return (
                  <Paper className="userform-h2">
                    <div className="container">
                      <h2
                        style={{ textTransform: "uppercase" }}
                        className="paper-container-item"
                      >
                        {item.title}
                      </h2>
                    </div>

                    <p className="paper-container-item">
                      FormLink :{" "}
                      <a href={item.formLink} target="blank">
                        {item.formLink}
                      </a>
                    </p>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<UpdateIcon />}
                        value={item._id}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        value={item._id}
                        onClick={(e) => formItemDelete(e)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Paper>
                );
              })}
            </div>
          </Grid>
        </div>
      );
    } 
  };

  useEffect(() => {
    console.log("came to useeffect userform")
    axios
      .get(`http://localhost:8900/auth/form/${Cookies.get("userinfo")}`)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log("this is response", response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <div >
    {console.log("Came here to render")}
    {loading ? <LoadingBox /> : display(formData)}
    </div>;
}

export default UserForm;  
