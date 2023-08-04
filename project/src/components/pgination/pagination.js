import React from "react";
import { connect } from "react-redux";
import gettingParametersFromUrl from "../hoc-helpers/gettingParametersFromUrl";
import { actions } from "../../redusers/reduser";
import "./pagination.css";

function Pagination({ numberOfPages, navigate, params, arrayLookup }){
    const amountPage = [];

    for(let i = 1; i <= numberOfPages; i++){
        amountPage.push(<li key={ i } onClick={() => navigate(`/${i}`)} className={`${numberOfPages === i ? "last-page" : 'page'}${+params.id === i ? " active" : ""}`} >{ i }</li>);
    }

    if(arrayLookup) return;

    return(
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li onClick={ () => {
                    if(Object.keys(params).length === 0) {}
                    else if(+params.id <= 1) {}
                    else navigate(`/${+params.id - 1}`);
                }} className="back">Назад</li>

                <span className="wrapper-page">
                    {amountPage}
                </span>

                <li onClick={ () => {
                    if(Object.keys(params).length === 0) { navigate(`/${1}`) }
                    else if(+params.id >= numberOfPages) {}
                    else navigate(`/${+params.id + 1}`);
                 }} className="next">Далее</li>
            </ul>
        </nav>
    )
}

const mapStateToProps = ({ numberOfPages, arrayLookup }) => {
    return {
        numberOfPages,
        arrayLookup
    }
}

export default gettingParametersFromUrl(connect(mapStateToProps, actions)(Pagination));