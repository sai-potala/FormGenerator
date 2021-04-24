import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Components/Login";
import Homepage from "../Homepage";
import Question from "../Question";
import FormLink from '../Components/FormLink'
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/homepage" exact component={Homepage} />
          {/* <Route path="/question/:id" component={Question} /> */}
          <Route path="/from-link/:id" component={FormLink} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
