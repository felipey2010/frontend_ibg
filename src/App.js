import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTypography-colorPrimary": {
      color: "#ce0d0d",
    },
    "& .MuiBadge-colorSecondary": {
      backgroundColor: "#000000",
    },
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#c11c1c",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#060606d4",
    },
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#c11c1c",
    },
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/userAuth/register" exact component={Register} />
          <Route path="/home" component={Home} />
          <Route
            path="/userAuth/resetpassword"
            exact
            component={ResetPassword}
          />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </div>
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


Upload API
https://lo-victoria.com/build-rest-api-with-nodejs-upload-files-mongodb

https://www.djamware.com/post/5c98220080aca754f7a9d1f0/nodejs-expressjs-and-multer-restful-api-for-image-uploader
 */
