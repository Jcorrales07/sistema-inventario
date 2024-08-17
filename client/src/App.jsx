import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginSignup from'./Components/LoginSignup/LoginSignup'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="*"element={<p>Error 404: Page not found</p>} />
      </Routes>
    )
}

export default App
