import React from "react";
import "./Styles/Login.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import Cookies from "js-cookie";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeat_password: "",
      alert: "",
      toggle: "login",
    };
  }

  textfiled = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  login = () => {
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        ...this.state,
        alert: "PLEASE FILL ALL FIELDS",
      });
    } else {
      axios
        .post("https://api-form-generator.herokuapp.com/auth/login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((response) => {
          if (response.data.message === "no_user") {
            this.setState({
              ...this.state,
              alert: "EMAIL NOT REGISTERED",
            });
          } else if (response.data.message === "valid_password") {
            this.setState({
              ...this.state,
              alert: "ENTER VALID PASSWORD",
            });
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
            this.props.history.push("/homepage");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  toggle = (value) => {
    this.setState({
      ...this.state,
      email: "",
      password: "",
      repeat_password: "",
      alert: "",
      toggle: value,
    });
  };

  signup = () => {
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.repeat_password === ""
    ) {
      this.setState({
        ...this.state,
        alert: "PLEASE FILL ALL FIELDS",
      });
    } else if (this.state.password !== this.state.repeat_password) {
      this.setState({
        ...this.state,
        alert: "PASSWORD NOT MATCHING",
      });
    } else if (this.state.password === this.state.repeat_password) {
      axios
        .post("https://api-form-generator.herokuapp.com/auth/signup", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((response) => {
          if (response.data.message === "found") {
            this.setState({
              ...this.state,
              alert: "Email already used",
            });
          }

          if (response.data.message === "sucess") {
            this.toggle("login");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  render() {
    return (
      <>
        {this.props.location.signout && Cookies.remove("token")}
        <section className="Login_section">
          <Paper elevation={3} className="Login_paper">
            <form className="Login_form">
              {this.state.alert && (
                <>
                  <Alert severity="warning">{this.state.alert}</Alert>
                </>
              )}
              {this.state.toggle === "login" && (
                <>
                <h1>Welcome To Login Page</h1>
                  <TextField
                    className="Textfield"
                    label="E-mail"
                    name="email"
                    value={this.state.email}
                    onChange={(e) =>
                      this.textfiled(e.target.name, e.target.value)
                    }
                  ></TextField>
                  <TextField
                    type="password"
                    className="Textfield"
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.textfiled(e.target.name, e.target.value)
                    }
                  ></TextField>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.login}
                  >
                    LOGIN
                  </Button>
                  <Button color="primary" onClick={() => this.toggle("signup")}>
                    SIGNUP
                  </Button>
                </>
              )}
              {this.state.toggle === "signup" && (
                <>
                  <TextField
                    className="Textfield"
                    label="E-mail"
                    name="email"
                    value={this.state.email}
                    onChange={(e) =>
                      this.textfiled(e.target.name, e.target.value)
                    }
                  ></TextField>
                  <TextField
                    type="password"
                    className="Textfield"
                    label="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.textfiled(e.target.name, e.target.value)
                    }
                  ></TextField>
                  <TextField
                    type="password"
                    className="Textfield"
                    label="Repeat Password"
                    name="repeat_password"
                    value={this.state.repeat_password}
                    onChange={(e) =>
                      this.textfiled(e.target.name, e.target.value)
                    }
                  ></TextField>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.signup}
                  >
                    SIGNUP
                  </Button>
                  <Button color="primary" onClick={() => this.toggle("login")}>
                    LOGIN
                  </Button>
                </>
              )}
            </form>
          </Paper>
        </section>
      </>
    );
  }
}

export default Login;
