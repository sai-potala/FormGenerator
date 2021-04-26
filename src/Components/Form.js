import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Styles/Form.css";
import axios from "axios";
import Cookies from "js-cookie";
import { uuid } from 'uuidv4';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      name:"",
      questions: [],
    };
  }
  addquestion = () => {
    const data = {
      question: this.state.value,
      answer: [""],
    };

    this.state.questions.push(data);
    this.setState({
      ...this.state,
      value: "",
    });
  };

  upload = () => {
    console.log("this.state.questions",this.state.questions)
    axios
      .post("https://api-form-generator.herokuapp.com/auth/create", {
        questions: this.state.questions,
        name: this.state.name,
        token: Cookies.get("token"),
        id: Cookies.get("userinfo"),
        uniqueId: uuid(),
      })
      .then(
        this.setState({
          ...this.state,
          value: "",
          name: "",
          questions: [],
        })
      )
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <section className="create_form">
          <form className="form_section">
            <TextField
              label="Form Name"
              multiline
              rows={4}
              value={this.state.name}
              onChange={(e) =>
                this.setState({ ...this.state, name: e.target.value })
              }
            />
            <TextField
              label="CREATE QUESTION"
              multiline
              rows={4}
              value={this.state.value}
              onChange={(e) =>
                this.setState({ ...this.state, value: e.target.value })
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.addquestion}
            >
              ADD
            </Button>
            <Button variant="outlined" color="primary" onClick={this.upload}>
              UPLOAD
            </Button>
            {this.state.questions &&
              this.state.questions.map((data, index) => {
                return (
                  <>
                    <ul key={index}>
                      <li>{data.question}</li>
                    </ul>
                  </>
                );
              })}
          </form>
        </section>
      </>
    );
  }
}

export default Form;
