import React from "react";
import "./Styles/Profile.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";
import axios from "axios";

class Profile extends React.Component {
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
      .post("http://localhost:8900/auth/user", { token: Cookies.get("token") })
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



  render() {
    return (
      <>
        <section className="main_section">
          <section className="profile_display">
            <Paper
              dispaly="flex"
              position="static"
              elevation={3}
              className="profile_paper"
            >
              <img
                src={this.state.profile}
                alt="profile_image"
                className="image"
              />
              <h3 className="profile_headers">
                {" "}
                <u>USERNAME</u>
              </h3>
              <h4>{this.state.name && this.state.name}</h4>
              <h3 className="profile_headers">
                <u>EMAIL</u>
              </h3>
              <h4>{this.state.email && this.state.email}</h4>
            </Paper>
          </section>
        </section>
      </>
    );
  }
}

export default Profile;
