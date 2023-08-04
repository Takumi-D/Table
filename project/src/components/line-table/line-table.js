import React from "react";

function Line({id, header, description}){

    return(
        <tr>
            <th className="line" scope="row">{ id }</th>
            <td className="line">{ header }</td>
            <td className="line">{ description }</td>
        </tr>
    )
}

export default Line;