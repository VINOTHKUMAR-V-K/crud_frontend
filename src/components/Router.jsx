import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./Home";
import FilterPage from "./FilterPage";
import DetatilPage from "./Detatilpage";
import Header from "./Header";



const Router = () => {
    return (
        <div>
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filter" element={<FilterPage/>}/>
                <Route path="/detail" element={<DetatilPage/>}/>
            </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Router