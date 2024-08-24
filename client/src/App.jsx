import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginSignup from './components/LoginSignup/LoginSignup.jsx'
import {
    HomePage,
    CRUDProductosPage,
    CRUDAlmacenesPage,
    CRUDUsuariosPage,
    CRUDProveedoresPage,
    CRUDReportesPage,
    ConfiguracionPage,
} from './pages'

import { BuscarUsuarios, RegistroUsuarios } from './components'
import EditarUsuarios from './components/pagesCRUDUsuarios/EditarUsuarios.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginSignup />} />

            {/* WIP: Estas rutas deben estar protegidas, osea, que una vez que se incia sesion, se puedan acceder */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/productos" element={<CRUDProductosPage />} />
            <Route path="/almacenes" element={<CRUDAlmacenesPage />} />
            
            <Route path="/usuarios" element={<CRUDUsuariosPage />} />
            <Route path="/usuarios/registrar" element={<RegistroUsuarios />} />
            <Route path="/usuarios/buscar" element={<BuscarUsuarios />} />
            <Route path="/usuarios/editar" element={<EditarUsuarios />} />

            <Route path="/proveedores" element={<CRUDProveedoresPage />} />
            <Route path="/reportes" element={<CRUDReportesPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />

            <Route path="*" element={<p>Error 404: Page not found</p>} />
        </Routes>
    )
}

export default App
