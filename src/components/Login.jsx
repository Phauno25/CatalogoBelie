import React, { useState } from "react";
import { Auth } from "../firebase/fireConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [errLog, setErrLog] = useState("");

  const validarEmail = (mail) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(mail.trim())
      ? (setErrEmail(""), setEmail(mail))
      : setErrEmail("El email ingresado no es válido.");
  };
  const validarPass = (pass) => {
    return pass.trim()
      ? (setPassword(pass), setErrPass(""))
      : setErrPass("La contraseña no puede quedar en blanco.");
  };

  const logUser = async (e) => {
    e.preventDefault();

    return !errEmail && !errPass
      ? signInWithEmailAndPassword(Auth, email, password)
          .then((e) => alert(`Login exitoso: ${e.user.displayName}`))
          .then(() => (window.location.href = "/"))
          .catch((e) => {
            switch (e.code) {
              case "auth/user-not-found":
                setErrLog("No existe un usuario con ese email");
                break;

              case "auth/wrong-password":
                setErrLog("Usuario o contraseña incorrectos");
                break;
              default:
                setErrLog("Error del servidor. Intenta de nuevo mas tarde.");
                break;
            }
          })
      : setErrLog("Verifica los campos de email y contraseña.");
  };

  return (
    <div className="register_container">
      <div className="register_blob">
        <div>
          <h1 className="BelieTitulo centroT">Belié</h1>
          <h3 className="BelieSubtitulo centroT">AROMAS</h3>
        </div>

        <div>
          <form className="cardForm" method="post" onSubmit={(e) => logUser(e)}>
            <h1>Iniciar Sesión.</h1>
            <p>
              Accedé para editar el contenido del{" "}
              <span className="bg_nude">Catalogo Belié</span>
            </p>
            <hr />
            <div className="row">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                className={errEmail ? "inputError" : "rowInput"}
                type="email"
                name="email"
                placeholder="ejemplo@hotmail.com"
                onChange={(e) => validarEmail(e.target.value)}
              />
              <span htmlFor="pass">{errEmail}</span>
            </div>
            <div className="row">
              <label htmlFor="pass">Contraseña:</label>
              <input
                className={errPass !== "" ? "inputError" : "rowInput"}
                type="password"
                name="pass"
                onChange={(e) => validarPass(e.target.value)}
              />
              <span htmlFor="pass">{errPass}</span>
            </div>
            <div className="row">
              <button className="loginBtn" type="submit">
                Iniciar Sesion
              </button>
            </div>
            {errLog ? (
              <div className="logError">
                <span>{errLog}</span>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
