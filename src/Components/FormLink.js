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
  const [uploadData,setuploadData] = useState(null)

  const upload = () => {
    console.log("inside updolao", formData[0].data);
    axios
      .post(
        `https://api-form-generator.herokuapp.com/auth/updateForm/${props.match.params.id}`,
        {
          questions: formData[0].data,
        }
      )
      .then(alert("your form is updated sucessfully"))
      .catch((error) => console.log(error));
  };

  const addAnswer = (e,i) =>{
    console.log("this is target.value",e.target.value);
    const value = e.target.value
    const updatedanswer = {
      ...formData[0].data[i],answer:value
    };
    const upload = [];
    upload.push(updatedanswer);
    console.log("this is upload",upload)

  }

  const display = (formData) => {
    
    console.log("this is form data",formData);
    if (
      formData &&
      formData.length > 0 &&
      uploadData &&
      uploadData.length > 0
    ) {
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
                            value={formData[0].data[sno].answer}
                            onChange={(e) => {
                              const dataa = { ...formData[0] };
                              console.log("dataa", dataa);
                              const items = dataa.data;

                              items[sno] = {
                                question: formData[0].data[sno].question,
                                answer: e.target.value,
                              };
                              console.log(items);

                              const newdata = { ...dataa, data: items };
                              setData([{ ...newdata }]);
                              console.log("formdata", formData);
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
  }, [props.match.params.id]);

  return <div className="container">
    {loading ? <LoadingBox /> : display(formData)}
    </div>;
}

export default FormLink;
