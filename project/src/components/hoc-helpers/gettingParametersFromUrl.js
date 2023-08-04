import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const gettingParametersFromUrl = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const params = useParams();

        return (
            <Component {...props} navigate={navigate} params={params}/>
        )
    }
}

export default gettingParametersFromUrl;