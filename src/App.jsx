import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from "./components/Main";
import Register from "./components/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<h1>NOT READY THO'</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
