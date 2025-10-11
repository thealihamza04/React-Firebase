import React from "react";
import Home from "./pages/Home";
import ChatPage from "@/pages/ChatPage"
import { useDarkMode } from "@/hooks/useDarkMode.js";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => {
    useDarkMode();

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
