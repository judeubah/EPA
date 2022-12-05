import React from "react";
import { useState } from "react";
import './image_tab.scss'

export const Image_tab = ({name, image, setSelections, selections, filter}) =>{

    const handleHomeSelection = () =>{
            setSelections({
                ...selections,
                gender:name
            })
        
    }
    
    return(
        <div className={`image_tab gender_tab`} onClick={()=>{
            handleHomeSelection()
        }}
         style={{backgroundImage: `url(${`assets/${image}/${name}`}.jpg)`}}><p className="tab_description">{name.toUpperCase()}</p>
{/* 
        {scrollers && 
            (
                <div className="selectors">
                    <button className="left_arrow" disabled={currentLoc === 0} onClick={()=>{setCurrentLoc(currentLoc-1); setScroll(scrollers[currentLoc-1]); setSelections({...selections, location:scrollers[currentLoc-1]})}}>-</button>
                    <div className="selector_location">
                        {scrollers.map((loc, index)=>(
                            <p className={index === currentLoc ? 'show_location': 'hide_location'}>{loc}</p>
                        ))}
                    </div>
                    <button disabled={currentLoc === scrollers.length-1} className="right_arrow" onClick={()=>{setCurrentLoc(currentLoc+1); setScroll(scrollers[currentLoc+1]); setSelections({...selections, location:scrollers[currentLoc+1]})}}>+</button>
                </div>    
        )} */}
        <div className="image_tab__filter" style={{backgroundColor: `rgba(${filter}, 0.45)`}}></div>
        </div>
    )
}