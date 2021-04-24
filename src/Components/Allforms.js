import React from "react";
import { useState, useEffect } from "react";
import LoadingBox from "./LoadingBox";
import axios from "axios";
import Cookies from "js-cookie";
import Grid from "@material-ui/core/Grid";
import "./Styles/UserForm.css";

function UserForm() {
  const [loading, setLoading] = useState(true);
  const [formData, setData] = useState(null);

  const display = (formData) => {
    console.log(formData);
    if (formData && formData.length > 0) {
      return (
        <Grid container direction="row" justify="center">
          <div >
            <h1 style={{ textAlign: "center" }}>All Forms</h1>
            {formData.map((item) => {
              console.log(item.data[0]);
              return (
                <div
                  style={{ border: "1px solid black", margin: "20px" }}
                  className="userform-container"
                >
                  {item.data.map((single) => {
                    return (
                      <div>
                        <>
                          <div
                            className="container"
                            style={{ width: "500px", margin: "20px" }}
                          >
                            <i
                              class="fa fa-circle fontawesome"
                              aria-hidden="true"
                            ></i>
                            <h2>{single.question}</h2>
                          </div>
                          <div style={{ width: "500px", margin: "20px" }}>
                            <h2>Ans: {single.answer}</h2>
                          </div>
                        </>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Grid>
      );
    } else {
      return <h1>invalid data</h1>;
    }
  };

  useEffect(() => {
    console.log("came to useeffect userform");
    axios
      .get("https://api-form-generator.herokuapp.com/auth/allforms")
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log("this is response", response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <section className="main-section">{loading ? <LoadingBox /> : display(formData)}</section>;
}

export default UserForm;
