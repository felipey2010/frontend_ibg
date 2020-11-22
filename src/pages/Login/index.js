import React, { useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { BsPersonFill, BsLockFill, BsEye, BsEyeSlash } from "react-icons/bs";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit() {
    clearErrors();
    checkErrors();
  }

  function checkErrors() {
    var errorStatus = false;

    if (username.length < 3) {
      setUsernameError("O usúario deve ser mais que 3 caracteres");
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
    setUsernameError("");
  }

  return (
    <div className="login-box">
      <h1>Login</h1>
      <div className="textbox">
        <BsPersonFill className="textbox-icon" />
        <input
          type="text"
          required
          maxLength="24"
          autoFocus
          placeholder="usúario"
          name=""
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <p className="errorMsg">{usernameError}</p>
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
        value="Entrar"
        onClick={handleSubmit}
      />
      <div className="btnAcessar">
        <p>
          Não tem acesso?
          <Link to="/register">Cadastre</Link>
        </p>
      </div>
    </div>
  );
}
