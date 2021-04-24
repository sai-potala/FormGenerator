import React from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Profile from "./Components/Profile";
import Allforms from './Components/Allforms'
import ProfileUpdate from "./Components/ProfileUpdate";
import UserForm from "./Components/UserForm";


class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "profile",
    };
  }

  toggle = (value) => {
    this.setState({
      ...this.state,
      toggle: value,
    });
    if(value === "signout"){
      this.props.history.push({
        pathname: "/",
        signout: true,
      });
    }
  };

  render() {
    if (document.cookie) {
      return (
        <>
          <Header value={this.state.toggle} toggle={this.toggle} />
          {this.state.toggle === "form" && <Form />}
          {this.state.toggle === "profile" && <Profile />}
          {this.state.toggle === "allforms" && <Allforms />}
          {this.state.toggle === "profileupdate" && <ProfileUpdate />}
          {this.state.toggle === "yourforms" && <UserForm />}
        </>
      );
    }

    if (!document.cookie) {
      return <>{this.props.history.push("/")}</>;
    }
  }
}

export default Homepage;
