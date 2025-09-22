import React from "react";
import Home from "./pages/Home";
import { useDarkMode } from "@/hooks/useDarkMode.js";

const App = () => {
    useDarkMode();

    return (
        <div>
            <Home />
        </div>
    );
};

export default App;
