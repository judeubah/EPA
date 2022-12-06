import React from "react";
import { Link} from  'react-router-dom';

export const No_RESULTS = ({handleRedirect})=>{

    return (
        <div className="no_res__container">
            <p className="no_found">No Results.</p>
            <div onClick={handleRedirect} className="routing_btn">{`<< Back`}</div>
        </div>
    )
}