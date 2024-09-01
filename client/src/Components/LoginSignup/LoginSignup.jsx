import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/auth.api";
import "./LoginSignup.css";
import toast, { Toaster } from "react-hot-toast";

const LoginSignup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadPrivilegios = (roles) => {
    let privilegios = [];

    roles.forEach((rol) => {
      rol.Rol_Privilegios.forEach((privilegio) => {
        if (!privilegios.find((p) => p.id === privilegio.Privilegio.id)) {
          privilegios.push(privilegio.Privilegio);
        }
      });
    });

    return privilegios;
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Usuario y contraseña son requeridos!");
      return;
    }

    const response = await login(username, password);

    const roles = response.data.Data.Usuario_Rols.map((rol) => rol.Rol);

    const privilegios = loadPrivilegios(roles);

    const user = {
      nombre: response.data.Data.Socio.nombre,
      username: response.data.Data.nickname,
      email: response.data.Data.Socio.email,
      roles: roles,
      privilegios: privilegios,
    };
    localStorage.setItem("user", JSON.stringify(user));

    if (response) {
      if (response.status === 201) {
        toast.success("Inicio de sesión exitoso!");

        setTimeout(() => {
          navigate('/home')
        }, 2000);

        setIsLoggedIn(true)
        return;
      }

      if (response.status === 401) {
        toast.error("Usuario no existe!", {
          icon: "👤",
        });
      }

      if (response.status === 402) {
        toast.error("Contraseña incorrecta!", {
          icon: "🔑",
        });
      }
    } else {
      setError("Error en el inicio de sesión");
      console.log("Error en el inicio de sesión");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <div>
          {/* Aquí puedes agregar lo que quieras mostrar cuando el usuario esté logueado */}
        </div>
      ) : (
        <div className="containerIniciar">
          <div className="header">
            <h3>Inicio de Sesión</h3>
          </div>
          <div className="inputs">
            <div className="input">
              <label className="labels" htmlFor="username">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength="50"
                onKeyDown={handleKeyDown}
                className={`${error.includes("Usuario") ? "input-error" : ""}
                                `}
              />
            </div>
            <div className="input">
              <label className="labels" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`${error.includes("Usuario") ? "input-error" : ""}
                                `}
              />
            </div>
            {error && <div className="error-messager">{error}</div>}
          </div>
          <div className="submit-container">
            <div className="submit" onClick={handleLogin}>
              Iniciar Sesión
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};
export default LoginSignup;
