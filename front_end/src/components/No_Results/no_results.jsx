import React from "react";

export const No_RESULTS = ({handleRedirect})=>{

    return (
        <div className="no_res__container">
            <p className="no_found">No Results.</p>
            <div onClick={()=>handleRedirect('/options')} className="routing_btn">{`<< Back`}</div>
            <div onClick={()=>handleRedirect('/')} className="routing_btn__secondary">{`Home`}</div>
        </div>
    )
}