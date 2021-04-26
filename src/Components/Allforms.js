import React from "react";
import { useState, useEffect } from "react";
import LoadingBox from "./LoadingBox";
import axios from "axios";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import "./Styles/AllForms.css";


function UserForm() {
  let transposedData=[];
  const [loading, setLoading] = useState(true);
  const [formData, setData] = useState(null);

  const display = (formData) => {
    

    console.log("after render formDAta ",formData);
    console.log("after render transposeddata",transposedData);
    if (formData && formData.length > 0 ) {
      for (let i = 0; i <= formData[0].data[0].answer.length; i++) {
        let arr = [];
        formData[0].data.map((item) => {
          console.log("item in useeffect", item.answer[i]);
          arr.push(item.answer[i]);
        });
        console.log("thi si arr", arr);
        transposedData.push(arr);
      }
      return (
        <>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <u >All Forms</u>
          </h1>
          <div className="table-container">
            {formData.map((item, key) => {
              console.log(item.data[0]);
              console.log("item in render is ",item.data[0].answer.length)
              return (
                <>
                  <h1 style={{ textTransform: "capitalize" }} class>
                    {item.title}
                  </h1>
                  <div className="table-items">
                    <table>
                      <thead>
                        <tr>
                          {item.data.map((single) => {
                            return <th>{single.question}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {transposedData.map((item) => {
                          return (
                            <tr>
                              {item.map((value) => {
                                if (value) {
                                  return <td>{value}</td>;
                                }
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <center style={{marginTop:"10px"}}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className="button"
                        startIcon={<SaveIcon />}
                      >
                        Download As Excel
                      </Button>
                    </center>
                  </div>
                </>
              );
            })}
          </div>
        </>
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
        console.log(
          "response.data[0].data[0].answer",
          response.data[0].data[0].answer.length
        );
        
        console.log("beforesetdatatransposed",transposedData)
        console.log("before setloading")
        setLoading(false);
        console.log("before setdata")
        setData(response.data);
        console.log("after set data this is response", response.data);
        console.log("Transposed DAta", transposedData);
      })
      .catch((error) => console.log(error));
      console.log("hi i came here after axios asynch call in use effect")
  }, []);

  return (
    <>
      {console.log("Came to first render")}
      <section >
        {loading ? <LoadingBox /> : display(formData)}
      </section>
    </>
  );
}

export default UserForm;
