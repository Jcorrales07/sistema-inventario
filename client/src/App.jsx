import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
    return (
        <Routes>
            <Route path="/" element={<p>Home Page</p>} />

            {/* Rutas de la aplicacion */}
            <Route path="/login" element={<p>Login Page</p>} />
            {/* Hay que implementar autenticacion, que solo se redirija si el usuario esta autenticado */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<p>Error 404: Page not found</p>} />
        </Routes>
    )
}

export default App
