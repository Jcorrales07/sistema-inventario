import React from'react';
import'./MenuUsuarios.css';

const MenuUsuarios = () => {
    const handleRegisterClick = () => {
        // Aquí se implementará la redirección a /usuarios/registrar
        alert("Redirigir a /usuarios/registrar");
    };

    const handleSearchClick = () => {
        // Aquí se implementará la redirección a /usuarios/buscar
        alert("Redirigir a /usuarios/buscar");
    };

    return (
        <div className="menu-container">
            <button className="menu-button" onClick={handleRegisterClick}>Registrar nuevo Usuario</button>
            <button className="menu-button1" onClick={handleSearchClick}>Buscar Usuario</button>
        </div>
    );
};

export default MenuUsuarios;

