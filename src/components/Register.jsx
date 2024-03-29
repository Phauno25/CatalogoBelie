import React, { useState } from 'react'
import { Auth } from "../firebase/fireConfig"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import './css/Login.css'

function Register() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errNombre, setErrNombre] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPass, setErrPass] = useState("");
    const [errPass2, setErrPass2] = useState("");

    const validarEmail = (mail) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(mail.trim()) ? (setErrEmail(""), setEmail(mail)) : setErrEmail("El email ingresado no es válido.");
    }

    const validarNombre = (nombre) => {
        const regex = /^[A-Za-z]+$/;
        return regex.test(nombre.trim()) ? (setErrNombre(""), setNombre(nombre)) : setErrNombre("El nombre ingresado no es válido.");
    }
    const validarPass = (pass) => {
        if (pass.length >= 8) {

            setErrPass("");
            setPassword(pass);

            if (pass === password2) {
                setErrPass("");
                setPassword(pass);
            }
            else {
                setErrPass2("Las contraseñas no coinciden.")
            }
        }
        else {
            setErrPass("La contraseña no puede ser menor a 8 caracteres.")
        }
    }
    const validarPass2 = (pass2) => {
        return pass2 === password ? (setErrPass2(""), setPassword2(pass2)) : setErrPass2("Las contraseñas no coinciden.")
    }

    const registrarUser = async (e) => {
        e.preventDefault();

        return email.trim() && nombre.trim() && !errEmail && !errPass && !errPass2 ?
            (
                await createUserWithEmailAndPassword(Auth, email, password)
                    .then(e => { const user = e.user; return user })
                    .then(e => {updateProfile(e, { displayName: nombre });return e})
                    .then(e=> sendEmailVerification(e))
                    .then(() => alert(`Te doy la bienvenida ${nombre}!`))
                    .then(() => window.location.href = "/")

            )
            :
            (
                alert("Error")
            )

    }

    return (
        <div className='register_container'>

            <div className='register_blob'>
            <div>
                <h1 className='BelieTitulo centroT'>Belié</h1>
                <h3 className='BelieSubtitulo centroT'>AROMAS</h3>
            </div>
             <div>
                <form className="cardForm" method="post" onSubmit={(e) => registrarUser(e)}>
                        <h1>Creá tu cuenta.</h1>
                        <p className="p1v">Ingresa tu mail para ser administrador del catálogo Belie.</p>
                        <hr />
                        <div className="row">
                            <label className='w100' htmlFor="nombre">¿Cual es tu nombre?:</label>
                            <input className={errNombre ? "inputError" : "rowInput"} type="text" name="nombre" onChange={(e) => validarNombre(e.target.value)} />
                            <span htmlFor="pass">{errNombre}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input className={errEmail ? "inputError" : "rowInput"} type="email" name="email" placeholder='ejemplo@hotmail.com' onChange={(e) => validarEmail(e.target.value)} />
                            <span htmlFor="pass">{errEmail}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="pass">Contraseña:</label>
                            <input className={errPass !== "" ? "inputError" : "rowInput"} type="password" name="pass" onChange={(e) => validarPass(e.target.value)} />
                            <span htmlFor="pass">{errPass}</span>
                        </div>
                        <div className='row'>
                            <label htmlFor="pass2">Repetir contraseña:</label>
                            <input className={errPass2 ? "inputError" : "rowInput"} type="password" name="pass2" onChange={(e) => validarPass2(e.target.value)} />
                            <span htmlFor="pass2">{errPass2}</span>
                        </div>
                        <div className='row'>
                            <button className='loginBtn' type="submit">Registrarse</button>
                        </div>
                    </form>
                </div>
</div>






</div>

    )

}

export default Register