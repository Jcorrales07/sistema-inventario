import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import {
    HomePage,
    CRUDProductosPage,
    CRUDAlmacenesPage,
    CRUDUsuariosPage,
    CRUDProveedoresPage,
    CRUDReportesPage,
    ConfiguracionPage,
} from './pages'

function App() {
    return (
        <Routes>
            
            {/* Estas rutas deben estar protegidas, osea, que una vez que se incia sesion, se puedan acceder */}
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<CRUDProductosPage />} />
            <Route path="/almacenes" element={<CRUDAlmacenesPage />} />
            <Route path="/usuarios" element={<CRUDUsuariosPage />} />
            <Route path="/proveedores" element={<CRUDProveedoresPage />} />
            <Route path="/reportes" element={<CRUDReportesPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />

            <Route path="/login" element={<LoginSignup />} />
            <Route path="*" element={<p>Error 404: Page not found</p>} />
        </Routes>
    )
}

export default App
