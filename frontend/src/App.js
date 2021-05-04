import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile-Jsx/Profile";
import Admin from "./Components/Admin-Jsx/Admin";
import Reset from "./Components/Reset";
import Doubts from "./Components/Profile-Jsx/Doubts";
import Student from "./Components/Profile-Jsx/Student";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/signup" exact={true}>
            <Signup />
          </Route>
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>
          <Route path="/admin" exact={true}>
            <Admin />
          </Route>
          <Route path="/student" exact={true}>
            <Student />
          </Route>
          <Route path="/reset" exact={true}>
            <Reset />
          </Route>
          <Route path="/quries" exact={true}>
            <Doubts />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}
export default App;