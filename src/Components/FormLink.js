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

  let items;
  let dataa;

function FormLink(props) {

  console.log("function is getting started")

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


  const upload = () => {
    console.log("new data before modification in upload", dataa);
    console.log("form data is after click in upload", formData);
    formData[0].data.map((item, key) => {
      item.answer.map((value, no) => {
        console.log("came here to if value exist", value);
        if (value) {
          console.log(
            "dataa.data[key].answer[no]",
            dataa[0].data[key].answer[no]
          );
          dataa[0].data[key].answer.push(value);
        }
      });
    });
    console.log("newdata after pushing", dataa[0].data);
    setLoading(true);
    axios
      .post(
        `https://api-form-generator.herokuapp.com/auth/updateForm/${props.match.params.id}`,
        {
          questions: dataa[0].data,
        }
      )
      .then(
        (response) =>{
          console.log("in .then in useeffect")
          setData([response.data]);
          console.log("response is ", response.data);
          console.log("dataa is ", dataa);
          console.log("formdata after response is ", formData);

          setLoading(false);

        }
              )
      .catch((error) => console.log(error));
  };



  const display = () => {
    
    console.log("this is form data in display",formData);
    dataa = JSON.parse(JSON.stringify(formData));
    console.log("this is dataa in display",dataa)

    if (
      formData
    ) {
      dataa[0].data.map((item, key) => {return (item.answer = [])});
        console.log("formdata after dataa change",formData[0].data)
        console.log("dataa after dataa change",dataa[0].data)
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
                        {/* {console.log(
                          "came to the form input",
                          uploadData[sno].answer
                        )} */}
                        <div>
                          <TextField
                            id="standard-basic"
                            label="Enter Your Answer"
                            value={
                              dataa[0].data[sno].answer[
                                dataa[0].data[sno].answer
                              ]
                            }
                            onChange={(e) => {
                              // console.log("this is data", dataa);
                              // console.log(
                              //   "this is dataa[0].data[sno].answer",
                              //   dataa[0].data[sno].answer
                              // );

                              console.log("data is in on change",dataa)
                              dataa[0].data[sno].answer.pop();
                              dataa[0].data[sno].answer.push(e.target.value);
                              items = JSON.parse(JSON.stringify(dataa[0].data));
                              // console.log(
                              //   "  dataa[0].data[sno].answer",
                              //   dataa[0].data[sno].answer
                              // );
                              console.log("items is",items)
                              // items[sno] = {
                              //   question: formData[0].data[sno].question,
                              //   answer: dataa[0].data[sno].answer,
                              // };
                              // console.log("this is final", items);
                              // console.log("this is data[0]", dataa[0]);
                              dataa[0] = { ...dataa[0], data: items };
                              console.log("new data after typing ", dataa);
                              // console.log(
                              //   "form data ites lisis",
                              //   formData[0].data
                              // );
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
                    onClick={() => 
                      upload()}
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
      console.log("response is ",response)
        console.log("came before setloading in useeffect");
        setLoading(false);
         console.log("came before setData in useeffect");
            setData(response.data);
        
      })
      .catch((error) => console.log(error));
  }, []);

  return <div className="container">
    {console.log("Came to re-render")}
    {loading ? <LoadingBox /> : display()}
    </div>;
}

export default FormLink;
