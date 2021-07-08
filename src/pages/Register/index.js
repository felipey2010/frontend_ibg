import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  BsPersonFill,
  BsLockFill,
  BsEye,
  BsEyeSlash,
  BsEnvelopeFill,
} from "react-icons/bs";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secondPasswordVisible, setSecondPasswordVisible] = useState(false);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setUserError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  let location = useLocation();

  const [signedIn, setSignedIn] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handleSignup() {
    clearErrors();
    closeSnackbar();
    if (!checkErrors()) {
      const data = {
        nome_completo: user,
        email: email,
        nome_usuario: username,
        senha: password,
      };

      //Send data to DB
      sendData(data);
    }
  }

  async function sendData(data) {
    if (data !== null) {
      axios
        .post("user", data)
        .then(result => {
          setUser("");
          setUsername("");
          setPassword("");
          setEmail("");
          setConfirmPassword("");

          if (result.data.success) {
            enqueueSnackbar("Usuário Cadastrado", { variant: "success" });
          } else {
            enqueueSnackbar("Erro de Cadastro!", { variant: "error" });
          }
        })
        .catch(error => {
          enqueueSnackbar("Usuário Não Cadastrado", { variant: "error" });
          console.log(error);
        });
    }
  }

  function checkErrors() {
    var errorStatus = false;

    if (user.length < 3) {
      setUserError("O nome deve ser mais que 3 caracteres");
      errorStatus = true;
    }

    if (username.length < 3) {
      setUsernameError("O usúario deve ser mais que 3 caracteres");
      errorStatus = true;
    }

    if (email.length < 3 || !email.includes("@")) {
      setEmailError("E-mail inválido");
      errorStatus = true;
    }

    if (password.length < 6) {
      setPasswordError("A senha deve ser mais que 6 caracteres");
      errorStatus = true;
    } else {
      if (password !== confirmPassword) {
        errorStatus = true;
        setPasswordError("As duas senhas não são iguais");
        setConfirmPasswordError("As duas senhas não são iguais");
      }
    }

    return errorStatus;
  }

  function clearErrors() {
    setPasswordError("");
    setUserError("");
    setUsernameError("");
    setEmailError("");
    setConfirmPasswordError("");
  }

  const handleChange = event => {
    if (event.target.value.includes(" ")) {
      return;
    } else {
      setEmail(event.target.value);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setSignedIn(false);
    } else {
      setSignedIn(true);
    }
  }, []);

  if (signedIn) {
    return (
      <Redirect
        to={{ pathname: "/home", state: { from: location.pathname } }}
      />
    );
  } else {
    return (
      <div className="container">
        <div className="main">
          <div className="login-box">
            <h1>Solicitar Acesso</h1>
            <div className="textbox">
              <BsPersonFill className="textbox-icon" />
              <input
                type="text"
                required
                autoFocus
                placeholder="nome completo"
                name=""
                value={user}
                onChange={e => setUser(e.target.value)}
              />
            </div>
            <p className="errorMsg">{userError}</p>
            <div className="textbox">
              <BsPersonFill className="textbox-icon" />
              <input
                type="text"
                required
                maxLength="24"
                placeholder="usúario"
                name=""
                value={username}
                onChange={e => setUsername(e.target.value.trim())}
              />
            </div>
            <p className="errorMsg">{usernameError}</p>
            <div className="textbox">
              <BsEnvelopeFill className="textbox-icon" />
              <input
                type="email"
                required
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
                name=""
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
            <div className="textbox">
              <BsLockFill className="textbox-icon" />
              <input
                type={secondPasswordVisible ? "text" : "password"}
                placeholder="confirmar a senha"
                required
                maxLength="16"
                name=""
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value.trim())}
              />
              {secondPasswordVisible ? (
                <BsEyeSlash
                  className="passwordVisibility"
                  onClick={() => {
                    setSecondPasswordVisible(!secondPasswordVisible);
                  }}
                />
              ) : (
                <BsEye
                  className="passwordVisibility"
                  onClick={() => {
                    setSecondPasswordVisible(!secondPasswordVisible);
                  }}
                />
              )}
            </div>
            <p className="errorMsg">{confirmPasswordError}</p>

            <input
              class="btn"
              type="button"
              name=""
              value="Cadastrar"
              onClick={() => handleSignup()}
            />
            <div className="btnAcessar">
              <p>
                Já está cadastrado?
                <Link Link to="/">
                  Acesse
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
