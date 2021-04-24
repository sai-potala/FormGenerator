import React from "react";
import "./Styles/Profile.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import axios from "axios";

class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      profile: "",
      updated_name: "",
      updated_profile: "",
      updated_password: "",
    };
  }

  componentDidMount = () => {
    this.fethusers();
  };

  fethusers = () => {
    axios
      .post("https://api-form-generator.herokuapp.com/auth/user", {
        token: Cookies.get("token"),
      })
      .then((response) => {
        const user = response.data;
        this.setState({
          ...this.state,
          name: user.name,
          email: user.email,
          profile: user.profile,
        });
      })
      .catch((error) => console.log(error));
  };

  update_change = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  fileupload = (files) => {
    if (files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const Base64 = reader.result;
        this.setState({
          ...this.state,
          updated_profile: Base64,
        });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };

  formupload = () => {
    axios
      .post("https://api-form-generator.herokuapp.com/auth/user/update", {
        token: Cookies.get("token"),
        password: this.state.updated_password,
        name: this.state.updated_name,
        profile: this.state.updated_profile,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.setState({
          ...this.state,
          updated_name: "",
        });
        alert("profile updated succesfully");
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <section className="main_section">
          <section className="update_section">
            <Paper elevation={3} className="update_paper">
              <TextField
                name="updated_name"
                value={this.state.updated_name}
                onChange={(e) =>
                  this.update_change(e.target.name, e.target.value)
                }
                label="USERNAME"
              />

              <TextField
                type="password"
                name="updated_password"
                value={this.state.updated_password}
                onChange={(e) =>
                  this.update_change(e.target.name, e.target.value)
                }
                label="PASSWORD"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => this.fileupload(e.target.files)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.formupload}
                fullWidth="true"
              >
                UPDATE
              </Button>
            </Paper>
          </section>
        </section>
      </>
    );
  }
}

export default ProfileUpdate;
