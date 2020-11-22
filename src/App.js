import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*" component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}
/*
Arthur's work -- Github
Backend -- https://github.com/ArrthurGeronimo/artha-wakfu-collection-backend-nodejs

Frontend -- https://github.com/ArrthurGeronimo/artha-wakfu-collection-frontend-react

YouTube tutorials 

Form -- https://www.youtube.com/watch?v=rsd4FNGTRBw

Validation with Mongodb -- https://www.youtube.com/watch?v=s1swJLYxLAA
React Examples --
https://ej2.syncfusion.com/home/react.html?_ga=2.232500319.1568634552.1605551067-1926607233.1604733371&_gac=1.215372389.1605551067.Cj0KCQiA48j9BRC-ARIsAMQu3WQShTBa89Sk7MaNlvzTxSwNsQkW9dDMu238FdhzbK9s7oGJfnHhpHwaAnFTEALw_wcB

 */
