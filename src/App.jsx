import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from "./components/Main";
import OldCatalog from "./components/OldCatalog";
import Portada from "./components/Portada"
import Register from "./components/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Portada />} />
                <Route path="/catalogo" element={<OldCatalog/>} />
                <Route path="/nuevoCatalogo" element={<Main/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<h1>Todavia Falta</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
