import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryList from "./pages/countries/countrylist";
import CountryInfo from "./pages/countries/countryinfo";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CountryList />} />
                <Route path="/countries/:code" element={<CountryInfo />} />
            </Routes>
        </Router>
    );
};

export default App;
