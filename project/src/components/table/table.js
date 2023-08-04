import React, { useEffect } from "react";
import Line from "../line-table";
import initServiceContext from "../hoc-helpers/init-service-context"
import { connect } from "react-redux";
import { actions } from "../../redusers/reduser"
import gettingParametersFromUrl from "../hoc-helpers/gettingParametersFromUrl";
import "./table.css";

function Table({ servicePosts, initPosts, currentPageList, params, posts, pageSwitching, arrayLookup, sortByTitle }){

    useEffect(() => {
        if(!posts){
            servicePosts.getPosts()
                .then((response) => {
                    initPosts(response, params);
                })
                .catch((error) => {
                    throw new Error(error);
                })
        } else {
            pageSwitching(params);
        }
    }, [initPosts, servicePosts, params, posts, pageSwitching]);

    let currentArray = !arrayLookup ? currentPageList : arrayLookup;

    if(currentArray.length === 0){
        return (<div>Ничего не найдено!</div>);
    }

    const postList = currentArray.map((item) => {
        return <Line key={item.id} id={item.id} header={item.title} description={item.body}/>
    })

    return (
        <table className="table">
            <thead>
            <tr>
                <th className="col-1 col-head" onClick={() => sortByTitle("id")}>ID</th>
                <th className="col-6 col-head" onClick={() => sortByTitle("title")}>Заголовок</th>
                <th className="col-5 col-head" onClick={() => sortByTitle("body")}>Описание</th>
            </tr>
            </thead>
            <tbody>
            { postList }
            </tbody>
        </table>
    )
}

const mapStateToProps = ({ currentPageList, posts, arrayLookup }) => {
    return {
        currentPageList,
        posts,
        arrayLookup
    }
}

export default gettingParametersFromUrl(initServiceContext(connect(mapStateToProps, actions)(Table)));