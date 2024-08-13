import React from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Routes>
            <Route path="/" element={<p>Home Page (Osea la pantalla de inicio)</p>} />
            
            {/* Rutas de la aplicacion */}
            <Route path="/login" element={<p>Login Page</p>} />
            <Route path="*" element={<p>Error 404: Page not found</p>} />
        </Routes>
    )
}

export default App
