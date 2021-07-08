import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { BsEnvelopeFill, BsLockFill, BsEye, BsEyeSlash } from "react-icons/bs";
import img from "../../images/ibg logo.png";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [user, setUser] = useState([]);
  const [signedIn, setSignedIn] = useState(false);

  let location = useLocation();

  function handleSubmit() {
    clearErrors();
    if (!checkErrors()) {
      const data = {
        email: email.toLowerCase(),
        senha: password,
      };
      //Authenticate
      checkData(data);
    }
  }

  async function getData() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      axios
        .post("user/auth/verifyToken/" + token)
        .then(result => {
          setUser(result.data.user);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setUser([]);
      setSignedIn(false);
    }
  }

  async function checkData(data) {
    if (data !== null) {
      axios
        .post("user/auth/login", data)
        .then(result => {
          setPassword("");
          setEmail("");
          enqueueSnackbar("Acesso Permitido", { variant: "success" });
          //store token
          localStorage.setItem("token", result.data.token);
          setSignedIn(true);
        })
        .catch(error => {
          enqueueSnackbar("Acesso Negado", { variant: "error" });
          setSignedIn(false);
          console.log(error);
        });
    }
  }

  function checkErrors() {
    var errorStatus = false;

    if (email.length < 3 || !email.includes("@")) {
      setEmailError("E-mail inválido");
      errorStatus = true;
    }

    if (password.length < 6) {
      setPasswordError("A senha deve ser mais que 6 caracteres");
      errorStatus = true;
    }

    return errorStatus;
  }

  const handleChange = event => {
    if (event.target.value.includes(" ")) {
      return;
    } else {
      setEmail(event.target.value);
    }
  };

  function handleEnterKey(e) {
    if (e === "Enter") {
      handleSubmit();
    }
  }

  function clearErrors() {
    setPasswordError("");
    setEmailError("");
    closeSnackbar();
  }

  //Get data from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setSignedIn(false);
    } else {
      setSignedIn(true);
    }
    console.log(token);
    getData();
  }, [localStorage.getItem("token")]);

  if (signedIn) {
    return (
      <Redirect
        to={{
          pathname: "/home",
          state: { from: location.pathname },
        }}
      />
    );
  } else {
    return (
      <div className="container">
        <div className="main">
          <div className="avatar">
            <img src={img} alt="logo" />
          </div>
          <div className="login-box">
            <h1>Login</h1>
            <div className="textbox">
              <BsEnvelopeFill className="textbox-icon" />
              <input
                type="email"
                required
                autoFocus
                placeholder="e-mail"
                name=""
                value={email}
                onChange={handleChange}
              />
            </div>
            <p className="errorMsg">{emailError}</p>
            <div className="textbox">
              <BsLockFill className="textbox-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="senha"
                required
                maxLength="16"
                name="password"
                onKeyDown={e => handleEnterKey(e.key)}
                value={password}
                onChange={e => setPassword(e.target.value.trim())}
              />
              {passwordVisible ? (
                <BsEyeSlash
                  className="passwordVisibility"
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              ) : (
                <BsEye
                  className="passwordVisibility"
                  onClick={() => {
                    setPasswordVisible(!passwordVisible);
                  }}
                />
              )}
            </div>
            <p className="errorMsg">{passwordError}</p>
            <input
              className="btn"
              type="button"
              name=""
              value="Entrar"
              onClick={handleSubmit}
            />
            <div className="buttonDiv">
              <div className="btnSenha">
                <p>
                  Esqueceu senha?
                  <Link to="/userAuth/resetpassword">Redefinir</Link>
                </p>
              </div>
              <div className="btnAcessar">
                <p>
                  Não tem acesso?
                  <Link to="/userAuth/register">Cadastre</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
