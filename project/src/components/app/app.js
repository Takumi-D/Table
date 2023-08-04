import React from "react";
import Search from "../search";
import Table from "../table";
import Pagination from "../pgination/pagination";
import { Routes, Route } from "react-router-dom";
import "./app.css";

function App(){
    return (
        <div className="container">
            <Search/>
            <Routes>
                <Route path="/" element={
                    <React.Fragment>
                        <Table/>
                        <Pagination/>
                    </React.Fragment>
                }/>
                <Route path="/:id" element={
                    <React.Fragment>
                        <Table/>
                        <Pagination/>
                    </React.Fragment>
                }/>
            </Routes>
        </div>
    )
}

export default App;