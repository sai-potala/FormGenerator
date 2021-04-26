import React from "react";
import { useState, useEffect } from "react";
import LoadingBox from "./LoadingBox";
import axios from "axios";
import Cookies from "js-cookie";
import Grid from '@material-ui/core/Grid'
import "./Styles/FormLink.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";


function FormLink(props) {
  let items;
  let newdata;
  let dataa;
  

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [formData, setData] = useState(null);
  const [dummy, setDummy] = useState("null");
  const [uploadData,setuploadData] = useState(null)

  const upload = () => {
    
    formData[0].data.map((item,key) =>{
       
        item.answer.map((value) => {
          if (value) {
            newdata.data[key].answer.push(value);
          }
        });
        
    })
    console.log("newdata after pushing",newdata.data)
    setLoading(true)
    axios
      .post(
        `https://api-form-generator.herokuapp.com/auth/updateForm/${props.match.params.id}`,
        {
          questions: newdata.data,
        }
      )
      .then(
        (response) =>{
          dataa[0].data.map((item, key) => {
            item.answer = [];
          });
          setLoading(false)
          alert("Data Successfully Uploaded")    
          
        }
              )
      .catch((error) => console.log(error));
  };



  const display = (formData) => {
    
    console.log("this is form data",formData);
    dataa = JSON.parse(JSON.stringify(formData));

    if (
      formData &&
      formData.length > 0 &&
      uploadData &&
      uploadData.length > 0
    ) {
      dataa[0].data.map((item, key) => {
        item.answer = []
        });
      console.log("thi sis setup in after form", uploadData);
      return (
        <>
          <div className="outer-container">
            <h1 style={{ textAlign: "center" }}>Form Update Page</h1>
            {formData.map((item) => {
              console.log(item.data[0]);
              return (
                <div
                  style={{ border: "1px solid black" }}
                  className="userform-h2"
                >
                  {item.data.map((single, sno) => {
                    return (
                      <>
                        <div className="container">
                          <i
                            class="fa fa-circle fontawesome"
                            aria-hidden="true"
                          ></i>
                          <h2>{single.question}</h2>
                        </div>
                        {console.log(
                          "came to the form input",
                          uploadData[sno].answer
                        )}
                        <div>
                          <TextField
                            id="standard-basic"
                            label="Enter Your Answer"
                            value={
                              dataa[0].data[sno].answer[
                                dataa[0].data[sno].answer.length
                              ]
                            }
                            onChange={(e) => {
                              console.log("this is data", dataa);
                              console.log(
                                "this is dataa[0].data[sno].answer",
                                dataa[0].data[sno].answer
                              );

                              items = dataa[0].data;
                              dataa[0].data[sno].answer.pop();
                              dataa[0].data[sno].answer.push(e.target.value);
                              console.log(
                                "  dataa[0].data[sno].answer",
                                dataa[0].data[sno].answer
                              );
                              items[sno] = {
                                question: formData[0].data[sno].question,
                                answer: dataa[0].data[sno].answer,
                              };
                              console.log("this is final", items);
                              console.log("this is data[0]", dataa[0]);
                              newdata = { ...dataa[0], data: items };
                              console.log("new data is ", newdata);
                              console.log(
                                "form data ites lisis",
                                formData[0].data
                              );
                              // setData([{ ...newdata }]);
                            }}
                          />
                        </div>
                      </>
                    );
                  })}
                  <ColorButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => upload()}
                  >
                    Submit Form
                  </ColorButton>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    console.log("came to useeffect userform");
    axios
      .get(
        `https://api-form-generator.herokuapp.com/auth/formLink/${props.match.params.id}`
      )
      .then((response) => {
        setLoading(false);
        setData(response.data);
        setuploadData(response.data[0].data);
        console.log("this is response,", response);
        
      })
      .catch((error) => console.log(error));
  }, [loading, props.match.params.id]);

  return <div className="container">
    {console.log("Came to re-render")}
    {loading ? <LoadingBox /> : display(formData)}
    </div>;
}

export default FormLink;
