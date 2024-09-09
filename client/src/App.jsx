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

import {
    AsignarRoles,
    BuscarUsuarios,
    RegistroUsuarios,
    EditarUsuarios,
    BuscarProducto,
    CrearProducto,
    Existencias,
    HistorialDeMovimientos,
    Recibidos,
} from './components/index.js'
import VistaUnSoloProducto from './components/pagesCRUDProductos/VistaUnSoloProducto.jsx'
import { Toaster } from 'react-hot-toast'


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginSignup />} />

                {/* WIP: Estas rutas deben estar protegidas, osea, que una vez que se incia sesion, se puedan acceder */}
                <Route path="/home" element={<HomePage />} />

                <Route path="/productos" element={<CRUDProductosPage />} />
                <Route path="/productos/crear" element={<CrearProducto />} />
                <Route path="/productos/buscar" element={<BuscarProducto />} />
                <Route
                    path="/productos/ver"
                    element={<VistaUnSoloProducto />}
                />

                <Route path="/almacenes" element={<CRUDAlmacenesPage />} />
                <Route path="/almacenes/recibidos" element={<Recibidos />} />

                <Route path="/usuarios" element={<CRUDUsuariosPage />} />
                <Route
                    path="/usuarios/registrar"
                    element={<RegistroUsuarios />}
                />
                <Route path="/usuarios/buscar" element={<BuscarUsuarios />} />
                <Route path="/usuarios/editar" element={<EditarUsuarios />} />
                <Route path="/usuarios/roles" element={<AsignarRoles />} />

                <Route path="/proveedores" element={<CRUDProveedoresPage />} />
                
                <Route path="/reportes" element={<CRUDReportesPage />} />
                <Route path="/reportes/existencias" element={<Existencias />} />
                <Route path="/reportes/historial" element={<HistorialDeMovimientos />} />
           
                <Route path="/configuracion" element={<ConfiguracionPage />} />

                <Route path="*" element={<p>Error 404: Page not found</p>} />
            </Routes>
            <Toaster />
        </>
    )
}

export default App
