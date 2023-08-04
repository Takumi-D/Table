import React from "react";
import { connect } from "react-redux"
import { actions } from "../../redusers/reduser";
import "./search.css";

function Search({ search }){

    return(
        <nav className="navbar">
            <div className="container-fluid">
                <form className="d-flex w-100" role="search">
                    <input onChange={(event) => search(event.target.value)} className="form-control me-2 search" type="Поиск" placeholder="Поиск" aria-label="Search"/>
                </form>
            </div>
        </nav>
    )
}

export default connect(null, actions)(Search);