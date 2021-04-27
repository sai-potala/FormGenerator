import React from "react";
import { useState, useEffect } from "react";
import LoadingBox from "./LoadingBox";
import axios from "axios";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import "./Styles/AllForms.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function UserForm() {
  let transposedData=[];
  const [loading, setLoading] = useState(true);
  const [formData, setData] = useState(null);

  const display = (formData) => {
    

    console.log("after render formDAta ",formData);
    
    if (formData && formData.length > 0 ) {
      formData.map((parentItem,key) =>{
        let temp = [];
        for (let i = 0; i < formData[key].data[0].answer.length; i++) {
          let arr = [];
          formData[key].data.map((item) => {
            arr.push(item.answer[i]);
          });
          temp.push(arr)
          console.log("thi is temp", temp);
          
        }
        
        transposedData.push(temp);
        
      })
      console.log("final transposed data", transposedData);
      
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
                <div>
                  <h1 style={{ textTransform: "capitalize" }} class>
                    {item.title}
                  </h1>
                  <div className="table-items">
                    <table id="table-to-xls">
                      <thead>
                        <tr>
                          {item.data.map((single) => {
                            return <th>{single.question}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {transposedData[key].map((item) => {
                          return (
                            <tr>
                              {item.map((value) => {
                                if (value) {
                                  return <td>{value}</td>;
                                } else {
                                  return <td>No Records</td>;
                                }
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <center style={{ marginTop: "10px" }}>
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS"
                      />
                    </center>
                    {/* <center style={{marginTop:"10px"}}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className="button"
                        startIcon={<SaveIcon />}
                      >
                        Download As Excel
                      </Button>
                    </center> */}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return <h1>No Forms to display</h1>;
    }
  };

  useEffect(() => {
    axios
      .get("https://api-form-generator.herokuapp.com/auth/allforms")
      .then((response) => {
        
        setLoading(false);
        setData(response.data);
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
