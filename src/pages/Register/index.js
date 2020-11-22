import React, { useState, useEffect } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import {
  BsPersonFill,
  BsLockFill,
  BsEye,
  BsEyeSlash,
  BsPeopleCircle,
  BsEnvelopeFill,
} from "react-icons/bs";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setUserError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleSignup() {
    clearErrors();
    checkErrors();
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
    }

    return errorStatus;
  }

  function clearErrors() {
    setPasswordError("");
    setUserError("");
    setUsernameError("");
    setEmailError("");
  }

  return (
    <div className="login-box">
      <h1>Solicitar Acesso</h1>
      <div className="textbox">
        <BsPeopleCircle className="textbox-icon" />
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
          onChange={e => setUsername(e.target.value)}
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
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
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
        class="btn"
        type="button"
        name=""
        value="Cadastrar"
        onClick={handleSignup}
      />
      <div className="btnAcessar">
        <p>
          Já está cadastrado?
          <Link to="/">Acesse</Link>
        </p>
      </div>
    </div>
  );
}
