import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Components/Login";
import LoginPage from "../Components/LoginPage";
import Homepage from "../Homepage";
import Question from "../Question";
import FormLink from '../Components/FormLink'
import SignupPage from "../Components/SignupPage";
import Test from '../Test'

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/homepage" exact component={Homepage} />
          {/* <Route path="/question/:id" component={Question} /> */}
          <Route path="/from-link/:id" component={FormLink} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/test" component={Test} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
